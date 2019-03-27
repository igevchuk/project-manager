import styled from 'styled-components';
import { Icon, Modal, Dropdown, Radio as SRadio } from 'semantic-ui-react';
import Radio from '@material-ui/core/Radio';
import { SemanticButton as SButton } from '../sidebar/annotations/SidebarAnnotations.style';

export const ModalBody = styled(Modal.Content)`
  .left-col {
    width: 70%;

    h3 {
      font-size: 24px;	
      letter-spacing: -0.05px;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .text-field {
      width: 100%;
      margin-bottom: 23px;

      label {
        font-size: 15px;
        font-weight: 500;
        color: #757575;
      }
    }
    
    .ui.selection.dropdown {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid lightgray;
      padding: 1rem 0;
      border-color: none;
    }

    .ui.selection.active.dropdown .menu {
      border-color: transparent;
    }

    .format-div {
      margin-bottom: 10px;

      .format-title {
        font-size: 12px;
        color: #757575;
        margin: 0;
        margin-bottom: -4px;
      }
    }
    
    .radio-option {
      color: #4caf50;
    }
    
  }
`;

export const RadioButtons = styled.div`
  display: flex;
  justify-content: space-between;

  .radio-option {
    color: #4caf50;
  }

  .radio-label {
    font-size: 14px;
    margin-left: -6px;
    margin-top: 2px;
  }
`;

export const ActionButtons = styled(Modal.Actions)`
  // height: 65px;
  padding: 2rem 3rem;
  background: #FFF;

  &&& {
    padding: 2rem 3rem;
    background: #FFF;
  }
  
  .ui.button {
    font-size: 14px;
    font-weight: 500;
    color: #9E9E9E;
  }

  .cancel-button {
    margin-right: 48px;
  }
  &.ui.button.cancel-button {
    :hover {
      color: #9E9E9E;
    }
  }

  .ui.button.export-button {
    color: #43A047;
  }
`;

export const InformationLabel = styled.div`
  display: flex;
  height: 24px;	
  width: 552px;	
  border-radius: 4px;	
  background-color: #F5F5F5;
  color: #424242;
  font-weight: 300;
  padding: 0.25rem;
  margin: 20px 0 14px 0;

  i.icon {
    margin: 0 8px 0 5px;
  }

  p {
    margin: 0;
    margin-top: -1px;
  }
`;