import { Navigate, useRoutes } from "react-router-dom";
import { ElementType, lazy, Suspense, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import FallbackLoader from '../components/utility/FallbackLoader'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../pages/LandingPage'
import DashboardPage from "../pages/DashboardPage";

export default function Routes() {
  const { isAuthenticated, isLoading } = useAuth0();

  return useRoutes([
    // {
    //   path: '/',
    //   element: <MainLayout />,
    //   children: [
    //     { 
    //       path: '', 
    //       element: isLoading ? <FallbackLoader /> : isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
    //     }
    //   ]
    // },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '', element: <LandingPage />}]
    },
    {
      path: '/dashboard',
      element: <MainLayout />,
      children: [{ path: '', element: <DashboardPage />}]
    },
  ])
}