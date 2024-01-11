import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  base64UrlEncode,
  generateRandomString,
  sha256,
} from '../services/auth';
import { useEffect } from 'react';

const Login = () => {
  const scopes =
    'user-read-private user-read-email user-read-currently-playing user-top-read playlist-read-private playlist-read-collaborative';
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.size > 0) {
      const accessToken = params.get('access_token');

      localStorage.setItem('stuToken', accessToken ?? '');
      navigate('/login');
    }
  }, []);

  const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = base64UrlEncode(await sha256(codeVerifier));

    localStorage.setItem('verifier', codeVerifier);

    const authorizeUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(
      {
        response_type: 'code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        scope: scopes,
        redirect_uri: 'http://localhost:5151/dashboard',
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

export default Login;
