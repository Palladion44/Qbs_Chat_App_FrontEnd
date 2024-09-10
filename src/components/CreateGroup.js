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

} from "@mui/material";
import {Search} from "@mui/icons-material";
import { GetUsers, SendReceiverId,setSelectedContact,GetAllChats } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CreateGroup = ({onClose}) => {
  return (
    <Container disableGutters>



<AppBar position="static" disableGutters sx={{ boxShadow: "none" }}>
  <Toolbar sx={{ backgroundColor: "#0BC827" }}>
    <IconButton onClick={onClose}>
      <ArrowBackIosIcon sx={{ color: "white" }} />
    </IconButton>
    <Typography variant="h6" sx={{ fontFamily: "Poppins", flexGrow: 1 }}>
      New Group
    </Typography>
  </Toolbar>
</AppBar>

    </Container>

  )
}

export default CreateGroup