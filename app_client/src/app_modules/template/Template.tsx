import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';
import * as actions from '../../app/redux/actions';
type Action = ActionType<typeof actions>;

import { Grid } from 'semantic-ui-react';
import Document from './components/Document';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import * as state from '../../app/redux/state';
import { Provider } from './TemplateContext';
import Content from './components/Content';

interface ITemplateProps {
  template: state.template;
}

interface ITemplateState {
  template: state.template;
}
class Template extends React.Component<ITemplateProps, ITemplateState> {
  constructor(props) {
    super(props);
    this.state = {
      template: {}
    };
  }

  public componentDidMount() {
    this.setState(
      (prevState, props) => ({ template: this.props.template }),
      () => {
        // console.log(this.state.template);
      }
    );
  }

  public render() {
    // console.log(this.props.template);

    return (
      <div>
        <Navbar />
        <Grid style={{ marginTop: 0 }}>
          {/* <Document />
          <Sidebar /> */}
          <Provider value={{ doc: this.props.template }}>
            <Content asd={'asdf'} />
          </Provider>
          <Sidebar />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const templates = state.templateReducer.templates;
  if (templates.length === 0) {
    return {};
  }

  // console.log(templates[0]);
  return { template: templates[0] };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    // onFetchForm: () => dispatch(actions.fetchForm())
  };
};

const TemplateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);

export default DragDropContext(HTML5Backend)(TemplateContainer);
