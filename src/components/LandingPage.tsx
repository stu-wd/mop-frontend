import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  base64UrlEncode,
  generateRandomString,
  sha256,
} from '../services/auth';
import { useEffect } from 'react';
import { fetchProfile } from '../services/spotify';
import { useSpotifyStore } from '../store';
import axios from 'axios';

const LandingPage = () => {
  const scopes =
    'user-read-private user-read-email user-read-currently-playing user-top-read';
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const token = localStorage.getItem('token');
    const verifier = localStorage.getItem('verifier');

    if (code && verifier && !token) {
      handleCallback(code, verifier);
    } else if (!code && token) {
      fetchProfile(token)
        .then((currentUser) => {
          useSpotifyStore.setState({
            isLoggedIn: true,
            spotifyUser: currentUser,
          });
          navigate('/dashboard');
        })
        .catch((err) => console.log({ err }));
    }
  }, []);

  const handleCallback = async (code: string, verifier: string) => {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'http://localhost:5173/',
          client_id: import.meta.env.VITE_CLIENT_ID,
          code_verifier: verifier,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const accessToken = response.data.access_token;
      localStorage.setItem('token', accessToken);

      const currentUser = await fetchProfile(accessToken);
      console.log({ currentUser });

      useSpotifyStore.setState({ isLoggedIn: true, spotifyUser: currentUser });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error retrieving tokens:', error);
    }
  };

  const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = base64UrlEncode(await sha256(codeVerifier));

    localStorage.setItem('verifier', codeVerifier);

    const authorizeUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(
      {
        response_type: 'code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        scope: scopes,
        redirect_uri: 'http://localhost:5173/',
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      },
    )}`;

    window.location.href = authorizeUrl;
  };

  return (
    <div>
      <Button onClick={handleLogin}>Log in with Spotify</Button>
    </div>
  );
};

export default LandingPage;
