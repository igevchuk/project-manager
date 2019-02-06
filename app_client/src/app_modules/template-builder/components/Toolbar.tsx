import * as React from 'react';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Book from '@material-ui/icons/Book';
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
import { ToolbarWrap, ToolbarGroup, ToolbarItem, Link, Dropdown, Icon, IconGroup, IconGroupIcon } from './Toolbar.style';

const fakeOptions = [
  { key: 1, text: 'Option 1', value: 'Option 1' },
  { key: 2, text: 'Option 2', value: 'Option 2' },
  { key: 3, text: 'Option 3', value: 'Option 3' }
];

class Toolbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  public handleChange = (name: string, value: string): void => {
    console.log(name, value)
  }

  public render() {
    return (
      <ToolbarWrap>
        <ToolbarGroup divided={true} horizontal={true} relaxed={true}>
          <ToolbarItem>
            <Link>
              <Dropdown floating={true} options={fakeOptions} text='Text Level' />

              <Icon link={true} name='setting' />
            </Link>
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