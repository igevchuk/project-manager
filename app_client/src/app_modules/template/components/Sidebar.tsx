import * as React from 'react';
import { Grid, Tab } from 'semantic-ui-react';

// interface ISidebarProps {

// }

// interface ISidebarState {

// }

const panes = [
  { menuItem: 'PLAYBOOK', render: () => <Tab.Pane attached={false}>PLAYBOOK</Tab.Pane> },
  { menuItem: 'HISTORY', render: () => <Tab.Pane attached={false}>HISTORY</Tab.Pane> },
]

export default class Sidebar extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  
  public render() {
    return (
      <Grid.Column width={4}>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Grid.Column>
    );
  }
}