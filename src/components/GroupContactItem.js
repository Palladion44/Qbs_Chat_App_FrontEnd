import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar, Checkbox } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const GroupContactItem = ({ contact, isSelected, onSelect }) => (
  <ListItem disabled={isSelected}> {/* Disable the ListItem when the contact is selected */}
    <ListItemAvatar>
      <Avatar src={contact.profile_url} />
    </ListItemAvatar>
    <ListItemText primary={contact.name} secondary={contact.status} />
    <Checkbox
  checked={isSelected}
  onChange={() => onSelect(contact)}
  disabled={isSelected}
  icon={<CheckCircleOutlineIcon />} // Circular outline when unchecked
  checkedIcon={<CheckCircleIcon />} // Filled circle when checked
  sx={{
    color: "green", // Base color for unchecked state
    '&.Mui-disabled': {
      color: "green", // Green even when disabled
    },
    '&.Mui-checked': {
      color: "green", // Green when checked
    },
  }}
/>
  </ListItem>
);

export default GroupContactItem;
