import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import {env} from '@/constant';

const routerBaseName = env === 'dev' ? '' : '';
export default () => {
  return (
    <Router basename={routerBaseName}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}