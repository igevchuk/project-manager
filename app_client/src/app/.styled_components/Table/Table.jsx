import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  display: table;
  font-family: ${props => props.theme.baseFontFamily};
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
  & thead {
    display: table-header-group;
    & th {
      font-size: 12px;
      color: rgb(117, 117, 117);
    }
  }
  tbody {
    display: table-row-group;
  }
  & tr {
    display: table-row;
    vertical-align: middle;
  }
  & th,
  & td {
    display: table-cell;
    text-align: left;
    font-weight: ${props => props.theme.fontLight};
    padding: 15px 24px;
    border-bottom: ${props => props.theme.tableBorder};
    overflow-x: hidden;
    text-overflow: ellipsis;
    &:first-child {
      padding-left: 32px;
    }
  }
  & td {
    font-size: ${props => props.theme.baseFontSize};
    color: ${props => props.theme.brandGray};
  }
`;

export default ({ ...props }) => {
  return <Table {...props}>{props.children}</Table>;
};
