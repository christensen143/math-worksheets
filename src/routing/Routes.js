import React, { useContext } from 'react';

import { Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import Forbidden from '../pages/Forbidden/Forbidden';
import Home from '../pages/Home/Home';
import Setup from '../pages/Setup/Setup';
import UserAdmin from '../pages/UserAdmin/UserAdmin';
import Worksheet from '../pages/Worksheet/Worksheet';

import Login from '../components/Login/Login';

import { AppContext } from '../context/AppContext';

export default () => {
  const { user } = useContext(AppContext);
  const { role } = user;

  const isAdmin = () => {
    if (role.toLowerCase() === 'admin') {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Switch>
      <PublicRoute path="/" exact component={Home} />
      <PublicRoute path="/login" exact component={Login} />
      <PrivateRoute
        path="/useradmin"
        exact
        component={isAdmin ? UserAdmin : Forbidden}
      />
      <PrivateRoute path="/setup" exact component={Setup} />
      <PrivateRoute path="/worksheet" exact component={Worksheet} />
    </Switch>
  );
};
