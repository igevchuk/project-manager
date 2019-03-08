import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TemplateLibrary from './../app_modules/template-library';
import Template from '../app_modules/template/Template';

const Routes: React.SFC = () => {
  return (
    <Router basename='/template'>
      <div style={{ marginTop: '64px' }}>
        <Route exact path="/templates" component={TemplateLibrary} />
        <Route exact path="/template" component={Template} />
      </div>
    </Router>
  );
};

export default Routes;
