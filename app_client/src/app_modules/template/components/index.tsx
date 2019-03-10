import * as React from 'react';

import { Provider } from '../TemplateContext';

import * as state from '../../../app/redux/state';
import * as actions from './../redux/actions';

import { StyledItem, StyledGrids } from './index.style';
import appReducer from '../../../app/redux/reducer';
import templateReducer from '../redux/reducer';
import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Outline from './outline/Outline';
import Search from './outline/Search';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';

interface IProps {
  template: state.template;
}

const Entry: React.SFC<IProps> = props => {
  const [templateState, appDispatch] = React.useReducer(appReducer, {
    activeId: '',
    templates: [props.template]
  });

  const [subState, templateDispatch] = React.useReducer(templateReducer, {
    showOutline: false
  });

  const template = templateState.templates[0];
  const magicStyling = true;
  const zIndex = subState.showOutline ? 10 : 0; // zIndex: 0 | 10
  const showOutline = () => templateDispatch(actions.enableShowOutline());

  return (
    <div>
      {/* <Header template={template} />*/}
      <Provider value={{ templateDispatch }}>
        <Toolbar />
      </Provider>

      <StyledGrids>
        <StyledItem
          className="outline"
          magicStyling={magicStyling}
          zIndex={zIndex}
        >
          <Provider value={{ appDispatch, templateDispatch }}>
            <Outline template={template} />
            <Search />
            <Document template={template} isOutline={true} />
          </Provider>
        </StyledItem>
        <StyledItem className="blocks" magicStyling={magicStyling}>
          <Provider value={{ appDispatch }}>
            <Document template={template} isOutline={false} />
          </Provider>
        </StyledItem>
        <StyledItem>
          <Provider value={{ appDispatch }}>
            <Sidebar template={template} />
          </Provider>
        </StyledItem>
      </StyledGrids>
    </div>
  );
};

export default Entry;
