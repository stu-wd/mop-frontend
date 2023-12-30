import axios from 'axios';
import './App.css';
import {
  fetchProfile,
  getAccessToken,
  redirectToAuthCodeFlow,
} from './services/spotify';
import { useEffect, useState } from 'react';

const App = () => {
  console.log('hello world');

  const [code, setCode] = useState<string | null>();
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);

      const code = params.get('code');

      if (!code) {
        redirectToAuthCodeFlow(import.meta.env.VITE_CLIENT_ID);
      } else {
        try {
          setCode(code);
          localStorage.setItem('code', code);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [code]);

  return (
    <>
      <button
        onClick={async () => {
          // const accessToken = localStorage.getItem('access-token');
          // console.log({ accessToken });
          console.log({ code });
          const accessToken = await getAccessToken(code ?? '');
          setToken(accessToken);
          console.log({ accessToken });

          // axios
          //   .get('https://api.spotify.com/v1/me', {
          //     headers: { Authorization: `Bearer ${accessToken}` },
          //   })
          //   .then((res) => {
          //     console.log(res.data);
          //   })
          //   .catch((err) => console.log(err));
        }}
      >
        get
      </button>
      <button
        onClick={() => {
          console.log('state', token);
          console.log('LS: ', localStorage.getItem('token'));
        }}
      >
        see token
      </button>
      <button
        onClick={async () => {
          const p = await fetchProfile(token ?? '');
          console.log({ p });
        }}
      >
        profile
      </button>
    </>
  );
};

export default App;
