import * as React from 'react';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Book from '@material-ui/icons/Book';
import Check from '@material-ui/icons/Check';
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
import { Dropdown } from 'semantic-ui-react';
import Toggle from './../../../app/_styled_components/Toggle';
import TextLevelDropdown, { TextLevelDropdownMenu, TextLevelDropdownItem } from './TextLevelDropdown';
import { ToolbarWrap, ToolbarGroup, ToolbarItem, Link, Icon, IconGroup, IconGroupIcon } from './Toolbar.style';

const fakeOptions = [
  {
    key: 1,
    text: <b>156168719</b>
  }
];

interface IToolbarState {
  showNumbering?: boolean;
  textLevel?: string;
}

const textLevelOptions = {
  "noLevel": {
    key: 0,
    text: 'No Indent Level',
    value: 'noLevel'
  },
  "article1": {
    key: 0,
    text: 'ARTICLE 1',
    value: 'article1',
    bold: true
  },
  "section": {
    key: 0,
    text: '1. Section',
    value: 'section',
    bold: true
  },
};

class Toolbar extends React.Component<{}, IToolbarState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  public handleChange = (name: string, value: string): void => {
    console.log(name, value)
  }

  public handleSelectTextLevel = (name) => {
    console.log(name)
    this.setState({ textLevel: name });
  }

  public toggleNumbering = (e) => {
    e.preventDefault();
    this.setState({ showNumbering: !this.state.showNumbering });
  }

  public renderTextLevelItem = (key) => {
    const item = textLevelOptions[key];
    console.log(item)
    return (
      <TextLevelDropdownItem onClick={this.handleSelectTextLevel(key)}>
        {item.text()}
      </TextLevelDropdownItem>
    );
  }

  public render() {
    const { showNumbering, textLevel } = this.state;
    return (
      <ToolbarWrap>
        <ToolbarGroup divided={true} horizontal={true} relaxed={true}>
          <ToolbarItem>
            <Link>
              {/* <TextLevelDropdown>
                <TextLevelDropdownMenu>
                  {
                    Object.keys(textLevelOptions).map(key => this.renderTextLevelItem(key))
                  }
                </TextLevelDropdownMenu>
              </TextLevelDropdown> */}
              <TextLevelDropdown floating={true} fluid={true} text={textLevel || 'Text Level'} closeOnChange={false}>
                <TextLevelDropdownMenu>
                  <TextLevelDropdownItem onClick={() => this.handleSelectTextLevel('noLevel')} active={textLevel === null}>
                    No Indent Ievel <Check />
                  </TextLevelDropdownItem>
                  <TextLevelDropdownItem onClick={() => this.handleSelectTextLevel('article1')} active={textLevel === 'article1'}>
                    <b>ARTICLE 1</b> <Check />
                  </TextLevelDropdownItem>
                  <TextLevelDropdownItem indent={1} onClick={() => this.handleSelectTextLevel('section')} active={textLevel === 'section'}>
                    &nbsp;<b>1. Section</b> <Check />
                  </TextLevelDropdownItem>
                  <TextLevelDropdownItem indent={2} onClick={() => this.handleSelectTextLevel('subSection')} active={textLevel === 'subSection'}>
                    &nbsp;&nbsp;1.1 Subsection <Check />
                  </TextLevelDropdownItem>
                  <TextLevelDropdownItem indent={3} onClick={() => this.handleSelectTextLevel('clause')} active={textLevel === 'clause'}>
                    &nbsp;&nbsp;&nbsp;(a) Clause <Check />
                  </TextLevelDropdownItem>
                  <TextLevelDropdownItem indent={4} onClick={() => this.handleSelectTextLevel('subClause')} active={textLevel === 'subClause'}>
                    &nbsp;&nbsp;&nbsp;&nbsp;(i) Subclause <Check />
                  </TextLevelDropdownItem>
                  <TextLevelDropdownItem>
                    Link to Previous Segment <Check />
                  </TextLevelDropdownItem>
                  <TextLevelDropdownItem onClick={this.toggleNumbering}>
                    Show Numbering <Toggle checked={showNumbering} />
                  </TextLevelDropdownItem>
                </TextLevelDropdownMenu>
              </TextLevelDropdown>
            </Link>
            <Link><Icon link={true} name='setting' /></Link>
          </ToolbarItem>

          <ToolbarItem>
            <IconGroup>
              <IconGroupIcon><FormatIndentIncrease /></IconGroupIcon>

              <IconGroupIcon><FormatIndentDecrease /></IconGroupIcon>
            </IconGroup>
          </ToolbarItem>

          <ToolbarItem>
            <IconGroup>
              <IconGroupIcon><FormatBold /></IconGroupIcon>

              <IconGroupIcon><FormatItalic /></IconGroupIcon>

              <IconGroupIcon><FormatUnderlined /></IconGroupIcon>

              <IconGroupIcon><FormatStrikethrough /></IconGroupIcon>
            </IconGroup>
          </ToolbarItem>

          <ToolbarItem>
            <IconGroup>
              <IconGroupIcon><FormatAlignLeft /></IconGroupIcon>

              <IconGroupIcon><FormatAlignCenter /></IconGroupIcon>

              <IconGroupIcon><FormatAlignJustify /></IconGroupIcon>

              <IconGroupIcon><FormatAlignRight /></IconGroupIcon>
            </IconGroup>
          </ToolbarItem>

          <ToolbarItem>
            <Link>
              <Dropdown 
                floating={true} 
                options={fakeOptions} 
                trigger={<span className='trigger-btn'><AddCircleOutline />&nbsp;Add</span>}
              />
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            <Link>
              <Book />
              Clause Library
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            <Link>
              <Icon name='cube' />
              Variables
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            <Link>
              <Icon link={true} name='list' />
              Content Outline
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            <Link>
              <Icon name='resize horizontal' />
              Resize Segments
            </Link>
          </ToolbarItem>

          <ToolbarItem>
            <Link><Icon link={true} name='ellipsis horizontal' /></Link>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarWrap>
    )
  }
}

export default Toolbar;