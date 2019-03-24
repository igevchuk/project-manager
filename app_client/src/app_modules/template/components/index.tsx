import * as React from 'react';

import { Provider } from '../TemplateContext';
import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Outline from './outline/Outline';
import Search from './outline/Search';
import Searchbox from './outline/Searchbox';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';

import * as state from '../../../app/redux/state';
import * as actions from './../redux/actions';
import { StyledItem, StyledGrids, StyledOutline } from './index.style';
import appReducer, {
  initialState as appState
} from '../../../app/redux/reducer';
import templateReducer, {
  initialState as segmentState
} from '../redux/reducer';

interface IProps {
  template: state.template;
  blocks: state.renderBlock[];
}

const Entry: React.SFC<IProps> = props => {
  const [templateState, appDispatch] = React.useReducer(appReducer, {
    ...appState
  });

  const [subState, templateDispatch] = React.useReducer(templateReducer, {
    ...segmentState
  });

  const magicStyling = false;
  const zIndex = subState.showOutline ? 10 : 0;
  const showOutline = () => templateDispatch(actions.enableShowOutline());

  return (
    <div>
      <Header template={props.template} />
      <Provider value={{ appDispatch, templateDispatch }}>
        <Toolbar />
      </Provider>

      <StyledGrids>
        <StyledOutline
          className="outline"
          magicStyling={magicStyling}
          zIndex={zIndex}
        >
          <Provider
            value={{
              appDispatch,
              templateDispatch,
              template: props.template,
              blocks: props.blocks
            }}
          >
            <Outline template={props.template} />
            <Searchbox />
            <Document isOutline={true} activeSeg={appState.activeSegId} />
          </Provider>
        </StyledOutline>

        <StyledItem className="blocks" magicStyling={magicStyling}>
          <Provider
            value={{
              appDispatch,
              templateDispatch,
              template: props.template,
              blocks: props.blocks
            }}
          >
            <Document isOutline={false} />
          </Provider>
        </StyledItem>

        <StyledItem>
          <Provider value={{ appDispatch }}>
            <Sidebar template={props.template} />
          </Provider>
        </StyledItem>
      </StyledGrids>
    </div>
  );
};

export default Entry;
