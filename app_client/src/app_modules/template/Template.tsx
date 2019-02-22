// const TodosDispatch = React.createContext(null);

// function TodosApp() {
//   // Note: `dispatch` won't change between re-renders
//   const [todos, dispatch] = useReducer(todosReducer);

//   return (
//     <TodosDispatch.Provider value={dispatch}>
//       <DeepTree todos={todos} />
//     </TodosDispatch.Provider>
//   );
// }

// function DeepChild(props) {
//   // If we want to perform an action, we can get dispatch from context.
//   const dispatch = useContext(TodosDispatch);

//   function handleClick() {
//     dispatch({ type: 'add', text: 'hello' });
//   }

//   return (
//     <button onClick={handleClick}>Add todo</button>
//   );
// }

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';
import * as actions from '../../app/redux/actions';
import { Editor, EditorState } from 'draft-js';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { Grid } from 'semantic-ui-react';
import Document from './components/document/Document';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Toolbar from './components/toolbar/Toolbar';
import * as state from '../../app/redux/state';
import templateReducer from '../../app/redux/reducer';

import { Provider } from './TemplateContext';
import Template2 from './Template2';

type Action = ActionType<typeof actions>;

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
    this.setState(
      (prevState, props) => ({ template: this.props.template } as any),
      () => {
        // console.log(this.state.template);
      }
    );
  }

  public addTextVariant = variant => {
    const { template } = this.props;

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
      return 'loading ....';
    }

    // console.log(template);
    const docValue = { template, handleAddTextVariant: this.addTextVariant };

    return (
      <div>
        {/* <Header template={template} />
        <Provider value={{ template }}>
          <Toolbar />
        </Provider>

        <Grid style={{ marginTop: 0 }}>
          <Provider value={docValue}>
            <Document />
          </Provider>

          <Provider value={{ template }}>
            <Sidebar />
          </Provider>
        </Grid> */}
        <Template2 template={template} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const templates = state.templateReducer.templates;
  return { template: templates[0] };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {};
};

const TemplateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);

export default DragDropContext(HTML5Backend)(TemplateContainer);
