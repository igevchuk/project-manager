import * as React from 'react';

import { Grid } from 'semantic-ui-react';
import PlaybookRule from './PlaybookRule';
import StyledSidebar, { Tab, TabPane } from './Sidebar.style';

// interface ISidebarProps {

// }

// interface ISidebarState {

// }

const panes = [
  { menuItem: 'PLAYBOOK', render: () => <TabPane attached={false}><PlaybookRule /></TabPane> },
  { menuItem: 'HISTORY', render: () => <TabPane attached={false}>HISTORY</TabPane> },
]

export default class Sidebar extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  
  public render() {
    return (
      <StyledSidebar width={4}>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </StyledSidebar>
    );
  }
}