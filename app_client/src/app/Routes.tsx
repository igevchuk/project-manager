import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from '@atomic/pages/HomePage/HomePage';

// import TemplateLibrary from './../app_modules/template-library';
// import Template from '../app_modules/template/Template';

const Routes: React.SFC = () => {
  return (
    <Router>
      <div style={{ marginTop: '64px' }}>
        {/* <Route path="/templates" component={TemplateLibrary} />
        <Route exact={true} path="/" component={Template} /> */}
        <Route path='/' component={HomePage} />
      </div>
    </Router>
  );
};

export default Routes;

