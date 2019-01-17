import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from "react-redux";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { ThemeProvider } from "styled-components";
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

import registerServiceWorker from './registerServiceWorker';
import App from './app/App';
import ErrorBoundary from './app/ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

// It seems like the complete solution is:
// git clean -df
// git checkout -- .
