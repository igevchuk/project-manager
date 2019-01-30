// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardActionsComponent = ({ className, children }) => (
  <section className={`${className} card-actions`}>
    {children}
  </section>
);

const CardActions = styled(CardActionsComponent)`
  display: flex;
  box-sizing: border-box;
  padding: 8px;
  color: ${props => props.theme.default};
  border-top: 1px solid #E0E0E0;
`;

CardActions.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  className: PropTypes.string
};

export default CardActions;
