import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import { SHOW_OUTLINE } from './actions';
import * as types from './actions';
import { IState } from './state';

const initialState: IState = {
  showOutline: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_OUTLINE: {
      const showOutline = !state.showOutline;

      const newState = {
        ...state,
        showOutline
      };

      return newState;
    }

    default:
      return state;
  }
}
