import PropTypes from 'prop-types'
import { Button } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

export function SignupButton({ className }) {
  const { loginWithRedirect } = useAuth0();
  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button size="lg" onClick={handleSignUp} className={className} >
      Register
    </Button>
  )
}

SignupButton.propTypes = {
  className: PropTypes.string
}