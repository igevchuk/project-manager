import * as React from 'react';

import { Grid } from 'semantic-ui-react';
import { contextWrapper } from './../Context';
import PlaybookRule from './PlaybookRule';
import StyledSidebar, { Tab, TabPane } from './Sidebar.style';
import * as templateState from '../../../app/redux/state';

interface ISidebarProps {
  template: {
    id: number;
    name: string;
    selectedType: number;
    articles: templateState.article[];
    sections: templateState.section[];
    subSections: templateState.subSection[];
    clauses: templateState.clause[];
    subClauses: templateState.subClause[];
    textSegments: templateState.textSegment[];
    textVariants: templateState.textVariant[];
  };
};

const panes = [
  { menuItem: 'PLAYBOOK', render: () => <TabPane attached={false}><PlaybookRule /></TabPane> },
  { menuItem: 'HISTORY', render: () => <TabPane attached={false}>HISTORY</TabPane> },
]

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