import * as React from 'react';

import styled from "styled-components";
import { Checkbox } from 'semantic-ui-react';

interface IToggleProps {
  size?: string;
}

const StyledToggle = styled(Checkbox)`
  &&&& {
    white-space: nowrap;
    width: ${(props: IToggleProps) => props.size === 'small' ? '2rem' : '2.8rem'};
    min-height: ${(props: IToggleProps) => props.size === 'small' && '1rem'};
    label {
      background-color: transparent;
      color: #757575;
      font-size: 12px;
      font-weight: normal;
      line-height: 14px;
      min-height: ${(props: IToggleProps) => props.size === 'small' && '1rem'};
      &:before {
        width: ${(props: IToggleProps) => props.size === 'small' && '2rem'};
        height: ${(props: IToggleProps) => props.size === 'small' && '0.8rem'};
      }
      &:after {
        width: ${(props: IToggleProps) => props.size === 'small' && '1.2rem'};
        height: ${(props: IToggleProps) => props.size === 'small' && '1.2rem'};
        margin-top: ${(props: IToggleProps) => props.size === 'small' && '-0.2rem'};
      }
    }
    input + label, input:focus + label, label:hover {
      &:before {
        background: #757575;
        width: ${(props: IToggleProps) => props.size === 'small' ? '2rem' : '2.8rem'};
      }
    }
    input:checked + label {
      &:before {
        background-color: ${props => props.theme.colorRoles.secondary} !important;
      }
      &:after {
        background-color: rgb(232,245,232);
        left: ${(props: IToggleProps) => props.size === 'small' ? '1.6em' : '1.33em'};
      }
    }
  }
`;

const FormToggle = ({ ...props }) => <StyledToggle {...props} toggle={true} />;

export default FormToggle;