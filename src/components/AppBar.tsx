import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

export const SpotifyAppBar = () => {
  return (
    <MuiAppBar>
      <Toolbar
        sx={{
          margin: 'auto',
          width: '80%',
        }}
      >
        <Typography variant="h6">Your App Name</Typography>
        <Typography variant="h6">Profile</Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
