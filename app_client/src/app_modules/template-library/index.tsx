import * as React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import MainPanel from './components/mainpanel/MainPanel';

class TemplateLibrary extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Sidebar />
        <MainPanel />
      </React.Fragment>
    );
  }
}

export default TemplateLibrary;
