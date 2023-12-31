// // import '@fontsource/roboto/300.css';
// // import '@fontsource/roboto/400.css';
// // import '@fontsource/roboto/500.css';
// // import '@fontsource/roboto/700.css';
// // import { useSpotifyStore } from '../store';
// // import { Container } from '@mui/system';
// // import { SpotifyAppBar } from './AppBar';

// // type LayoutProps = {
// //   children: React.ReactNode;
// // };

// // const Layout: React.FC<LayoutProps> = ({ children }) => {
// //   const { isLoggedIn, spotifyUser } = useSpotifyStore.getState();

// //   console.log({ isLoggedIn, spotifyUser });

// //   return (
// //     <>
// //       <SpotifyAppBar />
// //       <Container sx={{ width: '100vw', border: '1px solid red' }}>
// //         <Container
// //           maxWidth={'xl'}
// //           sx={{
// //             margin: 'auto',
// //             // width: 'inherit',
// //             display: 'flex',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             border: '1px solid limegreen',
// //           }}
// //         >
// //           {children}
// //         </Container>
// //       </Container>
// //     </>
// //   );
// // };

// // export default Layout;
// import React from 'react';
// import { useSpotifyStore } from '../store';
// import { Container, ThemeProvider } from '@mui/system';
// import { SpotifyAppBar } from './AppBar';
// import CssBaseline from '@mui/material/CssBaseline';
// import { createTheme } from '@mui/material/styles';

// type LayoutProps = {
//   children: React.ReactNode;
// };

// const theme = createTheme();

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { isLoggedIn, spotifyUser } = useSpotifyStore.getState();

//   console.log({ isLoggedIn, spotifyUser });

//   return (
//     <ThemeProvider theme={theme}>
//       <SpotifyAppBar />
//       <Container sx={{ minHeight: '100vh', border: '1px solid red' }}>
//         <Container
//           maxWidth={'xl'}
//           sx={{
//             margin: 'auto',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'flex-start', // Align to the top
//             alignItems: 'center',
//             border: '1px solid limegreen',
//             paddingTop: theme.spacing(2), // Add some space at the top
//           }}
//         >
//           {children}
//         </Container>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default Layout;

import React from 'react';
import { useSpotifyStore } from '../store';
import { Box, Container, ThemeProvider } from '@mui/system';
import { SpotifyAppBar } from './AppBar';
import { createTheme } from '@mui/material/styles';

type LayoutProps = {
  children: React.ReactNode;
};

const theme = createTheme();

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, spotifyUser } = useSpotifyStore.getState();

  console.log({ isLoggedIn, spotifyUser });

  return (
    <ThemeProvider theme={theme}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        minWidth={'100vw'}
        sx={
          {
            // overflowX: 'hidden',
            // margin: 0,
            // padding: 0,
          }
        }
      >
        <SpotifyAppBar />
        <Container
          sx={{
            minHeight: '100vh',
            border: '1px solid red',
          }}
        >
          <Container
            maxWidth={'xl'}
            sx={{
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Center horizontally
              alignItems: 'center', // Center vertically
              border: '1px solid limegreen',
              paddingTop: theme.spacing(2), // Add some space at the top
            }}
          >
            {children}
          </Container>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
