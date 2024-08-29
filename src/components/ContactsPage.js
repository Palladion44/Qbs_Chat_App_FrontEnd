import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Snackbar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Add, Search, ChatBubbleOutline, MoreVert } from "@mui/icons-material";
import { GetUsers, SendReceiverId } from "../features/auth/authSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ContactsPage = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.auth.users);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  const handleChatClick = async (contact) => {
    try {
      localStorage.setItem("participantId", contact._id);
      const participantId = localStorage.getItem("participantId");

      const action = await dispatch(
        SendReceiverId({ token: localStorage.getItem("token"), participantId })
      );
      if (SendReceiverId.fulfilled.match(action)) {
        if (action.payload) {
          window.location.reload();
          onClose(); 
        } else {
          setSnackbarMessage(
            action.payload?.message || "Phone number is not available"
          );
          setOpenSnackbar(true);
        }
      } else {
        setSnackbarMessage(error?.message || "An error occurred");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setSnackbarMessage("An unexpected error occurred");
      setOpenSnackbar(true);
    }
  };

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ContactItem = ({ contact }) => (
    <ListItem onClick={() => handleChatClick(contact)}>
      <ListItemAvatar>
        <Avatar src={contact.profile_url} />
      </ListItemAvatar>
      <ListItemText primary={contact.name} secondary={contact.status} />
    </ListItem>
  );
  return (
    <Container disableGutters>
      <AppBar position="static" disableGutters sx={{ boxShadow: "none" }}>
  <Toolbar sx={{ backgroundColor: "#0BC827" }}>
    <IconButton onClick={onClose}>
      <ArrowBackIosIcon sx={{ color: "white" }} />
    </IconButton>
    <Typography variant="h6" sx={{ fontFamily: "Poppins", flexGrow: 1 }}>
      New Chat
    </Typography>
  </Toolbar>
</AppBar>
      <TextField 

        variant="outlined"
        placeholder="Search"
        fullWidth
        margin="dense"
        value={searchQuery} // Bind input value to searchQuery state
        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
        InputProps={{
          startAdornment: (
            <IconButton position="start">
              <Search />
            </IconButton>
          ),
        }}
      />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error?.message}</p>}
      {Array.isArray(filteredUsers) && filteredUsers.length > 0 && (
        <List>
          {filteredUsers.map((user) => (
            <ContactItem key={user._id} contact={user} />
          ))}
        </List>
      )}
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Contacts" icon={<ChatBubbleOutline />} />
        <BottomNavigationAction label="Search" icon={<Search />} />
        <BottomNavigationAction label="More" icon={<MoreVert />} />
      </BottomNavigation>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ContactsPage;
