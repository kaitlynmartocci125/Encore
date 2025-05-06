// server.js or routes/auth.js

const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const app = express();
const port = 8888;

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback';

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-modify-public playlist-read-private';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      })
  );
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const { access_token, refresh_token } = response.data;
    res.redirect(`http://localhost:3000/?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (err) {
    res.send(err.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
