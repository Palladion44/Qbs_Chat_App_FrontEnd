// SelectedContacts.js
import React from 'react';
import { Box, Typography, Avatar,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
const SelectedContacts = ({ contacts,onDeselect }) => (
  <Box sx={{ padding: 1, borderRadius: 1 }}>

    {contacts.length === 0 ? (
      null
    ) : (
        <Box 
        sx={{ 
          width:'90%',
          margin:"0 auto",
          display: 'flex', 
          flexWrap: "wrap",
          gap: 1.5,
          maxHeight: "120px", // Adjust as needed
          overflowY: "auto"    // Enables scrolling when overflow occurs
        }}
      >
        {contacts.map((contact) => (
          <Box
            key={contact._id}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 0,
              borderRadius: 1,
              textAlign: 'center',
              width: 45,
            }}
          >
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: "#D9D9D9",
                color: "white",
                padding: "2px"
              }}
              onClick={() => onDeselect(contact._id)} // Deselect contact
            >
              <CloseIcon sx={{ fontSize: "0.7rem" }} />
            </IconButton>
            <Avatar src={contact.profile_url} sx={{ width: 50, height: 50, marginBottom: 1 }} />
            <Typography variant="body2" sx={{ fontSize: "0.7rem" }}>{contact.name}</Typography>
          </Box>
        ))}
      </Box>

    )}
  </Box>
);

export default SelectedContacts;
