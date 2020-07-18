import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Setup from '../pages/Setup/Setup';
import Worksheet from '../pages/Worksheet/Worksheet';

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/setup" exact component={Setup} />
      <Route path="/worksheet" exact component={Worksheet} />
    </Switch>
  );
};
