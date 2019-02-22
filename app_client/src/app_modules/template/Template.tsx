import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';
import * as actions from '../../app/redux/actions';
type Action = ActionType<typeof actions>;

import { Grid } from 'semantic-ui-react';
import Document from './components/document/Document';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Toolbar from './components/toolbar/Toolbar';

import { Editor, EditorState } from 'draft-js';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import * as state from '../../app/redux/state';
import { Provider } from './TemplateContext';
// import Content from './components/Contentasd';

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
    this.state = {
      template: this.props.template,
      editorState: EditorState.createEmpty()
    };
    // this.onChange = editorState => this.setState({ editorState });
  }

  public componentDidMount() {
    // this.timer = window.setInterval(() => console.log('testing'), 1000);

    this.setState(
      (prevState, props) => ({ template: this.props.template } as any),
      () => {
        // console.log(this.state.template);
      }
    );
  }

  public addTextVariant = variant => {
    const { template } = this.props;

    console.log(variant);

    // this.setState({
    //   template: {
    //     ...template, textVariants: [...template.textVariants, variant]
    //   }
    // });
  };

  public onChange() {
    return;
  }

  public render() {
    const { template } = this.props;

    if (!template) {
      return null;
    }

    return (
      <div>
        {/* <Header template={template} /> */}
        <Provider value={{ template }}>
          <Toolbar />
        </Provider>

        <Grid style={{ marginTop: 0 }}>
          <Provider
            value={{ template, handleAddTextVariant: this.addTextVariant }}
          >
            <Document />
          </Provider>

          <Provider value={{ template }}>
            <Sidebar />
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
