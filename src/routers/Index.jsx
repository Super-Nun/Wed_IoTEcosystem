import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import DataAnalytics from '../pages/DataAnalytics';
import MainLayout from '../layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'analytics',
        element: <DataAnalytics />
      }
    ]
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
