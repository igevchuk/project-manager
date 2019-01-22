import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardContentComponent = ({ className, children }) => (
  <section className={`${className} card-content`}>
    {children}
  </section>
);

const CardContent = styled(CardContentComponent)`
  padding: 8px 16px;
  box-sizing: border-box;
  font-family: ${props => props.theme.roboto};
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.default};

  &:last-child {
    padding-bottom: 24px;
  }

  .primary + & {
    margin-top: -8px;
    padding-top: 0;

    &:last-child {
      padding-bottom: 24px;
    }
  }
`;

CardContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  className: PropTypes.string
};

export default CardContent;
