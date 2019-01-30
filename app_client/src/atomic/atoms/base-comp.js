import React from 'react';
import styled from 'styled-components';

const BaseComp = ({ className, children }) => (
  <div className={className}>{children}</div>
);

export default styled(BaseComp)``;
