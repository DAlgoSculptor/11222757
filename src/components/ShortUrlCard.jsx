import React from "react";
import {
  Paper,
  Typography,
  Box,
  Link,
  useTheme,
  Stack,
} from "@mui/material";
import { AccessTime, Link as LinkIcon } from "@mui/icons-material";

const ShortUrlCard = ({ shortcode, originalUrl, expiry }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.mode === "dark"
          ? "#1e1e1e"
          : "#f5f5f5",
        border: `1px solid ${
          theme.palette.mode === "dark" ? "#333" : "#ddd"
        }`,
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h6" color="primary">
          🔗 Shortened URL
        </Typography>
        <Typography variant="body1">
          <strong>Original:</strong>{" "}
          <Link
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {originalUrl}
          </Link>
        </Typography>

        <Typography variant="body1">
          <strong>Short URL:</strong>{" "}
          <Link
            href={`/${shortcode}`}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="secondary"
          >
            {window.location.origin}/{shortcode}
          </Link>
        </Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <AccessTime sx={{ fontSize: 20, mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            Expires: {new Date(expiry).toLocaleString()}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ShortUrlCard;
