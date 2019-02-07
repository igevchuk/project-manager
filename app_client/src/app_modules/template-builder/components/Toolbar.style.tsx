
import styled, { css } from 'styled-components';
import { Dropdown as DropdownBase, Icon as IconBase, List as ListBase } from 'semantic-ui-react';

const activeMixin = css`
  &:hover, &.active {
    background: rgba(20, 20, 20, 0.1);
    color: #000;
  }
`;

export const ToolbarWrap = styled.div`
  background: #F5F5F5;
  border-bottom: 2px solid rgba(34, 36, 38, 0.15);
  border-top: 1px solid rgba(34, 36, 38, 0.15);
  padding: 0 32px;
`;

export const ToolbarGroup = styled(ListBase)`
  &.ui.list {
    align-items: center;
    color: #757575;
    display: inline-flex;
    padding: .5rem 0;
  }
`;

export const ToolbarItem = styled(ListBase.Item)`
  &.item {
    align-items: center;
    display: flex;
    min-width: 4rem;
    padding: 0 .75em;
    transition: .1s;
  }
`;


export const Link = styled.a`
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
  &:hover .ui.dropdown .trigger-btn, 
  &.active .ui.dropdown .trigger-btn {
    color: #000;
  }
`;

export const Dropdown = styled(DropdownBase)`
  &&.ui.dropdown {
    align-items: center;
    color: #757575;
    display: inline-flex;
    font-weight: 400;
    & .trigger-btn {
      align-items: center;
      display: inline-flex;
    }
    & ~ i.icon {
      margin-left: .5rem;
      margin-right: 0;
    }
  }
`;

export const IconGroup = styled.div`
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.5rem 0;
`;

export const Icon = styled(IconBase)`
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

export const IconGroupIcon = styled(Icon)`
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