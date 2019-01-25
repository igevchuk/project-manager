import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Page1 from './../app_modules/module1/Page1';
import Page2 from './../app_modules/module1/Page2';
import TemplateLibrary from './../app_modules/template-library';
import TemplateBuilder from './../app_modules/template-builder';

const Routes: React.SFC = () => {
  return (
    <Router>
      <div style={{ marginTop: '64px' }}>
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/templates" component={TemplateLibrary} />
        <Route path="/template-builder" component={TemplateBuilder} />
      </div>
    </Router>
  );
};

export default Routes;
