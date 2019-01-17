import React from "react";
import styled from "styled-components";
import classnames from "classnames";

const CheckboxFormGroup = styled.div`
  margin-bottom: 15px;
  display: block;
  width: 100%;
  label {
    display: flex;
  }
  input {
    /* margin-right: 10px; */
  }
`;

export default props => {
  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };

  return (
    <CheckboxFormGroup className={classnames("checkboxes", props.className)}>
      <label>{props.label}</label>
      {props.children}
    </CheckboxFormGroup>
  );
};
