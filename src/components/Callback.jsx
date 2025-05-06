import React, { useEffect } from 'react';

function Callback() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (!code) {
      console.error("No code found in URL");
      return;
    }

    const code_verifier = localStorage.getItem("pkce_verifier");

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
        if (data.access_token) {
          console.log("Access Token:", data.access_token);
        } else {
          console.error("Failed to get token:", data);
        }
      });
  }, []);

  return <p>Logging in with Spotify...</p>;
}

export default Callback;
