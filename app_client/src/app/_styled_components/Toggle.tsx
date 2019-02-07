import * as React from 'react';

import styled from "styled-components";
import { Checkbox } from 'semantic-ui-react';

const StyledToggle = styled(Checkbox)`
  &&&& {
    white-space: nowrap;
    width: 2.8rem;
    label {
      background-color: transparent;
      color: #757575;
      font-size: 12px;
      font-weight: normal;
      line-height: 14px;
    }
    input + label, input:focus + label, label:hover {
      &:before {
        background: #757575;
        width: 2.8rem;
      }
    }
    input:checked + label {
      &:before {
        background-color: ${props => props.theme.colorRoles.secondary} !important;
      }
      &:after {
        background-color: rgb(232,245,232);
        left: 1.33rem;
      }
    }
  }
`;

const FormToggle = ({ ...props }) => <StyledToggle {...props} toggle={true} />;

export default FormToggle;