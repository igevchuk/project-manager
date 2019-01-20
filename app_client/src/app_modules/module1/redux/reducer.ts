// import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';

import * as vm from './index';

import { FETCH_FORMS, DELETE_TODO, CLEAR_COMPLETED } from './actions';

export type RootState = {
  weather: {};
  map: {};
};

type IState = vm.IState_;

const initialState: IState = {
  activeForm: {},
  forms: [],
  templates: []
};

export default handleActions<IState>(
  {
    [FETCH_FORMS]: (state: IState, action: Action<IState>): IState => {
      return state;
    },

    [DELETE_TODO]: (state: IState, action: Action<IState>): IState => {
      return state;
    },

    [CLEAR_COMPLETED]: (state: IState, action: Action<IState>): IState => {
      return state;
    }
  },
  initialState
);
