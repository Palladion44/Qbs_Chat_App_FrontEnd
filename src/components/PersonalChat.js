import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import userAvatar from "../assets/Avatar.png";
import { SendMessage, ReceiveMessages } from "../features/auth/authSlice";
// import { SendMessage,ReceiveMessages} from '../features/auth/actions';
import io from "socket.io-client"; // Import Socket.io
import { useSelector } from "react-redux";
import {

  setConversationId,

} from "../features/auth/authSlice";
import MessageWithReadMore from "./MessageWithReadMore";
const myIp = process.env.MY_IP
const PersonalChat = ({ conversationId, name,profileimage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([])

  const baseUrl = process.env.REAC_APP_BASE_URL
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id"); // Get current user's ID from localStorage
  const conversation_id = conversationId; // Get conversation ID from localStorage
  const token = localStorage.getItem("token"); // Assuming you have a token for authentication
  const socketRef = useRef();
  const allUsers = useSelector((state) => state.auth.allUsers) || [];

  console.log(conversationId)

    useEffect(() => {
      socketRef.current = io(`${baseUrl}`, {
      // socketRef.current = io(`http://localhost:4000`, {
        auth: { token },
      });

      return () => {
        socketRef.current.disconnect();
      };
    }, [token]);

  useEffect(() => {
    if (conversationId) {
      dispatch(setConversationId(conversationId));

      socketRef.current.emit("joinRoom", conversationId);

      socketRef.current.on("receiveMessage", (newMessage) => {
        console.log("newMessage data: ", newMessage);
        console.log(allUsers)
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socketRef.current.off("receiveMessage");
        socketRef.current.emit("leaveRoom", conversation_id); // Optional: Leave the room when the conversation_id changes
      };
    }
  }, [conversationId]);

  useEffect(() => {
    if (conversationId){
    dispatch(ReceiveMessages())
      .unwrap()
      .then((filteredMessages) => {
        setMessages([]);

        setMessages(filteredMessages);
      })
      .catch((error) => {
        console.error("Failed to load messages:", error);
      });
    }
  }, [conversationId]);


  const onKeyDown = (event) => {
    if(event.key === 'Enter'&& !event.shiftKey){
      event.preventDefault(); // Prevent the newline from being added

      handleSendMessage();
    }
  }
  const handleSendMessage = () => {
    if (message.trim() && conversation_id) {
      const newMessage = {
        message: message,
        timestamp: Date.now(),
        sender: user_id,
      };

      // Clear the input field
      setMessage("");

      // Dispatch the SendMessage thunk
      dispatch(
        SendMessage({
          conversation_id: conversation_id,
          message: message,
        })
      );

      // Emit the message using the existing Socket.io connection
      socketRef.current.emit("sendMessage", {
        conversationId: conversation_id,
        message: message,
      });
      console.log("Message sent:", message);
    }
  };
  // scroll to bottom automatically
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]); 

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        width: "73%",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
   
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #eee",
          }}
        >
          <Avatar src={profileimage} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            {name}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, padding: 2, overflowY: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {messages.map((msg, index) => (
              

              <Box
                key={index}
                sx={{
                  display: "flex",
                  marginBottom: 2,
                  justifyContent:
                    msg.sender === user_id ? "flex-end" : "flex-start",
                }}
              >
           

                <Typography
                  variant="body1"
                  sx={{
                    backgroundColor:
                      msg.sender === user_id ? "#dcf8c6" : "#ffffff",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    maxWidth: "70%",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                    wordWrap: "break-word", // Wrap long words to the next line
                    whiteSpace: "pre-wrap", // Preserves whitespace and wraps text when necessary
                    overflowWrap: "break-word", // Breaks long words to prevent overflow
                  }}
                >
                 <MessageWithReadMore
                  message={msg.message}
                  sender={msg.sender}
                  userId={user_id}
                />
                  <Typography
                  variant="body2"

                  color="textSecondary"
                  sx={{ alignSelf: "flex-end",textAlign:"end",fontSize:"10px" }}
                >
                  {new Date(msg.timestamp).toLocaleString()}
                </Typography>
                </Typography>
                
              </Box>
            ))}
             <div ref={messagesEndRef} />
          </Box>
        </Box>
        <Box
          sx={{
            padding: 2,
            borderTop: "1px solid #eee",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            multiline
            maxRows={8}
            
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <IconButton color="primary" onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default PersonalChat;
