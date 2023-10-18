import { Navigate, useRoutes, Outlet } from "react-router-dom";
import { ElementType, lazy, Suspense, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import FallbackLoader from '../components/utility/FallbackLoader'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../pages/LandingPage'
import DashboardPage from "../pages/DashboardPage";
import ScoresPage from "../pages/ScoresPage";
import AuthenticationGuard from '../utils/AuthenticationGuard'

// export default function Routes() {
//   return useRoutes([
//     {
//       path: '/',
//       element: <MainLayout />,
//       children: [{ path: '', element: <LandingPage />}]
//     },
//     {
//       path: '/dashboard',
//       element: <MainLayout />,
//       children: [{ path: '', element: <DashboardPage />}]
//     },
//     {
//       path: '/scores',
//       element: <MainLayout />,
//       children: [{ path: '', element: <ScoresPage />}]
//     },
//   ])
// }

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '', element: <LandingPage />}]
    },
    {
      path: '/dashboard',
      element: <MainLayout />,
      children: [{ path: '', element: <AuthenticationGuard component={DashboardPage} />}]
    },
    {
      path: '/scores',
      element: <MainLayout />,
      children: [{ path: '', element: <AuthenticationGuard component={ScoresPage} />}]
    },
  ])
}