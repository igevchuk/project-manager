import React from "react";
import styled from "styled-components";

import withRipple from "@containers/withRipple";


const TabButton = styled.button`
  align-items: center;
  color: rgba(0, 0, 0, 0.87);
  background: transparent;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 264px;
  min-height: 45px;
  min-width: 72px;
  overflow: hidden;
  outline: none;
  padding-left: 12px;
  padding-right: 12px;
  text-transform: uppercase;
  user-select: none;
  -webkit-appearance: none;
`;

const RippleTab = withRipple(TabButton);

const TabLabel = styled.span`
  padding: 4px 12px;
  /* font-size: 14px; */
  line-height: 16px;
  font-family: ${props => props.theme.roboto};
`;

const TabComponent = ({ children, className, index, onClick }) => (
  <RippleTab
    className={`tab ${className}`}
    onClick={event => onClick(event, index)}
  >
    <TabLabel>{children}</TabLabel>
  </RippleTab>
);

export const Tab = styled(TabComponent)`
  opacity: ${props => (props.selected ? 1 : 0.5)};
  height: 45px;
`;

export const TabContent = styled.div`
  padding: 24px;
`;
