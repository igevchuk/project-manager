import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionType } from 'typesafe-actions';

import { HeaderComponent } from './App.style';
import logo from './logo.svg';

// import repo from './../_service_/repository';
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
    // repo.getLocalForm().subscribe(res => {
    //   console.log(JSON.stringify(res, null, 2));
    // });

    this.props.onFetchForm();
  };

  public render() {
    return (
      <HeaderComponent>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="asd">{'this is testing'}</div>
          <div className="aaaa">{'this is testing'}</div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
      </HeaderComponent>
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
