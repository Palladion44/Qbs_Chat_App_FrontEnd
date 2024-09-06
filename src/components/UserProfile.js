import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Button
} from "@mui/material";
import userAvatar from "../assets/Avatar.png";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch } from "react-redux";
import {logout} from  "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ onClose ,profile,name}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for managing the fields
  const [about, setAbout] = useState("Be happy");

  // State for managing edit mode
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  // Toggle the editing state
  const handleEditName = () => setIsEditingName(!isEditingName);
  const handleEditAbout = () => setIsEditingAbout(!isEditingAbout);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
};
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        alignContent: "center",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "#4CAF50" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={onClose}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8, mb: 2, ml: 12 }}>
        <Avatar
          src={profile} // Replace with your image URL
          alt="Profile Picture"
          sx={{ width: 170, height: 170 }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              mr: 2,
              ml: 4,
              fontFamily: "poppins",
              fontWeight: "400",
              fontSize: "20px",
              mb: 2,
            }}
          >
          Your Name
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            value={name}
            // onChange={(e) => setName(e.target.value)}
            InputProps={{
              readOnly: !isEditingName,
              endAdornment: (
                <IconButton onClick={handleEditName}>
                  <EditIcon />
                </IconButton>
              ),
            }}
            sx={{
              flexGrow: 1,
              ml: 4,
              backgroundColor: isEditingName ? "white" : "lightgray",
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              mr: 2,
              ml: 4,
              fontFamily: "poppins",
              fontWeight: "400",
              fontSize: "20px",
              mb: 2,
            }}
          >
            About
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            InputProps={{
              readOnly: !isEditingAbout,
              endAdornment: (
                <IconButton onClick={handleEditAbout}>
                  <EditIcon />
                </IconButton>
              ),
            }}
            sx={{
              flexGrow: 1,
              ml: 4,
              backgroundColor: isEditingAbout ? "white" : "lightgray",
            }}
          />
        </Box>
      </Box>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default UserProfile;
