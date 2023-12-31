import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSpotifyStore } from '../store';
import { useTheme } from '@mui/system';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [state, setState] = useState({
    left: false,
  });
  const [open, setOpen] = useState(false);

  const { isLoggedIn, mode } = useSpotifyStore.getState();

  const theme = useTheme();
  let location = useLocation();

  const globalContainerStyles =
    location.pathname === '/login'
      ? {}
      : {
          paddingTop: '85px',
          paddingBottom: '40px',
          paddingX: 1,
          margin: 'auto',
          width: {
            xs: '100%',
            sm: '100%',
            md: '90%',
            lg: '80%',
          },
        };

  const handleLogout = async () => {
    try {
      useSpotifyStore.setState({
        isLoggedIn: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      setState({ left: false });
    }
  }, [isLoggedIn]);

  const toggleDarkMode = () => {
    useSpotifyStore.setState((state) => ({
      ...state,
      mode: state.mode === 'dark' ? 'light' : 'dark',
    }));

    localStorage.setItem('theme', mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            backgroundColor: `${theme.palette.background.default} !important`,
          },
        }}
      />
      {/* {!isRegistering && isLoggedIn && user && (
        <BrAppBar open={open} setOpen={setOpen} />
      )}

      {!isRegistering && isLoggedIn && user && (
        <BrDrawer
          open={open}
          setOpen={setOpen}
          user={user}
          toggleTheme={toggleDarkMode}
          themeMode={mode}
        />
      )} */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          maxWidth: '100%',
          backgroundColor: `${theme.palette.background.default} !important`,
        }}
      >
        <Box component="div" sx={globalContainerStyles}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
