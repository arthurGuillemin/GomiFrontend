import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isloading } = useContext(AuthContext);

  if (isloading) return <div>Chargement...</div>;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
