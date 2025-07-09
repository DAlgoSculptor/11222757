import React from "react";
import {
  Typography,
  Paper,
  Box,
  Stack,
  Divider,
  Link,
  Chip,
} from "@mui/material";
import ClickStats from "../components/ClickStats";

const StatsPage = () => {
  const db = JSON.parse(localStorage.getItem("shortUrls") || "{}");
  const entries = Object.entries(db);

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        📊 URL Analytics Dashboard
      </Typography>

      {entries.length === 0 ? (
        <Typography color="text.secondary" mt={4}>
          No shortened URLs found. Start by shortening a link first!
        </Typography>
      ) : (
        <Stack spacing={3}>
          {entries.map(([shortcode, data]) => (
            <Paper
              key={shortcode}
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h6" color="primary">
                  🔗 {window.location.origin}/{shortcode}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Original:{" "}
                  <Link
                    href={data.longUrl}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                  >
                    {data.longUrl}
                  </Link>
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  useFlexGap
                >
                  <Chip
                    label={`Created: ${new Date(
                      data.created
                    ).toLocaleString()}`}
                    variant="outlined"
                    color="info"
                  />
                  <Chip
                    label={`Expires: ${new Date(
                      data.expiry
                    ).toLocaleString()}`}
                    variant="outlined"
                    color="warning"
                  />
                  <Chip
                    label={`Clicks: ${data.clicks.length}`}
                    variant="outlined"
                    color="success"
                  />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <ClickStats clicks={data.clicks} />
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default StatsPage;
