import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import LandingPage from '@/pages/LandingPage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    // Protected workspace routes
    element: <PrivateRoute />,
    children: [
      {
        path: '/app',
        element: <HomePage />,
      },
      {
        path: '/dashboard',
        element: <HomePage />,
      },
    ],
  },
])
