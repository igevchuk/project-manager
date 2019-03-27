import * as React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as _ from 'lodash';

import '@atlaskit/css-reset';

import * as state from '../../app/redux/state';
import Entry from './components/index';
import { Provider } from './TemplateContext';

const TemplateContext = React.createContext({});
interface ITemplateProps {
  template: state.template;
  tagColors: state.tagColor[];
  renderBlocks: state.renderBlock[];
  // variants: state.segmentSource[][];
}
class Template extends React.Component<ITemplateProps> {
  public render() {
    if (_.isEmpty(this.props.template)) {
      return 'loading ....';
    }

    return (
      <Provider
        value={{
          template: this.props.template,
          renderBlocks: this.props.renderBlocks,
          tagColors: this.props.tagColors
        }}
      >
        <Entry />
      </Provider>
    );
  }
}

const mapStateToProps = appState => {
  const template = appState.appReducer.template;
  const tagColors = appState.appReducer.tagColors;
  const renderBlocks = appState.appReducer.renderBlocks;

  return { template, renderBlocks, tagColors };
};
const TemplateContainer = connect(mapStateToProps)(Template);

export default DragDropContext(HTML5Backend)(TemplateContainer);
