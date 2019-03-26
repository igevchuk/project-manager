import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import { SHOW_OUTLINE } from './actions';
import * as types from './actions';
import { IState } from './state';

export const initialState: IState = {
  showOutline: false,
  annotationStatus: 'idle',
  recentAnnotations: 0
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
    
    case types.CREATE_ANNOTATION_PENDING:
    case types.ADD_ANNOTATION_PENDING: 
      const newStatePending = {
        ...state,
        annotationStatus: 'pending'
      }
      return newStatePending;
    
    case types.CREATE_ANNOTATION_SUCCESS:{
      const newStateSuccess = {
        ...state,
        annotationStatus: 'success',
        recentAnnotations: action.payload.annotations.length
      }
      return newStateSuccess;
    }
    case types.ADD_ANNOTATION_SUCCESS: {
      const newStateSuccess = {
        ...state,
        annotationStatus: 'success',
        recentAnnotations: action.payload.length
      }
      return newStateSuccess;
    }

    case types.CREATE_ANNOTATION_ERROR:
    case types.ADD_ANNOTATION_ERROR:
      const newStateError = {
        ...state,
        annotationStatus: 'error'
      }
      return newStateError;

    case types.CLOSE_ANNOTATION_SNACKBAR: {
      const newState = {
        ...state,
        annotationStatus: 'idle',
        recentAnnotations: 0
      }
      return newState;
    }

    default:
      return state;
  }
}
