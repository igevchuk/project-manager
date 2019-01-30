import React from "react";
import styled from "styled-components";

const HeaderComponent = ({ children, className }) => (
  <div className={`table-header ${className}`}>{children}</div>
);

const Header = styled(HeaderComponent)`
  font-size: 20px;
  color: ${props => props.theme.default};
  text-align: left;
  line-height: 40px;
`;

export default Header;
