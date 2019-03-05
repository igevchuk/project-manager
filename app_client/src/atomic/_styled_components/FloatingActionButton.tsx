import * as React from 'react';
import styled, { css } from 'styled-components';

interface IFloatingActionButtonProps {
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  mini?: boolean;
}

class ButtonComponent extends React.Component<IFloatingActionButtonProps, {}> {
  public render() {
    return  <button {...this.props}>{this.props.children}</button>
  }
}

const primaryCss = css`
  color: #fff;
  background-color: ${props => props.theme.primary};
`;

const secondaryCss = css`
  color: #fff;
  background-color: ${props => props.theme.secondary};
`;

const disabledCss = css`
  background-color: rgba(0, 0, 0, 0.12);
  pointer-events: none;
`;

const miniCss = css`
  height: 40px;
  width: 40px;
`;

const FloatingActionButton = styled(ButtonComponent)`
  color: #fff;
  width: 56px;
  height: 56px;
  margin: 0 0 0 10px;
  padding: 0;
  border: none;
  border-radius: 50%;
  outline: none;
  background: transparent;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  vertical-align: middle;
  &:active {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    overflow: hidden;
  }
  &::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  ${props => props.secondary && secondaryCss}
  ${props => props.primary && primaryCss}
  ${props => props.disabled && disabledCss}
  ${props => props.mini && miniCss}
`;

export default FloatingActionButton;
