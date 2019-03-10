// Refactoring: Moving API calls to a higher-order component
// https://medium.com/@guigonc/refactoring-moving-api-calls-to-a-higher-order-component-53062c086cb

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';
import Header from './layouts/Header';
import Routes from './Routes';

import * as actions from './redux/actions';

type Action = ActionType<typeof actions>;
interface IAppProps {
  onFetchTemplate: () => void;
}

class App extends React.Component<IAppProps> {
  public componentDidMount() {
    this.props.onFetchTemplate();
  }

  public render() {
    return (
      <div>
        <Header isAdmin={false} />
        <Routes {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    onFetchTemplate: () => dispatch(actions.fetchTemplate())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
