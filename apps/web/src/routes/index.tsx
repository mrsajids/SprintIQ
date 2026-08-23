import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    // Protected routes — wrap with PrivateRoute when auth is ready
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
])
