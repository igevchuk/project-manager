import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import { FETCH_FORM, FETCH_FORM_FULFILLED } from './actions';
import * as types from './actions';
import { IState } from './state';

const initialState: IState = {
  isLocal: true,
  activeId: '',
  templates: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FORM_FULFILLED: {
      if (state.isLocal) {
        const templates = action.payload;
        const newState = {
          ...state,
          templates: Array(templates)[0]
        };

        return newState;
      }

      // console.log(action.payload);
      // const templates = action.payload;
      // const newState = {
      //   ...state,
      //   templates: Array(templates)[0]
      // };
    }
    case 'FETCH_FORM_FULFILLED': {
      console.log(action.payload);
      return state;
    }
    default:
      return state;
  }
}
