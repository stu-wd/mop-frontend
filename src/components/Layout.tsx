import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useSpotifyStore } from '../store';
import { Container } from '@mui/system';
import { SpotifyAppBar } from './AppBar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, mode, spotifyUser } = useSpotifyStore.getState();

  console.log({ isLoggedIn, spotifyUser });

  return (
    <>
      <Container sx={{ minWidth: '100vw' }}>
        <SpotifyAppBar />
        <Container
          maxWidth={'xl'}
          sx={{
            margin: 'auto',
            width: '80%',
          }}
        >
          {children}
        </Container>
      </Container>
    </>
  );
};

export default Layout;
