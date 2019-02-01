// https://codesandbox.io/embed/jn9657p4w9?fontsize=17&moduleview=1&previewwindow=tests

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import { theme } from './app/styles/vars.style';
import ErrorBoundary from './app/ErrorBoundary';
import configureStore from './_redux_/store';

import App from './app/App';

// import repo from './_service_/repository';
// repo.getLocalForm().subscribe(res => {
//   console.log(JSON.stringify(res, null, 2));
//   repo.postCreateForm();
// });

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

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.render(<AppComponet />, rootElement);
