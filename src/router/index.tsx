import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  RouteProps,
} from 'react-router-dom';
import App from '../App';
import Error from '../pages/Error';
import { Dashboard } from '../components/Dashboard';
import Login from '../components/Login';
import StuAdmin from '../components/StuAdmin';
import Layout from '../components/Layout';

type RouteConfig = RouteProps & {
  children?: RouteConfig[];
};

const createRoutes = (routes: RouteConfig[]) =>
  routes.map(({ element, errorElement, index, path }) => (
    <Route
      key={path || index ? 'index' : ''}
      path={path}
      element={element}
      errorElement={errorElement}
      index={index}
    />
  ));

const routes: RouteConfig[] = [
  // {index: true, element: <Navigate to="login" />},
  {
    path: 'stuAdmin',
    element: (
      <Layout>
        <StuAdmin />
      </Layout>
    )
  },
  {
    path: 'login',
    element: (
      <Layout>
        <Login />
      </Layout>
    )
  },
  {
    path: 'dashboard',
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    )
  }
];

const mainRoute = {
  path: '/',
  element: <App />,
  errorElement: <Error />,
  children: createRoutes(routes)
};

const router = createBrowserRouter(
  createRoutesFromElements(<Route {...mainRoute} />)
);

export const BaseRouter = () => <RouterProvider router={router} />;
