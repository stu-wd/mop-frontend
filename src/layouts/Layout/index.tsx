
import { ThemeProvider, useTheme } from '@mui/system';
import { ToastContainer } from 'react-toastify';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        style={{
          width: '1.5rem',
        }}
      />
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </>
  );
};