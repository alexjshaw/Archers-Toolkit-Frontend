import PropTypes from 'prop-types'
import { Button } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

export function LoginButton({ className }) {
  const { loginWithRedirect } = useAuth0();
  const { updateProfileComplete } = useContext(AuthContext)

  const handleLogin = async () => {
    localStorage.removeItem("profileComplete");

    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  }

  return (
    <Button size="lg" variant="default" color="gray" onClick={handleLogin} className={className}>
      Sign In
    </Button>
  )
}

LoginButton.propTypes = {
  className: PropTypes.string
}