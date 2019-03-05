import React from "react";
import styled from "styled-components";

const StyledListItem = styled.li``;

const MenuItemComponent = ({ className, children, onClick, onKeyDown }) => (
  <StyledListItem
    className={`${className} menu-list-item`}
    onClick={onClick}
    onKeyPress={onKeyDown}
    tabIndex="0"
  >
    {children}
  </StyledListItem>
);

const MenuItem = styled(MenuItemComponent)`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0px 16px;
  font-family: ${props => props.theme.fontSans};
  z-index: 15;
  transition-duration: 0.3s;
  &:hover {
    background-color: rgba(232, 232, 232, 1);
    cursor: pointer;
  }

  &:focus {
    background-color: rgba(232, 232, 232, 1);
    outline: none;
  }
`;

export default MenuItem;
