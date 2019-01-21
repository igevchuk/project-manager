import React from 'react';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Radio as MuiRadio, RadioGroup, FormLabel, FormControl, FormControlLabel } from '@material-ui/core';

const RadioComponent = styled(MuiRadio).attrs({
  primary: props => props.primary,
  secondary: props => props.secondary
})`
  &&&& {
    color: ${props => props.checked && props.primary ? props.theme.primary : 'inherit'};
    color: ${props => props.checked && props.secondary ? props.theme.secondary : 'inherit'};
  }
`;

RadioComponent.propTypes = {
  primary: propTypes.bool,
  secondary: propTypes.bool
};

export const Radio = ({ label, value, checked, disabled, ...props }) => (
  <FormControlLabel
    value={value}
    disabled={disabled}
    control={<RadioComponent data-smc="radio" checked={checked} {...props} />}
    label={label}
  />
);

export default ({ value, label, name, onChange, ...props }) => (
  <RadioGroup
    {...props}
    aria-label={label}
    name={name}
    value={value}
    onChange={onChange}
  >
    {props.children}
  </RadioGroup>
);
