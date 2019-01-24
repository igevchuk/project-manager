import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import Document from './components/Document';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
// import Toolbar from './components/Toolbar';

class TemplateBuilder extends React.Component {
  public render() {
    return <div>
      {/* <Toolbar /> */}
      
      <Navbar />

      <Grid style={{ marginTop: 0 }}>
          <Document />

          <Sidebar />
      </Grid>
    </div>;
  }
};

export default TemplateBuilder;
