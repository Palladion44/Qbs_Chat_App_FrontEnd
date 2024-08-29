  import {
    Box,
    Container,
    Typography,
    Avatar,
    FormControl,
    InputAdornment,
    TextField,
    InputLabel,
    Drawer,
    IconButton,
    AppBar,
    Toolbar,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
  import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
  import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
  import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
  import EditIcon from "@mui/icons-material/Edit";
  import SearchIcon from "@mui/icons-material/Search";
  import ClearIcon from "@mui/icons-material/Clear";
  import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
  import backimage from "../assets/backimage.png";
  import over from "../assets/over.png";
  import userAvatar from "../assets/Avatar.png";
  import johnAvatar from "../assets/John.png";
  import gohsAvatar from "../assets/Gohs.png";
  import justinAvatar from "../assets/Justin.png";
  import UserProfile from "./UserProfile";
  import ContactsPage from "./ContactsPage";
  import { useState, useEffect,useRef } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    GetAllChats,
    setConversationId,
    ReceiveMessages,
  } from "../features/auth/authSlice";
  import PersonalChat from "./PersonalChat";
  import io from "socket.io-client"; // Import Socket.io
  import '@fontsource/poppins/700.css'; // Import the Poppins font
  import '@fontsource/poppins/600.css'; // Import the Poppins font
  import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
  // import { GetAllChats,ReceiveMessages } from '../features/auth/actions';
  // import { setConversationId } from '../features/auth/reducers';

  const AllChats = () => {

    const dispatch = useDispatch();
    const socketRef = useRef();

    const token = useSelector((state) => state.auth.token);
    // const allUsers = localStorage.getItem('AllUsers');
    const allUsers = useSelector((state) => state.auth.allUsers) || [];
    // const allUsers = JSON.parse(useSelector((state) => state.allUsers)) || [];
    // const allUsers = JSON.parse(localStorage.getItem('AllUsers')) || [];
const user = useSelector((state) => state.auth.user)
    const users = useSelector((state) => state.auth.users);
    const status = useSelector((state) => state.auth.status);
    const error = useSelector((state) => state.auth.error);
    const conversation_id = useSelector((state) => state.auth.error);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useSelector((state) => state.auth.messages)
    const [showClearIcon, setShowClearIcon] = useState("none");
    const [searchQuery, setSearchQuery] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isContactsOpen, setIsContactsOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();
    const [forceRender, setForceRender] = useState(0);
    const username = localStorage.getItem("username");
    const localtoken = localStorage.getItem("token");



    console.log(allUsers);
console.log(users)
    
    useEffect(() => {


      if (token) {
        dispatch(GetAllChats({ token }));
      }

      const resthandler = (res) => {
        if(res === 200){
          dispatch(GetAllChats({ token: localtoken }))
        }
      };
    

      socketRef.current = io("http://localhost:4000", {
        auth: { token },
      });

      return () => {
        socketRef.current.disconnect();
      };
    }, [token]);

    useEffect(() => {
      if (allUsers.length > 0) {
        const userIds = allUsers.map((user) => user._id);
    
        userIds.forEach((userId) => {
          dispatch(setConversationId(userId));
          socketRef.current.emit("joinRoom", userId);
    
          const handleReceiveMessage = (newMessage) => {
            setMessages((prevMessages) => ({
              ...prevMessages,
              [userId]: [...(prevMessages[userId] || []), newMessage],
            }));
    
            // Dispatch GetAllChats when a new message is received
          };
      socketRef.current.on(`receiveMessage-${userId}`, handleReceiveMessage);
        // dispatch(GetAllChats({ token }));

          dispatch(ReceiveMessages({ userId }))
            .unwrap()
            .then((filteredMessages) => {
              setMessages((prevMessages) => ({
                ...prevMessages,
                [userId]: filteredMessages,
              }));
            })
            .catch((error) => {
              console.error("Failed to load messages:", error);
            });
    
          return () => {
            socketRef.current.off(`receiveMessage-${userId}`, handleReceiveMessage);
            socketRef.current.emit("leaveRoom", userId);
          };
        });
      }
    }, [ dispatch, token]);


    useEffect(() => {
      const interval = setInterval(() => {
          dispatch(GetAllChats({ token }));
      }, 1000); // Dispatches every 1000ms (1 second)

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
  }, [dispatch, token]); // Dependencies include dispatch and token


    const handleChange = (event) => {
      setSearchQuery(event.target.value);
      setShowClearIcon(event.target.value === "" ? "none" : "flex");
    };

    const handleClick = () => {
      setSearchQuery("");
      setShowClearIcon("none");
    };
    
    const [selectedChat, setSelectedChat] = useState(null);
    
    const handleChatClick = (user) => {
      setSelectedChat(user);
      setIsContactsOpen(false);
    };
    


    
    const handleUser = () => {
      setIsProfileOpen(true);
    };

    const handleContact = () => {
      setIsContactsOpen(true);
    };

    const handleProfileClose = () => {
      setIsProfileOpen(false);
    };

    const handleCloseContacts = () => {
      setIsContactsOpen(false);
    };

    useEffect(() => {
      
      console.log(messages)
      console.log(allUsers)
    }, [messages])

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const now = new Date();
    
      // Normalize dates to local midnight for comparisons
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
    
      // Check if the date is today
      if (date >= today) {
          return 'Today';
      } else if (date >= yesterday) {
          return 'Yesterday';
      } else if (date >= oneWeekAgo) {
          // Return the day of the week in local time
          return date.toLocaleDateString(undefined, { weekday: 'long' }); // e.g., "Friday"
      } else {
          // Return the full date in local time
          return date.toLocaleDateString(); // e.g., "8/23/2024" or "August 23, 2024" based on locale
      }
  };
  const filteredUsers = searchQuery
  ? allUsers?.filter((user) =>
      user.participants?.some(participant =>
        participant.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  : allUsers; 
    return (
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            width: "27%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              padding: 2,
              display: "flex",
              alignItems: "center",
              backgroundColor:"f7f7fc",
              borderBottom: "1px solid #eee",
            }}
          >
            <img
              src={ user.user.profile_url || userAvatar}
              alt="my_image"
              style={{ width: "50px", height: "50px" }}
              onClick={handleUser}
            />
            <Typography sx={{ marginLeft: "100px" }}>
              {console.log("The username is" + username)}
            </Typography>

            <Box sx={{ marginLeft: "auto" }}>
              <GroupOutlinedIcon onClick={handleContact} />
              <QuestionAnswerOutlinedIcon sx={{ marginLeft: 1 }} />
              <PlaylistAddCheckOutlinedIcon sx={{ marginLeft: 1 }} />
              <MoreVertOutlinedIcon sx={{ marginLeft: 1 }} />
            </Box>
          </Box>

          {/* Search Bar */}
          <Box sx={{ padding: 2, borderBottom: "1px solid #eee" }}>
            <FormControl fullWidth>
              
              <TextField
                size="small"
                placeholder="Search"
                variant="filled"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{color:"#ADB5BD"}} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ display: showClearIcon }}
                      onClick={handleClick}
                    >
                      <ClearIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>

          {/* Chat List */}
          <Box sx={{ overflowY: "auto" }} >
            {
            Array.isArray(filteredUsers) && filteredUsers.length > 0 && (
  filteredUsers.map((user, index) => (
                  <Box
                    key={user._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 2,
                      borderBottom: "1px solid #eee",
                      backgroundColor: selectedChat && selectedChat._id === user._id ? "#e8e8e8" : "white", // Change background color if selected
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                    onClick={() => handleChatClick(user)}
                  >
                    <Avatar src={user.participants[0]?.profile_url} />
                    <Box sx={{ marginLeft: 2,width:"85%" }}>
                    <Typography
  variant="subtitle1"
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "100%", // Default max-width
    "@media (max-width: 1200px)": {
      maxWidth: "80%", // Reduce the visible text on medium screens
    },
    "@media (max-width: 800px)": {
      maxWidth: "60%", // Further reduce the visible text on smaller screens
    },
    "@media (max-width: 600px)": {
      maxWidth: "40%", // Significantly reduce the visible text on very small screens
    },
  }}
>
  <span style={{fontFamily:"Poppins",fontWeight:"500"}}>{user.participants[0]?.name}</span>
  <Typography
    variant="body2"
    component="span"
    sx={{
      fontSize: "0.8rem", // Smaller font size for the date
      whiteSpace: "nowrap", // Prevent date from wrapping
      marginLeft: "8px", // Add some space between name and date
    }}
  >
      {user.lastMessage?.timestamp ? formatTimestamp(user.lastMessage.timestamp) : ''}

  </Typography>
</Typography>
                      <Typography variant="body2" sx={{
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "100%", // Default max-width
    "@media (max-width: 1200px)": {
      maxWidth: "80%", // Reduce the visible text on medium screens
    },
    "@media (max-width: 800px)": {
      maxWidth: "60%", // Further reduce the visible text on smaller screens
    },
    "@media (max-width: 600px)": {
      maxWidth: "40%", // Significantly reduce the visible text on very small screens
    },
  }} color="textSecondary">
                       {user.lastMessage?.message || "No message yet"}

                      </Typography>
                      
                    </Box>
                    
                  </Box>
                )))}
          </Box>
        </Box>

        {/* Main Content Area */}
        
        {selectedChat ? (
          <PersonalChat
            conversationId={selectedChat._id}
            name={selectedChat.participants[0]?.name}
            profileimage={selectedChat.participants[0]?.profile_url}
          />
          
        ):
        <Box
          sx={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={backimage}
            alt="Background"
            style={{ width: "100%", height: "100vh" }}
          />
          <img
            src={over}
            alt="Centered"
            style={{ position: "absolute", width: "60%", height: "auto" }}
          />
        </Box>}

        {/* Profile Drawer */}
        <Drawer
          anchor="left"
          open={isProfileOpen}
          onClose={handleProfileClose}
          ModalProps={{ keepMounted: true }}
          sx={{ width: "27%", "& .MuiDrawer-paper": { width: "27%" } }}
        >
          <UserProfile onClose={handleProfileClose} />
        </Drawer>

        {/* Contacts Drawer */}
        <Drawer
          anchor="left"
          open={isContactsOpen}
          onClose={handleCloseContacts}
          ModalProps={{ keepMounted: true }}
          sx={{ width: "27%", "& .MuiDrawer-paper": { width: "27%" } }}
        >
                {isContactsOpen && <ContactsPage onClose={handleCloseContacts} />}

        </Drawer>
        
      </Container>
  
  

  
    );
  };

  export default AllChats;
