import * as React from 'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';

import './../../../app/App.style';

export const Item = styled.div`
  display: flex
  justify-content: center
  padding: .5rem

  ${({ color = chroma.random() }) =>
    css`
      background-color: ${color}
      color: ${chroma.contrast(color, 'black') >= 4 ? 'black' : 'white'}
      font-size: 18px
      font-weight: bold
    `}
`;

export const Grid = styled.div`
  display: grid
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 50px
  grid-gap: 5px
`;

function Entry() {
  return (
    <div className="App">
      <Grid>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item>5</Item>
        <Item>6</Item>
      </Grid>
    </div>
  );
}

export default Entry;
