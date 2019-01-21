import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Page1 from './../app_modules/module1/Page1';
import Page2 from './../app_modules/module1/Page2';
import Header from './Header';

const Routes: React.SFC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
      </div>
    </Router>
  );
};

export default Routes;
