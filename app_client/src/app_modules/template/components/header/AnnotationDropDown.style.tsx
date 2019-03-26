import styled from 'styled-components';
import { Modal, Icon, Button, Form, Segment, Label, Dropdown } from 'semantic-ui-react';



export const StyledAnnotationLabel = styled(Label)`
  &.ui.label {

    display: flex;
    border-radius: 6px;
    background-color: #FFFFFF;
    border: 1px solid #9FA8DA;
    color: #1A237E;
    height: 22px;
    width: 48px;
    line-height: 10px;
    font-weight: 500;
    font-size: 12px;
    padding: 5px 8px;
    cursor: pointer;

    i {
      font-size: 14px;
      color: #172071;
      margin-right: 4px;
    }

    p {
      margin-top: -3px;
    }

    :hover {
      background-color: #E0E0E0;
    }
  }
`;

export const StyledDropdown = styled(Dropdown)`

  &.ui.top.left.pointing.dropdown>.menu {
    top: 33%;
  }
`;

export const StyledDropdownBody = styled(Dropdown.Menu)`
  border-radius: 0px;

  .main-body {
  display: block;
  width: 256px;
  font-size: 1em;
  line-height: 1.4;
  background: #fff;

    p {
      margin: 0;
    }

    .tag-header {
      padding: 1rem;
      display: block;
      font-size: 1em;
      line-height: 1.4;
      background: #fff;
    }

    .title {
      color: #010101;	
      font-size: 12px;	
      font-weight: 500;	
      line-height: 14px;
      margin-bottom: 4px;
    }

    .sub-title {
      color: #616161;	
      font-size: 12px;	
      line-height: 16px;
      white-space: normal;
    }

    .input-field {
      width: inherit;
      margin-bottom: 16px;
    }

    .tag-list {
      padding-bottom: 16px;
      max-height: 200px;
      overflow-y: auto;
    }

    .tag-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 14px;
      cursor: pointer;
      

      p {
        color: #616161;	
        font-size: 12px;
        margin-right: 10px;
      }

      :hover {
        background-color: #F5F5F5;
      }

      :active {
        background-color: #E8EAF6;
      }

    }
  }
`;