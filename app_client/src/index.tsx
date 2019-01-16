import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from "react-redux";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import { ThemeProvider } from "styled-components";
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
