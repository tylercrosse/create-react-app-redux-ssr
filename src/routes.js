import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router'

import App       from './App.jsx';
import Custom    from './Custom.jsx';
import Container from './Container.jsx';

const Routes = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Container}>
        <IndexRoute component={App} />
        <Route path="/custom" component={Custom} />
      </Route>
      <Route path="*">
        <IndexRedirect to="/" />
      </Route>
    </Router>
  )
}

export default Routes;
