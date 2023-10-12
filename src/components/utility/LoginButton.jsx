import PropTypes from 'prop-types'
import { Button } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

export function LoginButton({ className }) {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
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