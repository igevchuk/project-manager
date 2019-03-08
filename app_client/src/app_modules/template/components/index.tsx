import * as React from 'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';

import * as state from '../../../app/redux/state';
import templateReducer from '../../../app/redux/reducer';

// import { Grid } from 'semantic-ui-react';

import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Outline from './outline/Outline';
import Search from './outline/Search';

import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';
import { Provider } from '../TemplateContext';

export const Item = styled.div`
  // display: flex
  // justify-content: center
  // padding: .5rem

  &.blocks {
    grid-column: 1 / 3;
    grid-row: 1;
    z-index: 1;
  }

  &.outline {
    grid-column: 1 / 2;
    grid-row: 1;
    z-index: 10;
  }

  ${({ color = chroma.random() }) =>
    css`
      background-color: ${color}
      color: ${chroma.contrast(color, 'black') >= 4 ? 'black' : 'white'}
      font-size: 18px
      font-weight: bold
    `}
`;

export const Grids = styled.article`
  display: grid
  grid-template-columns: 300px auto 400px;
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
        <Item className="outline">
          <Provider value={{ dispatch }}>
            <Outline template={template} />
            <Search />
            <Document template={template} isOutline={true} />
          </Provider>
        </Item>
        <Item className="blocks">
          <Provider value={{ dispatch }}>
            <Document template={template} isOutline={false} />
          </Provider>
        </Item>
        <Item>
          <Provider value={{ dispatch }}>
            <Sidebar template={template} />
          </Provider>
        </Item>
      </Grids>
    </div>
  );
};

export default Entry;
