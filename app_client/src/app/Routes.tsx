import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProjectManager from './../app_modules/project-manager/ProjectManager';

// import TemplateLibrary from './../app_modules/template-library';
// import Template from '../app_modules/template/Template';

const Routes: React.SFC = () => {
  return (
    <Router>
      <div style={{ marginTop: '64px' }}>
        {/* <Route path="/templates" component={TemplateLibrary} />
        <Route exact={true} path="/" component={Template} /> */}
        <Route path='/' component={ProjectManager} />
      </div>
    </Router>
  );
};

export default Routes;

