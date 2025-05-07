import React from 'react';
import pkceChallenge from 'pkce-challenge';

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
  const { code_challenge, code_verifier } = pkceChallenge();
  localStorage.setItem("pkce_verifier", code_verifier);
  console.log("Generated verifier:", code_verifier);

  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${SCOPES.join('%20')}&code_challenge_method=S256&code_challenge=${code_challenge}`;

  // Short delay to make sure localStorage is written
  setTimeout(() => {
    window.location.href = authUrl;
  }, 200);
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
