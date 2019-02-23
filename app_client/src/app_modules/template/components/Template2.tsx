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
import * as actions from '../../../app/redux/actions';

import { Grid } from 'semantic-ui-react';
import Document from './document/Document';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Toolbar from './toolbar/Toolbar';
import * as state from '../../../app/redux/state';
import templateReducer from '../../../app/redux/reducer';
import { ActionType } from 'typesafe-actions';
// import * as actions from '../../app/redux/actions';

import { Provider } from '../TemplateContext';

type Action = ActionType<typeof actions>;

export function Templateaa(props) {
  const aaaa = props.template;

  const [templateState, dispatch] = React.useReducer(templateReducer, {
    activeId: 1,
    templates: [aaaa]
  });

  const template = templateState.templates[0];
  // console.log(template);

  // return { template: templates[0] };

  // if (!template) {
  //   return 'loading ....';
  // }

  // const addTextVariant = variant => {
  //   // const { template } = this.props;
  //   // this.setState({
  //   //   template: {
  //   //     ...template, textVariants: [...template.textVariants, variant]
  //   //   }
  //   // });
  // };

  // const docValue = { template, handleAddTextVariant: addTextVariant };

  return (
    // <Provider value={dispatch}>
    //   <Document template={templateState.templates[0]} />
    // </Provider>
    <Provider value={{ dispatch }}>
      <Document template={template} />
    </Provider>
  );

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
      {'sdfsdf'}
    </div>
  );
}

export default Templateaa;
