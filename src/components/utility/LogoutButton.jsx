import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { Button } from "@mantine/core";
import AuthContext from "../../context/AuthContext";

export function LogoutButton () {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button size="lg" variant="default" onClick={handleLogout}>
      Log Out
    </Button>
  )
}