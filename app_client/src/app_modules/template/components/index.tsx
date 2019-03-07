import * as React from 'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';

import * as state from '../../../app/redux/state';
import templateReducer from '../../../app/redux/reducer';

import { Grid } from 'semantic-ui-react';

import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';
import { Provider } from '../TemplateContext';

// import '../../../app/App.style';

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

export const Grids = styled.div`
  display: grid
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 50px
  grid-gap: 4px
`;

interface IProps {
  template: state.template;
}

const Entry: React.SFC<IProps> = props => {
  const [templateState, dispatch] = React.useReducer(templateReducer, {
    activeId: '',
    templates: [props.template]
  });

  const template = templateState.templates[0];

  return (
    <div>
      {/* <Header template={template} />*/}
      <Provider value={{ dispatch }}>
        <Toolbar />
      </Provider>

      <Grids>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item>5</Item>
        <Item>6</Item>
      </Grids>

      <Grid style={{ marginTop: 0 }}>
        <Provider value={{ dispatch }}>
          <Document template={template} />
        </Provider>

        <Provider value={{ dispatch }}>
          <Sidebar template={template} />
        </Provider>
      </Grid>
    </div>
  );
};

export default Entry;
