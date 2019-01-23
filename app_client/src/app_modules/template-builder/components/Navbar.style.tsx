
import styled, { css } from 'styled-components';
import { Dropdown, Icon, List } from 'semantic-ui-react';

const activeMixin = css`
  &:hover, &.active {
    background: rgba(20, 20, 20, 0.1);
    color: #000;
  }
`;

export const NavWrap = styled.div`
  background: #F5F5F5;
  border-bottom: 2px solid rgba(34, 36, 38, 0.15);
  border-top: 1px solid rgba(34, 36, 38, 0.15);
  padding: 0 32px;
`;

export const NavList = styled(List)`
  &.ui.list {
    align-items: center;
    color: #757575;
    display: inline-flex;
    padding: .5rem 0;
  }
`;

export const NavListItem = styled(List.Item)`
  &.item {
    align-items: center;
    display: flex;
    min-width: 4rem;
    padding: 0 .75em;
    transition: .1s;
  }
`;


export const NavLink = styled.a`
  align-items: center;
  border-radius: 3px;
  color: inherit;
  display: inline-flex;
  height: 34px;
  padding: 0 10px;
  transition: .1s;
  ${activeMixin}
  & > .icon.ellipsis {
    margin-right: 0;
  }
  & svg {
    font-size: 18px;
  }
  &:hover .ui.dropdown *, 
  &.active .ui.dropdown * {
    color: #000;
  }
`;

export const NavDropdown = styled(Dropdown)`
  &&.ui.dropdown {
    align-items: center;
    color: #757575;
    display: inline-flex;
    font-weight: 400;
    ${activeMixin}
    & > a {
      align-items: center;
      display: inline-flex;
      color: rgb(117, 117, 117);
    }
    & ~ i.icon {
      margin-left: .5rem;
      margin-right: 0;
    }
  }
`;

export const NavIcons = styled.div`
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.5rem 0;
`;

export const NavIcon = styled(Icon)`
  &, &.list.icon {
    display: inline-block;
    font-size: 1rem;
    height: auto;
    line-height: 1;
    margin-right: .25rem;
    padding: 0;
    width: auto;
    vertical-align: baseline;
  }
`;

export const NavIconsIcon = styled(NavIcon)`
  &&& {
    background: transparent;
    border-radius: 3px;
    height: auto;
    margin: 0;
    padding: 5px;
    transition: .1s;
    width: auto;
    ${activeMixin}
    & > svg {
      font-size: 20px;
    }
  }
`;