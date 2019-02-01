import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

export const StyledDocument = styled(Grid.Column)`
  margin: 50px 5vmax;
  padding: 1em;
`;

export const TextHover = styled.span`
  position: relative;
  &:hover {
    outline: 2px solid orange;
    background-color: rgb(255, 252, 220);
    cursor: pointer;
    .text-hover-feat {
      display: block;
    }
  }
  &:hover + .variant-count {
    display: inline-flex;
  }
`;

export const TextHoverFeature = styled.span`
  background-color: orange;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: none;
  left: -2px;
  line-height: 1.2em;
  padding: 0 10px;
  position: absolute;
  text-align: center;
  top: -16px;
  & .icon {
    color: #ffffff;
    height: auto;
    margin: 0;
    width: auto;
  }
`;

export const TextNode = styled.span``;

export const VariantCount = styled.span`
  align-items: center;
  background: rgb(255, 252, 220);
  border: 1px solid orange;
  border-radius: 3px;
  color: orange;
  display: none;
  font-weight: bold;
  padding: 0 0.5em;
  position: absolute;
  left: 1.5vmax;
  & svg {
    font-size: 20px;
  }
`;
