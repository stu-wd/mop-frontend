import { useSpotifyStore } from '../store';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getSpotifyStuser, getSpotifyUser } from '../services/spotify';

export const Dashboard = () => {
  const { spotifyUser, spotifyStuser } = useSpotifyStore.getState();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const token = localStorage.getItem('token');
    const stuToken = localStorage.getItem('stuToken');
    const verifier = localStorage.getItem('verifier');

    if (code && verifier && !token) {
      handleCallback(code, verifier);
    } else if (!code && token && stuToken) {
      getSpotifyUser(stuToken)
        .then((stuser) => {
          useSpotifyStore.setState({
            spotifyStuser: stuser,
          });
        })
        .catch((err) => console.log({ err }));

      getSpotifyUser(token)
        .then((currentUser) => {
          useSpotifyStore.setState({
            spotifyUser: currentUser,
          });
        })
        .catch((err) => console.log({ err }));

      useSpotifyStore.setState({
        isLoggedIn: true,
      });
    }
  }, []);

  const handleCallback = async (code: string, verifier: string) => {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'http://localhost:5151/dashboard',
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

      const currentUser = await getSpotifyUser(accessToken);

      const stuser = await getSpotifyUser(
        localStorage.getItem('stuToken') ?? '',
      );

      useSpotifyStore.setState({
        isLoggedIn: true,
        spotifyUser: currentUser,
        spotifyStuser: stuser,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error retrieving tokens:', error);
    }
  };

  return (
    <>
      <p>
        You are logged in! Implement your logic to display Spotify information
        here. {spotifyUser?.display_name} && {spotifyStuser?.display_name}
      </p>

      {/* <Button
        onClick={async () => {
          await axios.get(`https://api.spotify.com/`);
        }}
      >
        get album per day playlist
      </Button> */}

      <Button
        onClick={async () => {
          const x = await axios.get(
            'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          );

          console.log(x.data.items);
        }}
      >
        guest top
      </Button>
      <Button
        onClick={async () => {
          const x = await axios.get(
            'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('stuToken')}`,
              },
            },
          );

          console.log(x.data.items);
        }}
      >
        stu top
      </Button>
      <Button
        onClick={async () => {
          const iterations = 5;
          const tracks = [];

          for (let index = 0; index < iterations; index++) {
            const x = await axios.get(
              `https://api.spotify.com/v1/users/${
                spotifyStuser.id
              }/playlists?limit=50&offset=${index * 50}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('stuToken')}`,
                },
              },
            );

            // console.log(x.data.items);
            tracks.push(...x.data.items);
          }

          const albumPerDay = tracks.find(
            (track) => track.name === '2024 album per day',
          );

          const iterations2 = 200;
          const tracks2 = [];

          for (let index = 0; index < iterations2; index++) {
            if (index % 10 === 0) {
              console.log('working', index);
            }

            const playlistResponse = await axios.get(
              `https://api.spotify.com/v1/playlists/${
                albumPerDay.id
              }/tracks?limit=50&offset=${index * 50}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('stuToken')}`,
                },
              },
            );

            tracks2.push(...playlistResponse.data.items);
          }

          console.log(tracks2);

          const albums: Record<string, undefined> = {};
          const albums2: Record<string, undefined> = {};
          tracks2.map((track) => {
            if (!albums[track.track.album.id]) {
              albums[track.track.album.id] = undefined;
            }
            if (!albums2[track.track.album.name]) {
              albums2[track.track.album.name] = undefined;
            }
          });

          console.log(albums2, Object.keys(albums).length);
        }}
      >
        playlists
      </Button>
      <Button
        onClick={() => {
          console.log(useSpotifyStore.getState());
        }}
      >
        log users
      </Button>
      <button
        onClick={() => {
          localStorage.removeItem('verifier');
          localStorage.removeItem('code');
          localStorage.removeItem('token');
          localStorage.removeItem('stuToken');

          useSpotifyStore.setState({
            isLoggedIn: false,
            spotifyUser: null,
            spotifyStuser: null,
          });
          navigate('/');
        }}
      >
        logout
      </button>
    </>
  );
};
