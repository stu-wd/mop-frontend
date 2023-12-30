import axios from 'axios';

function generateCodeVerifier(length: number) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const redirectToAuthCodeFlow = async (clientId: string) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', 'http://localhost:5173/');
  params.append('scope', 'user-read-private user-read-email');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getAccessToken = async (code: string) => {
  const verifier = localStorage.getItem('verifier');

  console.log({ verifier });

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

function populateUI(profile: any) {
  // TODO: Update UI with profile data
}
