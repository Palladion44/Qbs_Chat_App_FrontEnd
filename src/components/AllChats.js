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

  const users = useSelector((state) => state.auth.users);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const conversation_id = useSelector((state) => state.auth.error);
  // const username = useSelector((state) => state.auth.first_name);
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

  
  useEffect(() => {
    
    console.log(users)
    console.log(allUsers)

    // console.log("Dispatching GetAllChats with token:", token);
    if (token) {
      dispatch(GetAllChats({ token}));
    }
  }, [dispatch,token]);

  useEffect(() => {

  }, [!isContactsOpen]);


  const resthandler = (res) => {
    if(res === 200){
      dispatch(GetAllChats({ token: localtoken }))
    }
  };
  useEffect(() => {
    socketRef.current = io("http://localhost:4000", {
      auth: { token },
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const handleClick = () => {
    setSearchQuery("");
    setShowClearIcon("none");
  };

  // const handleChatClick = (user) => {
  //   const conversationId = user._id;

  //   dispatch(setConversationId(conversationId));

  //   console.log("Setting conversation ID:", conversationId);
  //   dispatch(ReceiveMessages({ token, conversationId }));
  //   console.log(
  //     "Dispatched ReceiveMessages for conversation ID:",
  //     conversationId
  //   );

  //   navigate(`/personal-chat/${user.participants[0]?.name}`, {
  //     state: { lastMessage: user.lastMessage },
  //   });
  // };
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
            borderBottom: "1px solid #eee",
          }}
        >
          <img
            src={userAvatar}
            alt="my_image"
            style={{ width: "80px", height: "70px" }}
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
            <InputLabel
              htmlFor="search-bar"
              sx={{
                position: "absolute",
                left: "14%",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              Search
            </InputLabel>
            <TextField
              size="small"
              variant="outlined"
              value={searchQuery}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
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
          {allUsers.map((user, index) => (
            <Box
              key={user._id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
              onClick={() => handleChatClick(user)}
            >
              <Avatar src={user.profile_url} />
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="subtitle1">
                  {user.participants[0]?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.lastMessage?.message || "No message yet"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(user.lastMessage?.timestamp).toLocaleString() ||
                    "No timestamp"}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginLeft: "auto" }}
              >
                Today
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content Area */}
      
      {selectedChat ? (
        <PersonalChat
          conversationId={selectedChat._id}
          name={selectedChat.participants[0]?.name}
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
