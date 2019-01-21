import React from "react";
import styled from "styled-components";
import classnames from "classnames";

const HeadingComponent = ({ className, children, ...rest }) => {
  return (
    <h1 className={classnames(["heading", className])} {...rest}>
      {children}
    </h1>
  );
};

const Heading = styled(HeadingComponent)`
  color: ${props => props.theme.default};
  font-family: ${props => props.theme.fontSans};
  font-weight: 300;
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 32px;
  min-height: 32px;
  ${props => props.headingStyle};
`;
export default Heading;
