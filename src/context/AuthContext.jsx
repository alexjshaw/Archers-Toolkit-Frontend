import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  profileComplete: false,
  currentUser: null
});

export default AuthContext;
