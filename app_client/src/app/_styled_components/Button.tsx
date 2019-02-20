import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link as RouteLink } from 'react-router-dom';

interface IButtonComponentProps {
  primary?: boolean;
  secondary?: boolean;
  raised?: boolean;
  disabled?: boolean;
  compact?: boolean;
  dense?: boolean;
  icon?: string;
  style?: {};
  onClick?(): void;
}

const ButtonComponent: React.SFC<IButtonComponentProps> = ({
  children,
  ...props
}) => <button {...props}>{children}</button>;

const Button = styled(ButtonComponent)`
  background: ${props => props.primary && props.theme.colorRoles.primary};
  background: ${props => props.secondary && props.theme.colorRoles.secondary};
  color: ${props =>
    props.primary || props.secondary
      ? '#ffffff'
      : props.theme.colorRoles.default};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 88px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 3px;
  outline: none;
  font-family: ${props => props.theme.typography.fontSans};
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  vertical-align: middle;
  user-select: none;
  box-sizing: border-box;
  box-shadow: ${props => props.raised && props.theme.Shadows.buttonBoxShadow};
  -webkit-appearance: none;

  &:active {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  /* icon selector */
  & [data-smc='icon'] {
    margin-right: 5px;
    height: 21px;
    display: inline-block;
    vertical-align: middle;
    fill: ${props => (props.primary || props.secondary) && '#FFFFFF'};
  }
  box-shadow: ${props => props.theme.Shadows.boxShadow && '0 2px 5px #FFFFFF'};
`;

const LinkComponent = props => <RouteLink {...props} />;
export default Button;
