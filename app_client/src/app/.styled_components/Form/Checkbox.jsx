import React from "react";
import styled, { css } from "styled-components";
import classnames from "classnames";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const FormControlLabelComponent = styled(FormControlLabel)`
  &&& {
    margin-right: 0;
    margin-left: 0;
    display: ${props => (props.inline ? "inline-flex" : "flex")};
    ${props => props.style};
  }
`;

const CheckboxComponent = styled(Checkbox)`
  &&& {
    width: ${props => (props.mini ? "32px" : "48px")};
    height: ${props => (props.mini ? "32px" : "48px")};
    svg {
      /* font-size: ${props => (props.mini ? "18px" : "24px")}; */
    }
    &.checked {
      color: ${props => props.theme.secondary};
      svg {
        fill: ${props => props.theme.secondary};
        color: ${props => props.theme.secondary};
      }
    }
  }
`;

export default ({ className, checked, disabled, onChange, ...props }) => {
  const label = <label className="inline_label">{props.label}</label>;
  return (
    <FormControlLabelComponent
      {...props}
      className={classnames(["checkbox", className, { checked }])}
      checked={checked}
      disabled={disabled}
      control={
        <CheckboxComponent
          {...props}
          className={classnames(["checkbox-input", className, { checked }])}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
};
