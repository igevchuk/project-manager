import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TemplateLibrary from './../app_modules/template-library';
import Template from '../app_modules/template/TemplateProvider';

const Routes: React.SFC = () => {
  return (
    <Router basename="/template">
      <div style={{ paddingTop: '64px' }}>
          <Route path="/templates" component={TemplateLibrary} />   
          <Route exact={true}  path="/" component={Template} /> 
        {/* <Route path="/" redirectTo={Template} component={Template} />
        <Route path="/templates" component={TemplateLibrary} />
        <Route exact={true} path="/template" component={Template} /> */}
      </div>
    </Router>
  );
};

export default Routes;

// https://reacttraining.com/react-router/web/api/BrowserRouter/basename-string
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/BrowserRouter.md#basename-string
// basename: string
// The base URL for all locations. If your app is served from a sub-directory on your server, you'll want to set this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash.

// <BrowserRouter basename="/calendar" />
// <Link to="/today"/> // renders <a href="/calendar/today">
