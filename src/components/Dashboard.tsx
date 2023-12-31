import { useSpotifyStore } from '../store';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { isLoggedIn, spotifyUser } = useSpotifyStore.getState();

  const navigate = useNavigate();

  return (
    <>
      <p>
        You are logged in! Implement your logic to display Spotify information
        here. {spotifyUser?.display_name}
      </p>

      <Button
        onClick={async () => {
          const iterations = 3;
          const tracks = [];

          const x = await axios.get(
            'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=50',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          );

          console.log({ x });

          for (let index = 0; index < iterations; index++) {
            const current = await axios.get(
              `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=${
                50 * index
              }`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              },
            );
            console.log(current.data.items);
            tracks.push(...current.data.items);
          }

          tracks.forEach((track) => console.log(track.name));
        }}
      >
        currently playing
      </Button>
      <button
        onClick={() => {
          localStorage.removeItem('verifier');
          localStorage.removeItem('code');
          localStorage.removeItem('token');

          useSpotifyStore.setState({ isLoggedIn: false, spotifyUser: null });
          navigate('/');
        }}
      >
        logout
      </button>
    </>
  );
};
