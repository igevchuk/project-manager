// @flow
import styled, { css } from "styled-components";

import ripple from "@mixins/ripple";

const primary = css`
  color: #fff;
  background-color: ${props => props.theme.primary};
`;

const secondary = css`
  color: #fff;
  background-color: ${props => props.theme.secondary};
`;

const disabled = css`
  background-color: rgba(0, 0, 0, 0.12);
  pointer-events: none;
`;

const mini = css`
  height: 40px;
  width: 40px;
`;

const FloatingActionButton = styled.button.attrs({
  "data-smc": "FloatingActionButton"
})`
  color: #fff;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  border-radius: 50%;
  outline: none;
  background: transparent;
  overflow: hidden;
  user-select: none;
  box-sizing: border-box;
  -webkit-appearance: none;

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

  ${ripple()}
  ${props => props.secondary && secondary}
  ${props => props.primary && primary}
  ${props => props.disabled && disabled}
  ${props => props.mini && mini}
`;

export default FloatingActionButton;
