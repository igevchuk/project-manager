import styled, { css } from 'styled-components';
import chroma from 'chroma-js';

type IItemProps = {
  zIndex?: number;
  magicStyling?: boolean;
  showBorder?: boolean;
};

const magicStyling = ({ color = chroma.random() }) => css`
  font-size: 18px;
  font-weight: bold;
  background-color: ${color};
  color: ${chroma.contrast(color, 'black') >= 4 ? 'black' : 'white'};
`;

export const StyledItem = styled.div<IItemProps>`
  // display: flex;
  // justify-content: center;
  // padding: .5rem;

  background-color: white;
  opacity: 1;

  &.blocks {
    grid-column: 1 / 3;
    grid-row: 1;
    z-index: 0;
  }

  &.outline {
    grid-column: 1 / 2;
    grid-row: 1;
    z-index: ${props => props.zIndex};
  }

  ${props => (props.magicStyling ? magicStyling : '')}
`;

export const StyledGrids = styled.article`
  display: grid;
  grid-template-columns: 300px auto 400px;
  grid-gap: 4px;
`;
