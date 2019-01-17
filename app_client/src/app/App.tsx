import * as React from 'react';
import { HeaderComponent } from './App.style';
import logo from './logo.svg';

class App extends React.Component {
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
