import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Stack,
  Divider,
  Link,
} from "@mui/material";
import { generateShortcode, isValidURL } from "../utils/helpers";
import { logEvent } from "../utils/logger";
import { Add, Link as LinkIcon } from "@mui/icons-material";

const ShortenerPage = () => {
  const [entries, setEntries] = useState([{ url: "", code: "", validity: "" }]);
  const [shortened, setShortened] = useState([]);

  const handleChange = (index, field, value) => {
    const temp = [...entries];
    temp[index][field] = value;
    setEntries(temp);
  };

  const handleAddEntry = () => {
    if (entries.length < 5) {
      setEntries([...entries, { url: "", code: "", validity: "" }]);
    }
  };

  const handleShorten = () => {
    const results = [];
    const storage = JSON.parse(localStorage.getItem("shortUrls") || "{}");

    entries.forEach((entry) => {
      if (!isValidURL(entry.url)) {
        logEvent("Invalid URL", entry);
        return;
      }

      let shortcode = entry.code || generateShortcode();
      let expiry =
        parseInt(entry.validity) > 0
          ? new Date(Date.now() + entry.validity * 60000)
          : new Date(Date.now() + 30 * 60000);

      while (storage[shortcode]) {
        shortcode = generateShortcode();
      }

      storage[shortcode] = {
        longUrl: entry.url,
        created: new Date(),
        expiry,
        clicks: [],
      };

      results.push({ ...storage[shortcode], shortcode });
      logEvent("Short URL created", { shortcode, ...storage[shortcode] });
    });

    localStorage.setItem("shortUrls", JSON.stringify(storage));
    setShortened(results);
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        🔗 Create Short URLs
      </Typography>

      <Stack spacing={3}>
        {entries.map((entry, idx) => (
          <Paper
            key={idx}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              URL #{idx + 1}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Original URL"
                  variant="outlined"
                  value={entry.url}
                  onChange={(e) => handleChange(idx, "url", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Custom Shortcode (optional)"
                  variant="outlined"
                  value={entry.code}
                  onChange={(e) => handleChange(idx, "code", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Validity (in minutes)"
                  variant="outlined"
                  value={entry.validity}
                  onChange={(e) => handleChange(idx, "validity", e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddEntry}
            disabled={entries.length >= 5}
          >
            Add Another
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LinkIcon />}
            onClick={handleShorten}
          >
            Shorten URLs
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {shortened.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              ✨ Shortened URLs
            </Typography>

            <Stack spacing={2}>
              {shortened.map((s, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    <strong>Short:</strong>{" "}
                    <Link
                      href={`/${s.shortcode}`}
                      target="_blank"
                      underline="hover"
                    >
                      {window.location.origin}/{s.shortcode}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Expires:</strong>{" "}
                    {new Date(s.expiry).toLocaleString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ShortenerPage;
