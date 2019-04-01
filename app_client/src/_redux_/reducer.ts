import { combineReducers } from 'redux';
import appReducer from './../app/redux/reducer';
import contractReducer from './../app_modules/project-manager/redux/reducer'
import templateReducer from './../app_modules/template/redux/reducer';

const rootReducer = combineReducers({
  appReducer,
  contractReducer,
  templateReducer
});

export default rootReducer;
