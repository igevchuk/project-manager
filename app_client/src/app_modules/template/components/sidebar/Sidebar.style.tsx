import styled, { css } from 'styled-components';
import { Grid, Tab as TabBase } from 'semantic-ui-react';

export default styled(Grid.Column)`
  &&&.column {
    box-shadow: 0 1px 2px 1px rgba(34, 36, 38, 0.1);
    padding-left: 0;
  }
`;

export const Tab = styled(TabBase)`
  border: none;
  box-shadow: none;
  & .ui.secondary.pointing.menu .item {
    justify-content: center;
    text-align: center;
    // width: 32%;
    &.active {
      border-color: rgb(0, 40, 136);
    }
    padding-right: 6%;
    padding-left: 7%;
  }
`;

export const TabPane = styled(TabBase.Pane)`
  &.ui.segment.tab {
    border: none;
    box-shadow: none;
    width: ${props => props.tabWidth};
  }
`;

