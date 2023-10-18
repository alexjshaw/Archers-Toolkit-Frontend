import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [profileComplete, setProfileComplete] = useState(false);
  const [currentUser, setCurrentUser] = useState()

  const updateProfileComplete = (value) => {
    setProfileComplete(value);
 };

 const updateCurrentUser = (value) => {
  setCurrentUser(value)
 }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, profileComplete, updateProfileComplete, currentUser, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;