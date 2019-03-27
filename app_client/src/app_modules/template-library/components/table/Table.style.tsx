import styled from 'styled-components';

export default styled.div`
box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 
0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;
export const TableComponent = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
  border-color: grey;
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
    border-bottom: 1px solid rgb(225, 225, 225);
  }
  & th,
  & td {
    display: table-cell;
    text-align: left;
    padding: 15px 24px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    &:first-child {
      padding-left: 32px;
    }
  }
`;
