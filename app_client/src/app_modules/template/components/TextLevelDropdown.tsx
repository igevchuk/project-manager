import * as React from 'react';
import { Dropdown as DropdownBase } from 'semantic-ui-react';
import styled, { css } from 'styled-components';
import { number } from 'prop-types';

interface IDropdownMenuProps {
  open?: boolean;
}

interface IDropdownItemProps {
  indent?: number;
  text: string | HTMLElement
}

class TextLevelDropdown extends DropdownBase {
  public render() {
    const { children, ...props } = this.props;
    return !!children ? <DropdownBase {...props}>{children}</DropdownBase> : <DropdownBase {...this.props} />
  }
}

export default styled(TextLevelDropdown)`
  && .menu {
    border-radius: 0;
    top: 16px;
  }
`;

export const TextLevelDropdownMenu = styled(TextLevelDropdown.Menu)`
    cursor: auto;
    position: absolute;
    display: none;
    outline: 0;
    min-width: -webkit-max-content;
    min-width: -moz-max-content;
    min-width: max-content;
    margin: 0;
    padding: 0 0;
    background: #fff;
    font-size: 1em;
    text-shadow: none;
    text-align: left;
    border: 1px solid rgba(34,36,38,.15);
    -webkit-transition: opacity .1s ease;
    transition: opacity .1s ease;
    z-index: 11;
    will-change: transform,opacity;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16), 0 3px 4px 0 rgba(0,0,0,0.16), 0 1px 5px 0 rgba(0,0,0,0.16);
    display: ${(props: IDropdownMenuProps) => props.open ? 'block' : 'none'};
    visibility: ${(props: IDropdownMenuProps) => props.open ? 'visible' : 'hidden'};
    &&.menu > .item {
      border-top: 1px solid #E0E0E0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 11px 40px 11px 16px;
      min-width: 240px;
    }
`;

export const TextLevelDropdownItem = styled(TextLevelDropdown.Item)`
  &&& {
    color: #010101;
    &:hover {
      background: #F5F5F5;
    }
    & svg, & > .toggle {
      position: absolute;
      right: 16px;
    }
  }
`;


