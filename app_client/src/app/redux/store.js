import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunkMiddleware from 'redux-thunk';

import appReducer from './reducer';
import appEpic from './epics';

const epicMiddleware = createEpicMiddleware();
const middleware = [thunkMiddleware, epicMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (configureStore = () => {
  const store = createStore(
    appReducer,
    composeEnhancer(applyMiddleware(...middleware))
  );

  epicMiddleware.run(appEpic);
  return store;
});
