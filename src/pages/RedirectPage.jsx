import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../utils/logger";

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get stored short URL mappings
    const db = JSON.parse(localStorage.getItem("shortUrls") || "{}");
    const entry = db[shortcode];

    // If no shortcode found, redirect to home
    if (!entry) {
      logEvent("Shortcode not found", { shortcode });
      navigate("/");
      return;
    }

    // If shortcode has expired, redirect to home
    if (new Date(entry.expiry) < new Date()) {
      logEvent("Shortcode expired", { shortcode });
      navigate("/");
      return;
    }

    // Log click data
    entry.clicks.push({
      time: new Date(),
      source: document.referrer || "Direct",
    });

    // Update local storage
    db[shortcode] = entry;
    localStorage.setItem("shortUrls", JSON.stringify(db));

    // Log and redirect to the original long URL
    logEvent("Redirecting", { shortcode, longUrl: entry.longUrl });
    window.location.href = entry.longUrl;

  }, [shortcode, navigate]);

  // Optional: Add a fallback UI if desired
  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
      <p>Redirecting...</p>
    </div>
  );
};

export default RedirectPage;
