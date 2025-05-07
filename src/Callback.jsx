import React, { useEffect } from 'react';

function Callback() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const code_verifier = localStorage.getItem("pkce_verifier");

    console.log("Retrieved code_verifier:", code_verifier);

    if (!code || !code_verifier) {
      console.error("Missing code or code_verifier");
      return;
    }

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        code_verifier,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Token response:", data);
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/dashboard";
        } else {
          console.error("Failed to get token:", data);
        }
      })
      .catch(err => {
        console.error("Error exchanging code for token:", err);
      });
  }, []);

  return <p>Logging in with Spotify...</p>;
}

export default Callback;
