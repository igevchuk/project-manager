import { combineReducers } from "redux";
import formbuilderReducer from "./../views/formeditor/redux/reducer";
//import toastReducer from "./reducers/toastReducer";
import uiReducer from "./reducers/uiReducer";

const rootReducer = combineReducers({
  formbuilderReducer: formbuilderReducer,
  //toast: toastReducer,
  ui: uiReducer
});

export default rootReducer;
