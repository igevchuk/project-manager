import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import { theme } from './app/styles/vars.style';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import App from './app/App';
import ErrorBoundary from './app/ErrorBoundary';

import repo from './service/repository';

repo.getLocalForm().subscribe(res => {
  // console.log(JSON.stringify(res, null, 2));
});

import configureStore from './app/redux/store';

const store = configureStore();

class AppComponent extends React.Component {
  public render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
