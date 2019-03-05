import React from 'react';
import { Input } from 'semantic-ui-react';
import styled from "styled-components";

const StyledInput = styled(Input)`
    &.input {
      && input {
        background: none;
        border-color: rgba(117, 117, 117, 0.5);
        border-width: 0 0 1px;
        border-radius: 0;
        color: rgba(117, 117, 117, 0.5);
        padding-left: 0;
        &:focus {
          border-color: #757575;
          color: #757575;
        }
        & ~ .icon {
          &.bordered {
            background-color: #757575;
            border-radius: 4px;
            color: #ffffff;
            height: 21px;
            top: 4px;
            width: 21px;
          }
        }
      }
      &.error {
        && input {
          border-color: ${props => props.theme.dangerRed};
        }
        & + .message {
          background: none;
          box-shadow: none;
          color: ${props => props.theme.dangerRed};
          padding: 0;
        }
      }
    }
`;

const FormInput = ({ ...props }) => <StyledInput {...props} />;

export default FormInput;