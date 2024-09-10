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
    Toolbar,Button
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

  import UserProfile from "./UserProfile";
  import ContactsPage from "./ContactsPage";
  import { useState, useEffect,useRef } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    GetAllChats,
    setConversationId,
    ReceiveMessages,
    setSelectedContact
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
    
    const myIP = process.env.MY_IP;
    const baseUrl=process.env.REACT_APP_BASE_URL;
    // console.log(baseUrl)
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
    const selectedContact = useSelector((state) => state.auth.selectedContact);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState({})
    const [showClearIcon, setShowClearIcon] = useState("none");
    const [currentChat, setCurrentChat] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isContactsOpen, setIsContactsOpen] = useState(false);

    const localtoken = localStorage.getItem("token");

    const filterSelected1 = allUsers?.filter((user) =>
      user.participants.some((participant) => participant._id === selectedContact?._id)
  );
  const filterSelected = Array.isArray(filterSelected1) ? filterSelected1[0] : filterSelected1;
  const [filterSelectedx,setFilterSelectedx]=useState(filterSelected);




    useEffect(() => {


      if (token) {
        dispatch(GetAllChats({ token }));
      }

      const resthandler = (res) => {
        if(res === 200){
          dispatch(GetAllChats({ token: localtoken }))
        }
      };
    

      socketRef.current = io(`${baseUrl}`, {
      // socketRef.current = io(`http://localhost:4000`, {
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
          // Join the room for each userId
          socketRef.current.emit("joinRoom", userId);
    
          // Function to handle receiving a message
          const handleReceiveMessage = (newMessage) => {
            // Log the new message for debugging
            if (newMessage.conversationId === userId) {
              // console.log(`Received new message for user ${userId}:`, newMessage.message);
    
              // Set the last message for the user from the socket
              setMessages((prevMessages) => ({
                ...prevMessages,
                [userId]: newMessage.message,
              }));

              // Avoid fetching all chats unnecessarily (this might cause flickering)
              // dispatch(GetAllChats({token}));  <-- REMOVE THIS
            }
          };
    
          // Listen for messages from the server for this user
          socketRef.current.on(`receiveMessage`, handleReceiveMessage);
    
          // Only set existing lastMessage if there's no message from the socket yet
          setMessages((prevMessages) => ({
            ...prevMessages,
            [userId]: prevMessages[userId] || user.lastMessage, // Only update if no socket message
          }));
    
          // Clean up event listeners when the component unmounts or updates
          return () => {
            socketRef.current.off(`receiveMessage`, handleReceiveMessage);
            socketRef.current.emit("leaveRoom", userId);
          };
        });
      }
    }, []);

// useEffect(() => {
//               dispatch(GetAllChats({token}));

// }, [messages])

