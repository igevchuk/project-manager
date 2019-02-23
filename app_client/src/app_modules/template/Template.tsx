import * as React from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import * as state from '../../app/redux/state';
import Entry from './components';

interface ITemplateProps {
  template: state.template;
}
class Template extends React.Component<ITemplateProps> {
  public render() {
    if (!this.props.template) {
      return 'loading ....';
    }

    return <Entry template={this.props.template} />;
  }
}

const mapStateToProps = templateState => {
  const templates = templateState.templateReducer.templates;
  return { template: templates[0] };
};
const TemplateContainer = connect(mapStateToProps)(Template);

export default DragDropContext(HTML5Backend)(TemplateContainer);
