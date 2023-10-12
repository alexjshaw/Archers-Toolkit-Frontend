import { AppShell } from "@mantine/core";
import { Hero } from "../components/landingPage/Hero";
import { Features } from "../components/landingPage/Features";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate  } from 'react-router-dom';
import { useEffect } from "react";
import FallbackLoader from '../components/utility/FallbackLoader'

export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <AppShell.Main>
        <FallbackLoader />
      </AppShell.Main>
    )
  }

  return (
  <AppShell.Main>
    <Hero />
    <Features />
  </AppShell.Main>
 )
}