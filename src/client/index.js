import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {withTracker } from 'meteor/react-meteor-data';
import NotFound from './NotFound';
import Typography from '@material-ui/core/Typography';
//import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import './clientModules';
import CssBaseline from "@material-ui/core/CssBaseline";

const AppRouter = props => {
  const routes = [];
  for(const moduleIndex in Meteor.modules) {
    const module = Meteor.modules[moduleIndex];
    if(module.routes) {
      for(const routeIndex in module.routes) {
        routes.push(module.routes[routeIndex]);
      }
    }
  }
  var x = 0;
  console.log(routes, Meteor.modules);
  return (
    <div>
    <CssBaseline />
    <Router>
      <Switch>
        {routes.map((route) =><Route exact key={x++} path={route.path} component={route.component} {...props} />)}
        <Route component={NotFound} />
      </Switch>
    </Router>
    </div>
)};

AppRouter.propTypes = {
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

const AppContainer = withTracker(() => {
  const { connected } = Meteor.status();
  return {
    connected: connected
  };
})(AppRouter);

render(<AppContainer />, document.getElementById('app'));
