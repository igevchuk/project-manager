// @flow
import React from "react";
import styled from "styled-components";

const DialogFooterComponent = ({
  className,
  children
}) => (
  <div className={`dialog-dialog-footer ${className}`}>{children}</div>
);

const DialogFooter = styled(DialogFooterComponent)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  border-top: 1px solid rgb(225, 225, 225);
`;

export default DialogFooter;
