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
import { Editor, EditorState } from 'draft-js';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import * as state from '../../app/redux/state';
import { Provider } from './TemplateContext';
// import Content from './components/Content';

interface ITemplateProps {
  template: state.template;
  onChange: () => void;
}

interface ITemplateState {
  template: state.template;
  editorState: EditorState;
}
class Template extends React.Component<ITemplateProps, ITemplateState> {
  private timer: number = 0;
  constructor(props) {
    super(props);
    // this.state = {
    //   template: {}
    // };
    this.state = { template: {}, editorState: EditorState.createEmpty() };
    // this.onChange = editorState => this.setState({ editorState });
  }

  public componentDidMount() {
    // this.timer = window.setInterval(() => console.log('testing'), 1000);

    this.setState(
      (prevState, props) => ({ template: this.props.template }),
      () => {
        // console.log(this.state.template);
      }
    );
  }

  public onChange() {
    return;
  }

  public render() {
    if (!this.props.template) {
      return null;
    }

    return (
      <div>
        <Navbar />
        <Grid style={{ marginTop: 0 }}>
          {/* <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          /> */}

          <Provider value={{ template: this.props.template }}>
            <Document />
          </Provider>

          <Provider value={{ template: this.props.template }}>
            <Sidebar />
          </Provider>

          <Provider value={{ template: this.props.template }}>
            {/* <Content asd={'asdf'} /> */}
          </Provider>
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
