import * as React from 'react';

import { Provider } from '../TemplateContext';

import * as state from '../../../app/redux/state';
import * as actions from './../redux/actions';

import { StyledItem, StyledGrids } from './index.style';
import appReducer, {
  initialState as appState
} from '../../../app/redux/reducer';
import templateReducer, {
  initialState as segmentState
} from '../redux/reducer';
import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Outline from './outline/Outline';
import Search from './outline/Search';
import Searchbox from './outline/Searchbox';

import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';
import styled from 'styled-components';
// import DragDropByHandle from './../../__feature__/DragDropByHandle';
import AnnotationsSnackbar from "./sidebar/annotations/AnnotationsSnackbar";

export const StyledOutline = styled(StyledItem)<{ isHidden?: boolean }>`
  border: 2px solid rgba(34, 36, 38, 0.15);
`;

interface IProps {
  template: state.template;
  tagColors: state.tagColor[];
  blocks: state.renderBlock[];
}

const Entry: React.SFC<IProps> = props => {
  const [templateState, appDispatch] = React.useReducer(appReducer, {
    ...appState,
    template: props.template,
    renderBlocks: props.blocks,
    tagColors: props.tagColors
  });

  const [subState, templateDispatch] = React.useReducer(templateReducer, {
    ...segmentState
  });

  const template = templateState.template;
  const blocks = templateState.renderBlocks;
  const tagColors = templateState.tagColors;

  const magicStyling = false;
  const zIndex = subState.showOutline ? 10 : 0; // zIndex: 0 | 10
  const showOutline = () => templateDispatch(actions.enableShowOutline());

  return (
    <div>
      <Header template={template} />
      <Provider value={{ appDispatch, templateDispatch }}>
        <Toolbar />
      </Provider>

      <StyledGrids>
        <StyledOutline
          className="outline"
          magicStyling={magicStyling}
          zIndex={zIndex}
        >
          <Provider value={{ appDispatch, templateDispatch }}>
            <Outline template={template} />
            <Searchbox />
            <Document template={template} blocks={blocks} isOutline={true} />
          </Provider>
        </StyledOutline>

        <StyledItem className="blocks" magicStyling={magicStyling}>
          {/* <DragDropByHandle />; */}
          <Provider value={{ appDispatch }}>
            <Document template={template} blocks={blocks} isOutline={false} />
          </Provider>
        </StyledItem>

        <StyledItem>
          <Provider value={{ appDispatch, templateDispatch }}>
            <Sidebar template={template} tagColors={tagColors} activeSegId={templateState.activeSegId}/>
          </Provider>
        </StyledItem>
        <Provider value={{ appDispatch, templateDispatch }}>
          <AnnotationsSnackbar subState={subState}/>
        </Provider>
      </StyledGrids>
    </div>
  );
};

export default Entry;
