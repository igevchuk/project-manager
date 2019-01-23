// @flow
import * as React from "react";
import styled, { css } from "styled-components";
import { Link as RouteLink } from "react-router-dom";

const primary = css`
  color: ${props => props.theme.primary};
`;

const secondary = css`
  color: ${props => props.theme.secondary};
`;

const raised = css`
  ${props =>
    props.secondary &&
    `
    color: white;
    background-color: ${props.theme.secondary};
    &:before {
      color: black;
    }
  `}
  ${props =>
    props.primary &&
    `
    color: white;
    background-color: ${props.theme.primary};
    &:before {
      color: black;
    }
  `}
  ${props =>
    props.disabled &&
    `
    background-color: rgba(0, 0, 0, .12);
    pointer-events: none;
  `}
`;

const Button = styled.button`
  color: ${props => props.theme.default};
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
  background: transparent;
  font-family: ${props => props.theme.fontSans};
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

  ${props => props.secondary && secondary}
  ${props => props.primary && primary}
  ${props => props.raised && raised}
  ${props => props.compact && `padding: 0 8px;`}
  ${props =>
    props.disabled &&
    `
    color: rgba(0, 0, 0, .26);
    cursor: default;
    pointer-events: none;
  `}
  ${props =>
    props.dense &&
    `
    height: 32px;
    font-size: .8125rem;
    line-height: 32px;
  `}
  box-shadow: ${props => props.boxShadow && '0 2px 5px #FFFFFF'}
`;
const LinkComponent = props => <RouteLink {...props} />;
export default Button;
