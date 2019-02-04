// Refactoring: Moving API calls to a higher-order component
// https://medium.com/@guigonc/refactoring-moving-api-calls-to-a-higher-order-component-53062c086cb

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';
import Header from './layouts/Header';
import Routes from './Routes';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import * as actions from './redux/actions';
import { IState } from './redux/state';
import { textSegment } from './redux/state';

type Action = ActionType<typeof actions>;
interface IAppProps {
  segment: textSegment;
  onFetchForm: () => void;
}
class App extends React.Component<IAppProps, {}> {
  public componentDidMount() {
    this.loadData();
  }

  public loadData = () => {
    this.props.onFetchForm();
  };

  public render() {
    console.log(this.props.segment);
    const { id, sequence, segment, ref, decorator } = this.props.segment || 0;
    return (
      <div>
        <Header isAdmin={false} />
        <Routes />
        <div>{segment}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const template = state.templateReducer.templates[0];
  const segment = template && template.textSegment[0];
  // console.log(template && template.textSegment[0]);
  return { segment };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onFetchForm: () => dispatch(actions.fetchForm())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default DragDropContext(HTML5Backend)(FormContainer);
