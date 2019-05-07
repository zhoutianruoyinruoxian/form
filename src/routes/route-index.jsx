import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import { NotFound, NoPermission } from 'src/containers';

import ResourceOverview from 'pages/ResourceOverview';
// import IDC from 'pages/IDC';
import RackManagement from 'pages/RackManagement';
import RackManagementDetail from 'pages/RackManagement/Detail';

// import DeviceManagement from 'pages/DeviceManagement';
// import NetworkTopology from 'pages/NetworkTopology';
// import IPManagement from 'pages/IPManagement';

export default (store) => {
  return (
    <HashRouter>
      <App>
        <Switch>
          <Redirect exact from="/" to="/RackManagement" />
          <Route exact path="/ResourceOverview" component={ResourceOverview} />
          {/* <Route exact path="/IDC" component={IDC} /> */}
          <Route exact path="/RackManagement" component={RackManagement} />
          <Route exact path="/RackManagement/:id" component={RackManagementDetail} />
          {/* <Route exact path="/DeviceManagement" component={DeviceManagement} /> */}
          {/* <Route exact path="/NetworkTopology" component={NetworkTopology} /> */}
          {/* <Route exact path="/IPManagement" component={IPManagement} /> */}
          <Route exact path="/NoPermission" component={NoPermission} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </HashRouter>
  );
};
