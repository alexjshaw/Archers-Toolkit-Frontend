import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FallbackLoader from "../components/utility/FallbackLoader";
import AuthContext from "../context/AuthContext";
import {useAuth0} from "@auth0/auth0-react";

const AuthenticationGuard = ({component}) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()
  const profileComplete = JSON.parse(localStorage.getItem('profileComplete'));

  useEffect(() => {
    if (!profileComplete) {
      navigate("/dashboard")
    }
  }, [profileComplete, navigate])

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
        <FallbackLoader />
    ),
  });

  return <Component />
}

export default AuthenticationGuard