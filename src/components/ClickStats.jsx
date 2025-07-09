import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

const ClickStats = ({ clicks = [] }) => {
  if (clicks.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No clicks recorded yet.
      </Typography>
    );
  }

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Click Details:
      </Typography>
      <List dense>
        {clicks.map((click, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={`Time: ${new Date(click.time).toLocaleString()}`}
                secondary={`Source: ${click.source}`}
              />
            </ListItem>
            {index < clicks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ClickStats;
