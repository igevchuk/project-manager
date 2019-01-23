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
import { NavWrap, NavList, NavListItem, NavLink, NavDropdown, NavIcon, NavIcons, NavIconsIcon } from './Navbar.style';

const fakeOptions = [
  { key: 1, text: 'Option 1', value: 'Option 1' },
  { key: 2, text: 'Option 2', value: 'Option 2' },
  { key: 3, text: 'Option 3', value: 'Option 3' }
];

class Navbar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public handleChange = (name: string, value: string): void => {
    console.log(name, value)
  }

  public render() {
    return (
      <NavWrap>
        <NavList divided={true} horizontal={true} relaxed={true}>
          <NavListItem>
            <NavLink>
              <NavDropdown floating={true} options={fakeOptions} text='Text Level' />

              <NavIcon link={true} name='setting' />
            </NavLink>
          </NavListItem>

          <NavListItem>
            <NavIcons>
              <NavIconsIcon><FormatIndentIncrease /></NavIconsIcon>

              <NavIconsIcon><FormatIndentDecrease /></NavIconsIcon>
            </NavIcons>
          </NavListItem>

          <NavListItem>
            <NavIcons>
              <NavIconsIcon><FormatBold /></NavIconsIcon>

              <NavIconsIcon><FormatItalic /></NavIconsIcon>

              <NavIconsIcon><FormatUnderlined /></NavIconsIcon>

              <NavIconsIcon><FormatStrikethrough /></NavIconsIcon>
            </NavIcons>
          </NavListItem>

          <NavListItem>
            <NavIcons>
              <NavIconsIcon><FormatAlignLeft /></NavIconsIcon>

              <NavIconsIcon><FormatAlignCenter /></NavIconsIcon>

              <NavIconsIcon><FormatAlignJustify /></NavIconsIcon>

              <NavIconsIcon><FormatAlignRight /></NavIconsIcon>
            </NavIcons>
          </NavListItem>

          <NavListItem>
            <NavLink>
              <NavDropdown floating={true} options={fakeOptions} trigger={<a><AddCircleOutline />&nbsp;Add</a>}/>
            </NavLink>
          </NavListItem>

          <NavListItem>
            <NavLink>
              <Book />
              Clause Library
            </NavLink>
          </NavListItem>

          <NavListItem>
            <NavLink>
              <NavIcon name='cube' />
              Variables
            </NavLink>
          </NavListItem>

          <NavListItem>
            <NavLink>
              <NavIcon link={true} name='list' />
              Content Outline
            </NavLink>
          </NavListItem>

          <NavListItem>
            <NavLink>
              <NavIcon name='resize horizontal' />
              Resize Segments
            </NavLink>
          </NavListItem>

          <NavListItem>
            <NavLink><NavIcon link={true} name='ellipsis horizontal' /></NavLink>
          </NavListItem>
        </NavList>
      </NavWrap>
    )
  }
}

export default Navbar;