import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { user } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
