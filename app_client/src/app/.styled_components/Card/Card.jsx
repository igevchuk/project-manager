// @flow
import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const CardComponent = ({ className, children }) => (
  <div className={`${className} card`}>{children}</div>
);

const hoverStyles = css`
  &:hover {
    transform: translateY(-7px);
  }
`;

const Card = styled(CardComponent)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.13);
  transition-duration: 0.3s;
  ${props => props.hover && hoverStyles};
`;

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  className: PropTypes.string,
  hover: PropTypes.bool
};

Card.defaultProps = {
  hover: false
};

export default Card;
