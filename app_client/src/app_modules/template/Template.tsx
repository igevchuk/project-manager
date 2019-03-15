import * as React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as _ from 'lodash';

import '@atlaskit/css-reset';

import * as state from '../../app/redux/state';
import Entry from './components/index';

interface ITemplateProps {
  template: state.template;
  blocks: state.renderBlock[];
}
class Template extends React.Component<ITemplateProps> {
  public render() {
    if (_.isEmpty(this.props.template)) {
      return 'loading ....';
    }

    return <Entry template={this.props.template} blocks={this.props.blocks} />;
  }
}

const mapStateToProps = appState => {
  // const templates = appState.appReducer.templates;
  const template = appState.appReducer.template;
  const blocks = appState.appReducer.renderBlocks;

  return { template, blocks };
};
const TemplateContainer = connect(mapStateToProps)(Template);

export default DragDropContext(HTML5Backend)(TemplateContainer);
