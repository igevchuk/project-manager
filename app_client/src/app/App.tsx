import * as React from 'react';
// import { connect } from 'react-redux';

import { HeaderComponent } from './App.style';
import logo from './logo.svg';

import repo from './../service/repository';

class App extends React.Component {
  public componentDidMount() {
    this.loadData();
  }

  public loadData = () => {
    repo.getLocalForm().subscribe(res => {
      console.log(JSON.stringify(res, null, 2));
    });

    // this.props.onFetchLocalForms();
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

export default App;

// const mapStateToProps = state => {
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onFetchForms: () => dispatch(actions.fetchForms())
//   };
// };

// const EnhancedToolbar = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

// export default EnhancedToolbar;
