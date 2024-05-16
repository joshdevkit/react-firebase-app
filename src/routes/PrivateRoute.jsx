import React from 'react';
import RouteWrapper from '../components/RouteWrapper';

const PrivateRoute = ({ element, ...rest }) => {
  return <RouteWrapper element={element} {...rest} />;
};

export default PrivateRoute;
