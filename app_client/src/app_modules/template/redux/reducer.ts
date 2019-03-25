import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import { SHOW_OUTLINE } from './actions';
import * as types from './actions';
import { IState } from './state';

export const initialState: IState = {
  showOutline: false,
  showVariant: false
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
    case types.SHOW_VARIANT: {
      const payload = action.payload as {
        showVariant: boolean;
      };

      const newState = {
        ...state,
        showVariant: payload.showVariant
      };

      return newState;
    }
    default:
      return state;
  }
}
