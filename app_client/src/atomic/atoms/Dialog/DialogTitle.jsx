// @flow
import React from "react";
import styled from "styled-components";

const DialogTitleComponent = ({
  className,
  children
}) => (
  <h2 className={`dialog-dialog-title ${className}`}>{children}</h2>
);

const DialogTitle = styled(DialogTitleComponent)`
  text-align: left;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 0.4px;
  line-height: 32px;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  padding: 24px 24px 0;
  margin: 0px;
`;

export default DialogTitle;
