import * as React from 'react';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Book from '@material-ui/icons/Book';
import Check from '@material-ui/icons/Check';
import ClauseLibraryModal from '../clause_library/Modal';
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignJustify from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatStrikethrough from '@material-ui/icons/FormatStrikethrough';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import FormatIndentDecrease from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncrease from '@material-ui/icons/FormatIndentIncrease';
import Toggle from './../../../../atomic/atoms/Toggle';
import VariableLibraryModal from '../variable_library/Modal';
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

const fakeOptionForHorizontalDots = [
  { key: 1, text: 'Option 1', value: 'Option 1' },
  { key: 2, text: 'Option 2', value: 'Option 2' },
  { key: 3, text: 'Option 3', value: 'Option 3' }
];
const fakeOptions = [
  {
    key: 1,
    text: 'Text Segment'
  },
  {
    key: 2,
    text: 'Content Block'
  },
  {
    key: 3,
    text: 'Signature Block'
  }
];

interface IToolbarState {
  showNumbering?: boolean;
  textLevel?: string;
}

const textLevelOptions = {
  textSegment: {
    html: 'No Indent Level',
    text: 'No Indent Level',
    value: 'textSegment'
  },
  article1: {
    html: 'ARTICLE 1',
    text: 'ARTICLE 1',
    value: 'article1'
  },
  section: {
    html: <span>&nbsp;1. Section</span>,
    text: 'Section',
    value: 'section'
  },
  subSection: {
    html: <span>&nbsp;&nbsp;1.1 Subsection</span>,
    text: 'Subsection',
    value: 'subSection'
  },
  clause: {
    html: <span>&nbsp;&nbsp;&nbsp;(a) Clause</span>,
    text: 'Clause',
    value: 'clause'
  },
  subClause: {
    html: <span>&nbsp;&nbsp;&nbsp;&nbsp;(i) Subclause</span>,
    text: 'Subclause',
    value: 'subClause'
  }
};

class Toolbar extends React.Component<{}, IToolbarState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  public handleChange = (name: string, value: string): void => {
    console.log(name, value);
  };

  public handleSelectTextLevel = name => {
    this.setState({ textLevel: name });
  };

  public toggleNumbering = e => {
    e.preventDefault();
    this.setState({ showNumbering: !this.state.showNumbering });
  };

  public renderTextLevelItem = key => {
    const { textLevel } = this.state;
    const item = textLevelOptions[key];
    const isActive = key === textLevel;

    return (
      <TextLevelDropdownItem
        key={key}
        onClick={() => this.handleSelectTextLevel(key)}
        active={isActive}
      >
        {item.html} {isActive ? <Check /> : null}
      </TextLevelDropdownItem>
    );
  };

  public getTextLevelLabel = () => {
    const { textLevel } = this.state;

    if (!textLevel) {
      return 'Text Level';
    }

    return textLevelOptions[textLevel].text;
  };

  public render() {
    const { showNumbering, textLevel } = this.state;

    return (
      <ToolbarWrap>
        <ToolbarGroup divided={true} horizontal={true} relaxed={true}>
          <ToolbarItem>
            <Link>
              <TextLevelDropdown
                fluid={true}
                text={this.getTextLevelLabel()}
                closeOnChange={false}
              >
                <TextLevelDropdownMenu>
                  {Object.keys(textLevelOptions).map(key =>
                    this.renderTextLevelItem(key)
                  )}
                  <TextLevelDropdownItem>
                    Link to Previous Segment <Check />
                  </TextLevelDropdownItem>
                  <TextLevelDropdownItem onClick={this.toggleNumbering}>
                    Show Numbering{' '}
                    <Toggle checked={showNumbering} size="small" />
                  </TextLevelDropdownItem>
                </TextLevelDropdownMenu>
              </TextLevelDropdown>
            </Link>
            <Link>
              <Icon link={true} name="setting" />
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            <IconGroup>
              <IconGroupIcon>
                <FormatIndentIncrease />
              </IconGroupIcon>

              <IconGroupIcon>
                <FormatIndentDecrease />
              </IconGroupIcon>
            </IconGroup>
          </ToolbarItem>

          <ToolbarItem>
            <IconGroup>
              <IconGroupIcon>
                <FormatBold />
              </IconGroupIcon>

              <IconGroupIcon>
                <FormatItalic />
              </IconGroupIcon>

              <IconGroupIcon>
                <FormatUnderlined />
              </IconGroupIcon>

              <IconGroupIcon>
                <FormatStrikethrough />
              </IconGroupIcon>
            </IconGroup>
          </ToolbarItem>

          <ToolbarItem>
            <IconGroup>
              <IconGroupIcon>
                <FormatAlignLeft />
              </IconGroupIcon>

              <IconGroupIcon>
                <FormatAlignCenter />
              </IconGroupIcon>

              <IconGroupIcon>
                <FormatAlignJustify />
              </IconGroupIcon>

              <IconGroupIcon>
                <FormatAlignRight />
              </IconGroupIcon>
            </IconGroup>
          </ToolbarItem>

          <ToolbarItem>
            <Link>
              <Dropdown
                floating={true}
                options={fakeOptions}
                trigger={
                  <span className="trigger-btn">
                    <AddCircleOutline />
                    &nbsp;Add
                  </span>
                }
              />
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            <ClauseLibraryModal
              trigger={
                <Link>
                  <Book />
                  Clause Library
                </Link>
              }
            />
          </ToolbarItem>

          <ToolbarItem>
            <VariableLibraryModal
              trigger={
                <Link>
                  <Icon name="cube" />
                  Variables
                </Link>
              }
            />
          </ToolbarItem>

          <ToolbarItem>
            <Link>
              <Icon link={true} name="list" />
              Doc Outline
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            <Link>
              <Icon name="resize horizontal" />
              Resize Segments
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            {/* <Link>
              <Icon link={true} name="ellipsis horizontal" />
            </Link> */}
            <Dropdown
              direction="left"
              floating={true}
              icon="ellipsis horizontal"
              options={fakeOptionForHorizontalDots}
              pointing={false}
              selection={false}
            />
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarWrap>
    );
  }
}

export default Toolbar;
