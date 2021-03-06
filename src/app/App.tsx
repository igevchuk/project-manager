import * as React from 'react';
import Header from './layouts/Header';
import Routes from './Routes';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
  }
  body, body > *,
  table, th, td, p, 
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', 'Helvetica', sans-serif;
  }
  body {
    background-color: #F5F5F5;
  }
`

class App extends React.Component<{}> {
  public render() {
    return (
      <div>
        <GlobalStyle />
        <Header isAdmin={false} />
        <Routes />
      </div>
    );
  }
}

export default App;
