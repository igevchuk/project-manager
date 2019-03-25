import * as React from 'react';

import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Outline from './outline/Outline';
import Search from './outline/Search';
import Searchbox from './outline/Searchbox';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';
import { contextWrapper } from './../TemplateContext';

import * as state from '../../../app/redux/state';
import * as actions from './../redux/actions';
import { StyledItem, StyledGrids, StyledOutline } from './index.style';
import appReducer, {
  initialState as appState
} from '../../../app/redux/reducer';
import templateReducer, {
  initialState as segmentState
} from '../redux/reducer';
import * as templateState from '../../../app/redux/state';

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

interface IProps {
  template?: state.template;
  blocks?: state.renderBlock[];
  variants?: segmentSource[][];
}

const Entry: React.SFC<IProps> = props => {
  const [subState, templateDispatch] = React.useReducer(templateReducer, {
    ...segmentState
  });

  const magicStyling = false;
  const zIndex = subState.showOutline ? 10 : 0;
  const showOutline = () => templateDispatch(actions.enableShowOutline());

  const entry = () => {
    const entryContent = () => (
      <div>
        <Header template={props.template} />
        <Toolbar />

        <StyledGrids>
          <StyledOutline
            className="outline"
            magicStyling={magicStyling}
            zIndex={zIndex}
          >
            <Outline template={props.template} />
            <Searchbox />
            <Document isOutline={true} activeSeg={appState.activeSegId} />
          </StyledOutline>

          <StyledItem className="blocks" magicStyling={magicStyling}>
            <Document isOutline={false} />
          </StyledItem>

          <StyledItem>
            <Sidebar template={props.template} />
          </StyledItem>
        </StyledGrids>
      </div>
    );

    return entryContent();
  };

  return entry();
};

export default contextWrapper(Entry);
