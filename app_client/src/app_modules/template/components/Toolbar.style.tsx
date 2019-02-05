import * as React from 'react';
import styled from 'styled-components';

const ToolbarComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #E8EAF5;
  min-height: 64px;
  padding: 5px 24px;
  font-size: 14px;
  border-bottom: 1px solid rgb(225, 225, 225);
  h2, h2 > a {
    margin: 0;
    font-weight: normal;
    color: #052B83;
  }
  small {
    font-size: 92%;
    font-weight: normal;
    display: block;
    opacity: 0.5;
  }
  .toolbar_left {
    &_info {
      padding: 0 10px 0 10px;
      display: inline-block;
      vertical-align: middle;
      font-size: 92%;
      font-weight: bolder;
      line-height: 15px;
    }
  }
  button:not(:last-child) {
    margin: 0 10px;
  }
  &&&& .ui.floating.dropdown > .menu {
    .item {
      line-height: 20px;
    }
    a, a:hover {
      color: #757575;
      font-size: 12px;
      font-weight: bold;
    }
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    line-height: 30px;
  }
`;

export default ToolbarComponent;
