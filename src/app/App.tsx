import * as React from 'react';
import Header from './layouts/Header';
import Routes from './Routes';

class App extends React.Component<{}> {
  public render() {
    return (
      <div>
        <Header isAdmin={false} />
        <Routes />
      </div>
    );
  }
}

export default App;
