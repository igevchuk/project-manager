// import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';

import { vm } from './service';

import { FETCH_FORMS, DELETE_TODO, CLEAR_COMPLETED } from './actions';

export type RootState = {
  weather: {};
  map: {};
};

const initialState: vm.IState = {
  activeForm: {},
  forms: [],
  templates: []
};

export default handleActions<vm.IState>(
  {
    [FETCH_FORMS]: (state: vm.IState, action: Action<vm.IState>): vm.IState => {
      return state;
    },

    [DELETE_TODO]: (state: vm.IState, action: Action<vm.IState>): vm.IState => {
      return state;
    },

    [CLEAR_COMPLETED]: (
      state: vm.IState,
      action: Action<vm.IState>
    ): vm.IState => {
      return state;
    }
  },
  initialState
);
