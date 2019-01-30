import React from "react";
import styled from "styled-components";
import classnames from "classnames";

const DatumComponent = ({ children, className, column, onClick, ...props }) =>
  children ? (
    <td
      className={classnames([
        "table-datum",
        `table-datum-${column}`,
        className
      ])}
      onClick={e => onClick ? onClick(e, props) : null}
    >
      {children}
    </td>
  ) : null;

const Datum = styled(DatumComponent)`
  padding: 15px;
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.default};
  text-align: ${({ numerical }) => (numerical ? "right" : "left")};
  padding-left: ${({ first }) => (first ? 32 : 24)}px;
  padding-right: ${({ last }) => (last ? 32 : 24)}px;
  ${props => props.datumStyle};
  > a {
    color: inherit;
    text-decoration: none;
  }
`;

export default Datum;
