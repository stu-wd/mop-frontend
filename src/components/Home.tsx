import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);
  return (
    <div>
      <Typography>Home</Typography>
    </div>
  );
};

export default Home;
