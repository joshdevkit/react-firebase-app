import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RouteWrapper = ({ element, redirectTo, ...rest }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Route {...rest} element={element} />;
};

export default RouteWrapper;
