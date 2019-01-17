import React from "react";
import styled from "styled-components";

const TitleComponent = ({ children, className, column, width }) => (
  <th className={`table-title ${className} table-title-${column}`} width={width}>
    {children}
  </th>
);

const Title = styled(TitleComponent)`
  font-size: 12px;
  font-weight: 600;
  color: ${props =>
    props.sortedBy ? props.theme.default : props.theme.tableTitle};
  text-align: ${({ numerical }) => (numerical ? "right" : "left")};
  padding-left: ${({ first }) => (first ? 32 : 24)}px;
  padding-right: ${({ last }) => (last ? 32 : 24)}px;
`;

export default Title;
