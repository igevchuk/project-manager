import * as React from 'react';

import { Grid } from 'semantic-ui-react';
import { contextWrapper } from '../../TemplateContext';
import * as templateState from '../../../../app/redux/state';
import PlaybookRule from '../playbook/PlaybookRule';
import StyledSidebar, { Tab, TabPane } from './Sidebar.style';
import Search from './Search';
import * as actions from './../../redux/actions';

import TextLevelDropdown, {
  TextLevelDropdownMenu,
  TextLevelDropdownItem
} from './../text/TextLevelDropdown';
import {
  Dropdown,
  ToolbarWrap,
  ToolbarGroup,
  ToolbarItem,
  Link,
  Icon,
  IconGroup,
  IconGroupIcon
} from './Toolbar.style';

interface ISidebarProps {
  template: {
    id: number;
    name: string;
    // contentOutline: templateState.contentOutline;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments?: templateState.textSegment[];
  };
  templateDispatch: React.Dispatch<any>;
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

class Sidebar extends React.Component<ISidebarProps> {
  constructor(props) {
    super(props);
  }

  public toggleOutline = e => {
    console.log('name');
    this.props.templateDispatch(actions.enableShowOutline());
  };

  public render() {
    return (
      <StyledSidebar width={4}>
        <ToolbarItem>
          <Link>
            <TextLevelDropdown
              fluid={true}
              text={'Content Outline'}
              closeOnChange={false}
            >
              {/* <TextLevelDropdownMenu>
                {Object.keys(textLevelOptions).map(key =>
                  this.renderTextLevelItem(key)
                )}
                <TextLevelDropdownItem>
                  Link to Previous Segment <Check />
                </TextLevelDropdownItem>
                <TextLevelDropdownItem onClick={this.toggleNumbering}>
                  Show Numbering <Toggle checked={showNumbering} size="small" />
                </TextLevelDropdownItem>
              </TextLevelDropdownMenu> */}
            </TextLevelDropdown>
          </Link>
          <Link>
            <Icon link={true} name="setting" />
          </Link>

          <ToolbarItem onClick={this.toggleOutline}>
            <Link>
              <Icon link={true} name="close" />
            </Link>
          </ToolbarItem>
        </ToolbarItem>
      </StyledSidebar>
    );
  }
}

export default contextWrapper(Sidebar);
