import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from '../App';
import Error from '../pages/Error';
import LandingPage from '../components/LandingPage';
import { Dashboard } from '../components/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>,
  ),
);

export const BaseRouter = () => <RouterProvider router={router} />;
