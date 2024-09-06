import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';

const MessageWithReadMore = ({ message, sender, userId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowReadMore = message.length > 500;

  return (
    <div
      
    >
      {isExpanded || !shouldShowReadMore
        ? message
        : `${message.slice(0, 500)}... `}
      {shouldShowReadMore && (
        <Button
          size="small"
          onClick={toggleReadMore}
          sx={{ padding: 0, minWidth: 'auto',fontSize:"12px",textTransform:"capitalize" }}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </Button>
      )}
    </div>
  );
};

export default MessageWithReadMore;
