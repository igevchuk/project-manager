import React from "react";
import styled from "styled-components";

const PaperComponent = ({ className, children }) => (
  <div className={`paper ${className}`}>{children}</div>
);

const Paper = styled(PaperComponent)`
  background: #ffffff;
  ${({ rounded }) =>
    !!rounded &&
    `
    border-radius: ${rounded}px
  `} 
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 
  0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
  0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

export default Paper;
