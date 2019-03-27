import * as React from 'react';

import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Outline from './outline/Outline';
import Search from './outline/Search';
import Searchbox from './outline/Searchbox';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';
import { Provider, contextWrapper } from './../TemplateContext';

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
  renderBlocks: state.renderBlock[];
  // variants: state.segmentSource[][];
}

const Entry: React.SFC<IProps> = props => {
  const [templateState, appDispatch] = React.useReducer(appReducer, {
    ...appState,
    template: props.template,
    renderBlocks: props.renderBlocks
    // variants: props.variants
  });

  const [subState, templateDispatch] = React.useReducer(templateReducer, {
    ...segmentState
  });

  const magicStyling = false;
  const zIndex = subState.showOutline ? 10 : 0;
  const showOutline = () => templateDispatch(actions.enableShowOutline());

  const entry = () => {
    const entryContent = (
      <Provider value={{ templateState, appDispatch }}>
        <Header template={templateState.template} />
        <Toolbar />

        <StyledGrids>
          <StyledOutline
            className="outline"
            magicStyling={magicStyling}
            zIndex={zIndex}
          >
            <Outline template={templateState.template} />
            <Searchbox />
            <Document isOutline={true} activeSeg={appState.activeSegId} />
          </StyledOutline>

          <StyledItem className="blocks" magicStyling={magicStyling}>
            <Document isOutline={false} />
          </StyledItem>

          <StyledItem>
            <Sidebar template={templateState.template} />
          </StyledItem>
        </StyledGrids>
      </Provider>
    );

    return entryContent;
  };
  return <div>{entry()}</div>;
};

export default contextWrapper(Entry);
