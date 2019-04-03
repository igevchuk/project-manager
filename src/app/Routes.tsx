import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectManager from './../app_modules/project-manager/ProjectManager';

const Routes: React.SFC = () => {
  return (
    <Router>
      <div style={{ marginTop: '64px' }}>
        <Route path='/' component={ProjectManager} />
      </div>
    </Router>
  );
};

export default Routes;

