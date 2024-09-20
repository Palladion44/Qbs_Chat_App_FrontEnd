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
  import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';  import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
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
import CreateGroup from "./CreateGroup";
  // import { GetAllChats,ReceiveMessages } from '../features/auth/actions';
  // import { setConversationId } from '../features/auth/reducers';
  const AllChats = () => {
    
    const myIP = process.env.MY_IP;
    const baseUrl=process.env.REACT_APP_BASE_URL;
    // console.log(baseUrl)
  const dispatch = useDispatch();
  const socketRef = useRef();  
  const token = useSelector((state) => state.auth.token);
  const allUsers = useSelector((state) => state.auth.allUsers) || [];
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
    const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
    const [filteredUsers,setFilteredUsers] = useState();
    const[allUsersLocal,setAllUsersLocal] = useState(allUsers)
    const [shouldDispatchChats, setShouldDispatchChats] = useState(true);
    const [debugMsg ,setDebugMsg] = useState()
    const localtoken = localStorage.getItem("token");
  const [selectedFilter, setSelectedFilter] = useState("All");

    const filterSelected1 = allUsersLocal?.filter((user) =>
      user.participants.some((participant) => participant._id === selectedContact?._id)
  );
  const filterSelected = Array.isArray(filterSelected1) ? filterSelected1[0] : filterSelected1;
  const [filterSelectedx,setFilterSelectedx]=useState(filterSelected);

  const roomsJoined = useRef(false); // Ref to track if rooms have been joined
  useEffect(() => {
  setAllUsersLocal(allUsers)
  }, [allUsers])
useEffect(() => {
  if (token) {
    dispatch(GetAllChats({ token }));
  }

  // Establish socket connection with auth token
  socketRef.current = io(baseUrl, {
    auth: { token },
  });

  // Clean up when component unmounts
  return () => {
    socketRef.current.disconnect();
  };
}, [token]);

const refreshedConversations = useRef(new Set()); // Use ref to persist data across renders
useEffect(() => {
  if (!roomsJoined.current) {
    // Join rooms for users in allUsersLocal
    allUsersLocal.forEach(user => {
      socketRef.current.emit("joinRoom", user._id);
    });

    roomsJoined.current = true; // Set the flag to true after joining rooms
  }

  const handleReceiveMessage = (newMessage) => {
    const formattedTimestamp = new Date(newMessage.timestamp).toISOString();
  if(newMessage){
    setMessages(newMessage)
  }
    setAllUsersLocal((prevAllUsersLocal) => {
      const userIndex = prevAllUsersLocal.findIndex(user => user._id === newMessage.conversationId);
  
      if (userIndex !== -1) {
        const updatedUsers = [...prevAllUsersLocal];
  
        // Check if we need to refresh chats for this conversation only once
        if (!updatedUsers[userIndex].lastMessage && !refreshedConversations.current.has(newMessage.conversationId)) {
          dispatch(GetAllChats({ token })); // Dispatch only once for this conversation
          refreshedConversations.current.add(newMessage.conversationId); // Mark this conversation as refreshed
          console.log("I DISPATCHED HERE");
        }
  
        // Update the user's lastMessage
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          lastMessage: {
            message: newMessage.message,
            sender: newMessage.sender.name,
            timestamp: formattedTimestamp,
          },
        };
  
        // Update filtered users based on new state
        setFilteredUsers((prevFilteredUsers) => {
          const updatedFilteredUsers = searchQuery
            ? updatedUsers.filter(user =>
                user.participants?.some(participant =>
                  participant.name?.toLowerCase().includes(searchQuery.toLowerCase())
                ) &&
                !(user.isGroupChat === false && user.lastMessage === null)
              ).filter(user =>
                selectedFilter === "All" ||
                (selectedFilter === "Groups" && user.isGroupChat === true)
              )
            : updatedUsers.filter(
                user =>
                  !(user.isGroupChat === false && user.lastMessage === null) &&
                  (selectedFilter === "All" ||
                    (selectedFilter === "Groups" && user.isGroupChat === true))
              );
  
          // Sort the filtered users by timestamp
          const sortedFilteredUsers = [...updatedFilteredUsers].sort((a, b) => {
            const lastMessageTimestampA = messages[a._id]?.timestamp || a.lastMessage?.timestamp || 0;
            const lastMessageTimestampB = messages[b._id]?.timestamp || b.lastMessage?.timestamp || 0;
  
            return lastMessageTimestampB - lastMessageTimestampA;
          });
  
          return sortedFilteredUsers;
        });
  
        return updatedUsers;
      }
  
      return prevAllUsersLocal;
    });
  
    console.log(newMessage);
  };

  // Listen for received messages
  socketRef.current.on("receiveMessage", handleReceiveMessage);

  // Listen for new conversations
  socketRef.current.on('newConversation', (welcomeMessage) => {
    console.log('New conversation received:', welcomeMessage);

    socketRef.current.emit("joinRoom", welcomeMessage);
    dispatch(GetAllChats({ token }));
    console.log(allUsersLocal);
  });

  // Cleanup listeners when component unmounts
  return () => {
    socketRef.current.off("receiveMessage", handleReceiveMessage);
    socketRef.current.off('newConversation');
    allUsersLocal.forEach(user => {
      socketRef.current.emit("leaveRoom", user._id);
    });
  };
}, [allUsersLocal, token]);


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
    const handleAddGroupOpen = ()=>{
      setIsAddGroupOpen(true)
    }
    const handleAddGroupClose = () => {
      setIsAddGroupOpen(false);
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

  // Handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Filter users based on search query and selected filter
  useEffect(() => {
    // This effect will re-run whenever `messages`, `allUsersLocal`, or other dependencies change
  
    const updatedFilteredUsers = searchQuery
      ? allUsersLocal?.filter((user) =>
          user.participants?.some(participant =>
            participant.name?.toLowerCase().includes(searchQuery.toLowerCase())
          ) &&
          !(user.isGroupChat === false && user.lastMessage === null)
        ).filter(user => selectedFilter === "All" || (selectedFilter === "Groups" && user.isGroupChat === true))
      : allUsersLocal?.filter(user => 
          !(user.isGroupChat === false && user.lastMessage === null) &&
          (selectedFilter === "All" || (selectedFilter === "Groups" && user.isGroupChat === true))
        );
  
    // Sort the filteredUsers based on the latest message timestamp in descending order
    const sortedFilteredUsers = [...updatedFilteredUsers].sort((a, b) => {
      const lastMessageTimestampA = a.lastMessage?.timestamp || 0;
      const lastMessageTimestampB = b.lastMessage?.timestamp || 0;
    
      return new Date(lastMessageTimestampB) - new Date(lastMessageTimestampA); // Sort by most recent timestamp
    });
  
    setFilteredUsers(sortedFilteredUsers);
  }, [ searchQuery, selectedFilter, messages]);  // Re-run the effect when these change
      
    
  const handleClear = () => {
    setSearchQuery(''); // Clear the input field


  };
  const lastUpdatedByRef = useRef(null);


useEffect(() => {
setCurrentChat(selectedContact)
}, [selectedContact]);

useEffect(() => {
setAllUsersLocal(allUsers)
}, [allUsers])
useEffect(() => {
  console.log("filteredUSERSCHANGEDDD",filteredUsers);
  console.log("allusers changeD!",allUsersLocal)
  }, [filteredUsers,allUsersLocal])
  
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
           {debugMsg}
          </Typography>
  
          <Box sx={{ marginLeft: "auto" }}>
            <GroupOutlinedIcon onClick={handleContact} />
            <AddCommentOutlinedIcon onClick={handleAddGroupOpen} sx={{marginLeft:1}}/>
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
    const userId = user._id; // Get the user's ID (conversation ID)

    // Get specific message for this user from the messages state
    const lastMessage = user.lastMessage?.message;
    const lastMessageTimestamp = messages[userId]?.timestamp || user.lastMessage?.timestamp;

    return (
      <Box
        key={user._id}
        className="user-list-item" /* Add animation class */
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          borderBottom: "1px solid #eee",
          backgroundColor: currentChat && currentChat._id === user._id ? "#e8e8e8" : "white",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f9f9f9",
          },
        }}
        onClick={() => handleChatClick(user)}
      >
        <Avatar
          src={user?.isGroupChat ? (user?.groupImage || null) : user?.participants[0]?.profile_url}
        />
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
              width: "100%",
              "@media (max-width: 1200px)": {
                maxWidth: "80%",
              },
              "@media (max-width: 800px)": {
                maxWidth: "60%",
              },
              "@media (max-width: 600px)": {
                maxWidth: "40%",
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
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
                marginLeft: "8px",
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
              maxWidth: "100%",
              "@media (max-width: 1200px)": {
                maxWidth: "80%",
              },
              "@media (max-width: 800px)": {
                maxWidth: "60%",
              },
              "@media (max-width: 600px)": {
                maxWidth: "40%",
              },
            }}
            color="textSecondary"
          >
            {lastMessage}
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
  socketRef={socketRef}

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

      {/* New Group Drawer*/}
      <Drawer
        anchor="left"
        open={isAddGroupOpen}
        onClose={handleAddGroupClose}
        ModalProps={{ keepMounted: true }}
        sx={{ width: "27%", "& .MuiDrawer-paper": { width: "27%" } }}
      >
        {isAddGroupOpen && <CreateGroup onClose={handleAddGroupClose} />}
      </Drawer>
    </Container>
  );
    };

  export default AllChats;
