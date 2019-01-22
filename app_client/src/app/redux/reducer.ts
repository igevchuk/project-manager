// import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';

import { FETCH_FORM, FETCH_FORM_FULFILLED } from './actions';

import { IState } from './state';

export type RootState = {
  weather: {};
  map: {};
};

const initialState: IState = {
  activeForm: {},
  forms: [],
  templates: []
};

export default handleActions<IState>(
  {
    [FETCH_FORM]: (state: IState, action: Action<IState>): IState => {
      return state;
    },

    [FETCH_FORM_FULFILLED]: (state: IState, action: Action<IState>): IState => {
      console.log(action);
      return state;
    }
  },
  initialState
);
