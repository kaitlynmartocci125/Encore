import React from 'react';
import pkceChallenge from 'pkce-challenge'; // v2 uses default export

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];

const loginWithSpotify = () => {
  const { code_verifier, code_challenge } = pkceChallenge(); // ✅ v2 syntax

  console.log("Generated code_verifier:", code_verifier);
  localStorage.setItem("pkce_verifier", code_verifier);
  console.log("Stored verifier:", localStorage.getItem("pkce_verifier"));

  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${SCOPES.join('%20')}&code_challenge_method=S256&code_challenge=${code_challenge}`;

  setTimeout(() => {
    window.location.href = authUrl;
  }, 300);
};

function Login() {
  return (
    <div className="page-wrapper">
      <div className="login-box">
        <h1>Welcome to Encore</h1>
        <p>Encore, because the crowd always wants one more</p>
        <button onClick={loginWithSpotify} className="spotify-button">
          Login With Spotify
        </button>
      </div>
    </div>
  );
}

export default Login;
