import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const SpotifyAppBar = () => {
  return (
    <MuiAppBar
      position="static"
      sx={{
        backgroundColor: 'green',
        border: '1px solid white',
      }}
    >
      <Toolbar
        sx={{
          margin: 'auto',
          width: '60%',
          border: '2px solid pink',
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Your App Name
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 0.25,
            // flexDirection: 'row',
            justifyContent: 'space-between',
            // border: '1px solid blue',
            // alignItems: 'end',
          }}
        >
          <Typography variant="h6">Profile</Typography>
          <Typography variant="h6">Stats</Typography>
          <Typography variant="h6">Logout</Typography>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
