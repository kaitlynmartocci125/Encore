import React from 'react';

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

function base64urlencode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generatePKCEChallenge() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const code_verifier = base64urlencode(array);

  const encoder = new TextEncoder();
  const data = encoder.encode(code_verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const code_challenge = base64urlencode(digest);

  return { code_verifier, code_challenge };
}

const loginWithSpotify = async () => {
  const { code_verifier, code_challenge } = await generatePKCEChallenge();
  console.log("Generated code_verifier:", code_verifier);

  localStorage.setItem("pkce_verifier", code_verifier);
  console.log("Stored verifier from localStorage:", localStorage.getItem("pkce_verifier"));

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
