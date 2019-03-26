import * as React from 'react';

import { Grid } from 'semantic-ui-react';
import { contextWrapper } from '../../TemplateContext';
import * as templateState from '../../../../app/redux/state';
import PlaybookRule from '../playbook/PlaybookRule';
import StyledSidebar, { Tab, TabPane } from './Sidebar.style';
import SidebarAnnotations from "./annotations/SidebarAnnotations";

interface ISidebarProps {
  template: {
    id: number;
    name: string;
    // contentOutline: templateState.contentOutline;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments?: templateState.textSegment[];
    annotations: templateState.annotation[];
    tags: templateState.tag[];
  };
  tagColors: templateState.tagColor[];
  activeSegId: string;
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
    const { template: { annotations, tags }, tagColors, activeSegId } = this.props;
    const annotationCount = annotations.length
    const annotationsTab = {
      menuItem: "ANNOTATIONS (" + annotationCount + ")",
      render: () => (
        <TabPane attached={false}>
          <SidebarAnnotations
            activeSegId={activeSegId}
            annotationCount={annotationCount}
            annotations={annotations}
            tags={tags}
            tagColors={tagColors}
          />
        </TabPane>
      )
    }

    const allPanes = [...panes, annotationsTab];


    return (
      <StyledSidebar width={4}>
        <Tab menu={{ secondary: true, pointing: true }} panes={allPanes} />
      </StyledSidebar>
    );
  }
}

export default contextWrapper(Sidebar);
