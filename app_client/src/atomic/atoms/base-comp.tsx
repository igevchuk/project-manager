import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: '';
  children: React.ReactNode;
}

const BaseComp = ({ className = '', children }) => (
  <div className={className}>{children}</div>
);

export default styled(BaseComp)``;