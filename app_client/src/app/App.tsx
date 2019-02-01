// Refactoring: Moving API calls to a higher-order component
// https://medium.com/@guigonc/refactoring-moving-api-calls-to-a-higher-order-component-53062c086cb

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';
import Header from './layouts/Header';
import Routes from './Routes';

import * as actions from './redux/actions';
import { IState } from './redux/state';

type Action = ActionType<typeof actions>;
interface IAppProps {
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
    return (
      <div>
        <Header isAdmin={false} />
        <Routes />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {};
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
