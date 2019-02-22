import * as React from 'react';

import { Grid } from 'semantic-ui-react';
import { contextWrapper } from '../../TemplateContext';
import PlaybookRule from './PlaybookRule';
import StyledSidebar, { Tab, TabPane } from './Sidebar.style';
import * as templateState from '../../../../app/redux/state';

interface ISidebarProps {
  template: {
    id: number;
    name: string;
    // contentOutline: templateState.contentOutline;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments?: templateState.textSegment[];
  };
}

const panes = [
  {
    menuItem: 'PLAYBOOK',
    render: () => (
      <TabPane attached={false}>
        <PlaybookRule />
      </TabPane>
    )
  },
  {
    menuItem: 'HISTORY',
    render: () => <TabPane attached={false}>HISTORY</TabPane>
  }
];

class Sidebar extends React.Component<ISidebarProps, any> {
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

export default contextWrapper(Sidebar);
