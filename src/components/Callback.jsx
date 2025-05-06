import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (!code) {
      console.error("No code found in URL");
      return;
    }
    const code_verifier = localStorage.getItem("pkce_verifier");
    console.log("Verifier being used:", code_verifier); // should NOT be undefined
    
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        code_verifier
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Token response:", data); // ✅ This is Part 4

        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          navigate("/dashboard");
        } else {
          console.error("Failed to get token:", data);
        }
      })
      .catch(err => {
        console.error("Error during token exchange:", err);
      });
  }, [navigate]);

  return <p>Logging in with Spotify...</p>;
}

export default Callback;
