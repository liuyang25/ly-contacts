import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Main from '@/containers/main';
// import Login from '@/containers/login';

export default () => {
  return (
      <Router>
        <Switch>
          {/* <Route path="/Login" component={Login} /> */}
          <Route path="/" component={Main} />
        </Switch>
      </Router>
  );
};