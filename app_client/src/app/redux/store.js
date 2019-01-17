import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducer';
import {rootEpic} from './epics';

const epicMiddleware = createEpicMiddleware();
let middleware = [thunkMiddleware, epicMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    const store = createStore(
      rootReducer,
      composeEnhancer(applyMiddleware(...middleware))
    );

    epicMiddleware.run(rootEpic);

    return store;
}

// Fix for uncaught Error: It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function
//     at createStore:
// it happens when you pass 3 arguments to createStore() insead of 2;
// to fix that, use redux compose function to create composeEnhancer and pass it as second argument to createStore()
