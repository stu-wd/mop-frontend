// import { useEffect } from 'react';
// import axios from 'axios';
// import { fetchProfile } from './services/spotify';
// import { Button } from '@mui/material';
// import { useSpotifyStore } from './store';

// const App = () => {
//   const { isLoggedIn, spotifyUser } = useSpotifyStore();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');

//     const token = localStorage.getItem('token');
//     const verifier = localStorage.getItem('verifier');

//     if (code && verifier && !token) {
//       handleCallback(code, verifier);
//     } else if (!code && token) {
//       fetchProfile(token)
//         .then((currentUser) => {
//           useSpotifyStore.setState({ isLoggedIn: true, spotifyUser: currentUser });
//         })
//         .catch((err) => console.log({ err }));
//     }
//   }, []);

//   const handleCallback = async (code: string, verifier: string) => {
//     try {
//       const response = await axios.post(
//         'https://accounts.spotify.com/api/token',
//         new URLSearchParams({
//           grant_type: 'authorization_code',
//           code,
//           redirect_uri: 'http://localhost:5173/',
//           client_id: import.meta.env.VITE_CLIENT_ID,
//           code_verifier: verifier,
//         }),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         },
//       );

//       const accessToken = response.data.access_token;
//       localStorage.setItem('token', accessToken);

//       const currentUser = await fetchProfile(accessToken);

//       useSpotifyStore.setState({ isLoggedIn: true, spotifyUser: currentUser });
//     } catch (error) {
//       console.error('Error retrieving tokens:', error);
//     }
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <>
//           <p>
//             You are logged in! Implement your logic to display Spotify
//             information here. {spotifyUser?.display_name}
//           </p>

//           <Button
//             onClick={async () => {
//               const iterations = 3;
//               const tracks = [];

//               const x = await axios.get(
//                 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=50',
//                 {
//                   headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                   },
//                 },
//               );

//               console.log({ x });

//               for (let index = 0; index < iterations; index++) {
//                 const current = await axios.get(
//                   `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=${
//                     50 * index
//                   }`,
//                   {
//                     headers: {
//                       Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                   },
//                 );
//                 console.log(current.data.items);
//                 tracks.push(...current.data.items);
//               }

//               tracks.forEach((track) => console.log(track.name));
//             }}
//           >
//             currently playing
//           </Button>
//           <button
//             onClick={() => {
//               localStorage.removeItem('verifier');
//               localStorage.removeItem('code');
//               localStorage.removeItem('token');

//               useSpotifyStore.setState({ isLoggedIn: false });
//             }}
//           >
//             logout
//           </button>
//         </>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default App;

import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
