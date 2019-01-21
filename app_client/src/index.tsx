import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import { theme } from './app/styles/vars.style';
import ErrorBoundary from './app/ErrorBoundary';
import configureStore from './app/redux/store';

import App from './app/App';
// import Routes from './app/Routes';

const store = configureStore();

const AppComponet: React.SFC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

ReactDOM.render(<AppComponet />, document.getElementById(
  'root'
) as HTMLElement);
