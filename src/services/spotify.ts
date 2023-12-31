import axios from 'axios';

export const getAccessToken = async (code: string) => {
  const verifier = localStorage.getItem('verifier');

  return await axios
    .post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        code,
        redirect_uri: 'http://localhost:5173/',
        code_verifier: verifier,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((res) => {
      console.log('token => ', res.data.access_token);
      const token = res.data.access_token;
      return token;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchProfile = async (token: string): Promise<any> => {
  try {
    const result = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    return await result.json();
  } catch (error) {
    console.log(error);
  }
};
