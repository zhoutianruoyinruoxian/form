import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import menuList from 'src/config/menuList';
import { NotFound, NoPermission } from 'src/containers';
import FormEditor from 'pages/FormEditor';
// import test from 'pages/test';

export default (store) => {
  return (
    <HashRouter>
      <App>
        <Switch>
          <Redirect exact from="/" to="/FormEditor" />
          <Route exact path="/FormEditor" component={FormEditor} />
          {/* <Route exact path="/test" component={test} /> */}

          <Route component={NotFound} />
        </Switch>
      </App>
    </HashRouter>
  );
};
