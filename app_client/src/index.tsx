import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from "react-redux";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import { theme } from './app/styles/vars.style';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import App from './app/App';
import ErrorBoundary from './app/ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
