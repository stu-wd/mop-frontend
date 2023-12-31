import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        paddingLeft: { xs: '0px', sm: '0px', md: '100px' },
        paddingRight: { xs: '0px', sm: '0px', md: '100px' },
      }}
    >
      <Card
        sx={{
          padding: { xs: '0px', sm: '0px', md: '100px' },
          paddingTop: { xs: '50px', sm: '50px', md: '100px' },
          paddingBottom: { xs: '50px', sm: '50px', md: '100px' },
          boxShadow: {
            xs: 'none',
            sm: 'none',
            md: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h1" sx={{ textAlign: 'center', mb: 2 }}>
          404
        </Typography>
        <Typography variant="body1" sx={{ paddingLeft: 10, paddingRight: 10 }}>
          I'm sorry, but it seems like you have landed on a page that is no
          longer available or has been relocated. If you think that you were
          directed to this page by mistake, please reach out to{' '}
          <span>
            <a href="mailto:help@bitrip.com">help@bitrip.com</a>
          </span>
          for assistance.
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 5 }}
          size="large"
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
      </Card>
    </Box>
  );
};

export default Error;
