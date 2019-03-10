import { combineReducers } from 'redux';
import appReducer from './../app/redux/reducer';
import templateReducer from './../app_modules/template/redux/reducer';

const rootReducer = combineReducers({
  appReducer,
  templateReducer
});

export default rootReducer;
