import React from 'react'
import {

    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,

  
  } from "@mui/material";
const ContactItem = ({contact,onClick}) => {
  return (
    <ListItem onClick={() => onClick(contact)}>
    <ListItemAvatar>
      <Avatar src={contact.profile_url} />
    </ListItemAvatar>
    <ListItemText primary={contact.name} secondary={contact.status} />
  </ListItem>
  )
}

export default ContactItem