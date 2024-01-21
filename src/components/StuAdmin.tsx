import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StuAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const stuToken = localStorage.getItem('stuToken');

    if (!stuToken) {
      const setup = async () => await handleSetup();

      setup();
    }
    navigate('/login');
  }, []);

  const handleSetup = async () => {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = 'http://localhost:8090/setup';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return <></>;
};

export default StuAdmin;
