import React from "react";
import styled from "styled-components";

const RowComponent = props => (
  <tr className={`table-row ${props.className}`}>{props.children}</tr>
);

const Row = styled(RowComponent)`
  transition: 0.1s;
  ${({ header }) =>
    !header &&
    `
    &:hover {
      background-color: #eee;
    }
  `}
  height: ${({ header }) => (header ? 54 : 48)}px;
  ${props => props.rowStyle}
`;

export default Row;
