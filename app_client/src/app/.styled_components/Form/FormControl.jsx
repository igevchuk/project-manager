import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import propTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";

const StyledFormControl = styled(FormControl)`
  && {
    margin: 4px 0 12px;
    font-family: ${props => props.theme.fontSans};
    label {
      color: rgba(0, 0, 0, 0.54);
    }

    &.error {
      label {
        color: ${props => props.theme.error};
      }
      .form-control_input {
        margin-top: 12px;
        &:after {
          border-bottom: 2px solid ${props => props.theme.error};
        }
      }
    }
  }
`;

const InputComponent = styled(Input)`
  && {
    &:before, &:after {
      border-bottom-color: rgba(0, 0, 0, 0.42);
    }
    &[class^="-focused-"], &[class*="-focused-"] {
      &:after {
        border-bottom: ${props => `2px solid ${props.theme.default}`};
      }
      &:before {
        border-bottom: ${props => `2px solid ${props.theme.default}`};
      }
    }
  }
`;

const FormControlComponent = (props) => {
  return (
    <StyledFormControl
      className={classnames("form-control", props.className, {"error": props.error})}
      margin={props.margin || "normal"}
      error={props.error}
      fullWidth={props.fullWidth}
      required={props.required}
      disabled={props.disabled}
    >
      {!!props.label && (
        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      )}

      <InputComponent
        className="form-control_input"
        type={props.type || "text"}
        id={props.name}
        value={props.value}
        disabled={props.disabled}
        disableUnderline={props.disabled}
        autoFocus={props.autoFocus}
        onChange={e => props.onChange(props.name, e.target.value)}
      />

      {!!props.error &&
        !!props.helperText && (
          <FormHelperText>{props.helperText}</FormHelperText>
        )}
    </StyledFormControl>
  );
}

FormControlComponent.propTypes = {
  onChange: propTypes.func.isRequired,
  helperText: propTypes.string
};

export default FormControlComponent;
