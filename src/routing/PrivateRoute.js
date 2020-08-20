import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

const PrivateRoute = (props) => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
