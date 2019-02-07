import * as React from 'react';
import { Grid, Tab } from 'semantic-ui-react';

import SidebarContent from './SidebarContent';
import SidebarPlaybook from './SidebarPlaybook';
import SidebarHistory from './SidebarHistory';

const panes = [
  {
    menuItem: 'PLAYBOOK',
    render: () => <SidebarContent render={<SidebarPlaybook />} />
  },
  {
    menuItem: 'HISTORY',
    render: () => <SidebarContent render={<SidebarHistory />} />
  }
];

const Sidebar: React.SFC = () => {
  return (
    <Grid.Column width={4}>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </Grid.Column>
  );
};

export default Sidebar;