// emit listeners
useEffect(() => {
  const interval = setInterval(() => {
    dispatch(GetAllChats({ token }));
  }, 1000); // Dispatches every 1000ms (1 second)
  
  // Cleanup the interval on component unmount
  return () => clearInterval(interval);
}, [dispatch, token]); // Dependencies include dispatch and token
// emit listeners


    const handleChange = (event) => {
      setSearchQuery(event.target.value);
      setShowClearIcon(event.target.value === "" ? "none" : "flex");
    };

    const handleClick = () => {
      setSearchQuery("");
      setShowClearIcon("none");
    };
    
    
    
    const handleChatClick = (user) => {
      dispatch(setSelectedContact(user));

      // console.log(user)
      setFilterSelectedx(null);
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
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Filter users based on search query and selected filter
  const filteredUsers = searchQuery
  ? allUsers?.filter((user) =>
      user.participants?.some(participant =>
        participant.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      !(user.isGroupChat === false && user.lastMessage === null) // Exclude non-group chats with no LastMessages
    ).filter(user => selectedFilter === "All" || (selectedFilter === "Groups" && user.isGroupChat === true))
  : allUsers?.filter(user => 
      !(user.isGroupChat === false && user.lastMessage === null) && // Exclude non-group chats with no LastMessages
      (selectedFilter === "All" || (selectedFilter === "Groups" && user.isGroupChat === true))
    );

  const handleClear = () => {
    setSearchQuery(''); // Clear the input field


  };
  const lastUpdatedByRef = useRef(null);


useEffect(() => {
setCurrentChat(selectedContact)
}, [selectedContact]);




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
            backgroundColor: "f7f7fc",
            borderBottom: "1px solid #eee",
          }}
        >
          <Avatar src={user?.user?.profile_url} alt="my-image" onClick={handleUser} />
  
          <Typography sx={{ marginLeft: "100px" }}>
            {/* {console.log("The username is" + username)} */}
          </Typography>
  
          <Box sx={{ marginLeft: "auto" }}>
            <GroupOutlinedIcon onClick={handleContact} />
            <QuestionAnswerOutlinedIcon sx={{ marginLeft: 1 }} />
            <PlaylistAddCheckOutlinedIcon sx={{ marginLeft: 1 }} />
            <MoreVertOutlinedIcon sx={{ marginLeft: 1 }} />
          </Box>
        </Box>
  
        {/* Search Bar */}
        <Box sx={{ padding: 2 }}>
          <FormControl fullWidth>
            <TextField
              size="small"
              placeholder="Search"
              variant="filled"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                disableUnderline: true, // Removes the underline
                startAdornment: (
                  <InputAdornment position="start" sx={{ padding: 0 }}>
                    <SearchIcon sx={{ color: "#ADB5BD", marginBottom: 2 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ padding: 0 }}>
                    {searchQuery && (
                      <IconButton onClick={handleClear} edge="end">
                        <ClearIcon sx={{ color: "#ADB5BD" }} />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{
                '.MuiFilledInput-root': {
                  paddingTop: 1, // Adjust padding above the input
                  paddingBottom: 1,
                  backgroundColor: "#F7F7FC",
                  borderRadius: '10px', // Add borderRadius to round the corners
                },
                '.MuiFilledInput-input': {
                  paddingTop: 0, // Adjust padding above the placeholder
                  paddingBottom: 0,
                },
              }}
            />
          </FormControl>
        </Box>
  
        {/* Filter Buttons */}
        <Box sx={{ paddingBottom: 1, display: 'flex', justifyContent: 'left' }}>
          <Button
            sx={{
              backgroundColor: selectedFilter === "All" ? "#1F487C" : "transparent",
              borderColor: selectedFilter === "All" ? "transparent" : "#1F487C",
              color: selectedFilter === "All" ? "white" : "#1F487C",
              boxShadow: "none",
              borderRadius: "30px",
              minWidth: "66px",
              height: "27px",
              fontWeight: "400",
              fontFamily: "Poppins",
              fontSize: "14px",
              textTransform: "capitalize",
              marginLeft: "10px",
              padding: '10px',
            }}
            variant={selectedFilter === "All" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("All")}
          >
            All
          </Button>
          <Button
            sx={{
              backgroundColor: selectedFilter === "Groups" ? "#1F487C" : "transparent",
              borderColor: selectedFilter === "Groups" ? "transparent" : "#1F487C",
              color: selectedFilter === "Groups" ? "white" : "#1F487C",
              boxShadow: "none",
              borderRadius: "30px",
              minWidth: "66px",
              height: "27px",
              fontWeight: "400",
              fontFamily: "Poppins",
              fontSize: "14px",
              textTransform: "capitalize",
              marginLeft: "10px",
              padding: '10px',
            }}
            variant={selectedFilter === "Groups" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("Groups")}
          >
            Group
          </Button>
        </Box>
  
        {/* Chat List */}
        <Box sx={{ overflowY: "auto" }}>
          {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => {
              // Check if a real-time message from the socket exists
        
              const lastMessageTimestamp = messages[user._id]?.timestamp || user.lastMessage?.timestamp;
            
              return (
                <Box
                  key={user._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 2,
                    borderBottom: "1px solid #eee",
                    backgroundColor: currentChat && currentChat._id === user._id ? "#e8e8e8" : "white", // Change background color if selected
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                  onClick={() => handleChatClick(user)}
                >
                  <Avatar src={user?.groupImage || user?.participants[0]?.profile_url} />
                  <Box sx={{ marginLeft: 2, width: "85%" }}>
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
                      <span style={{ fontFamily: "Poppins", fontWeight: "500" }}>
                        {user.groupName || user.participants[0]?.name}
                      </span>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          fontSize: "0.8rem", // Smaller font size for the date
                          whiteSpace: "nowrap", // Prevent date from wrapping
                          marginLeft: "8px", // Add some space between name and date
                        }}
                      >
                        {lastMessageTimestamp ? formatTimestamp(lastMessageTimestamp) : ""}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
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
                      }}
                      color="textSecondary"
                    >
                                      {messages[user._id]|| user.lastMessage?.message|| "No message yet"}

                    </Typography>
                  </Box>
                </Box>
              );
            })
          ) : null}
        </Box>
      </Box>
  
      {/* Main Content Area */}
      {currentChat ? (
        <PersonalChat
          conversationId={currentChat._id}
          name={currentChat.participants[0]?.name}
          profileimage={currentChat.participants[0]?.profile_url}
          GroupName={currentChat.groupName}
          GroupProfileImage={currentChat.groupImage}
        />
      ) : (
        <Box
          sx={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img src={backimage} alt="Background" style={{ width: "100%", height: "100vh" }} />
          <img src={over} alt="Centered" style={{ position: "absolute", width: "60%", height: "auto" }} />
        </Box>
      )}
  
      {/* Profile Drawer */}
      <Drawer
        anchor="left"
        open={isProfileOpen}
        onClose={handleProfileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ width: "27%", "& .MuiDrawer-paper": { width: "27%" } }}
      >
        <UserProfile profile={user?.user?.profile_url} name={user?.user?.name} onClose={handleProfileClose} />
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
