import { Button } from '@mui/material';

const LandingPage = () => {
  const handleSetup = async () => {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = 'http://localhost:8888/setup';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div>
      <Button onClick={handleSetup}>Let's get started</Button>
    </div>
  );
};

export default LandingPage;
