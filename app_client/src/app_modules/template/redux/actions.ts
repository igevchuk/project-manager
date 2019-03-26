// import { createAction as createReduxAction } from 'redux-actions';
import { createAction } from 'redux-actions';

// Action defination
export const SHOW_OUTLINE = 'template/SHOW_OUTLINE';
export const ADD_ANNOTATION_PENDING = 'template/ADD_ANNOTATION_PENDING';
export const ADD_ANNOTATION_SUCCESS = 'template/ADD_ANNOTATION_SUCCESS';
export const ADD_ANNOTATION_ERROR = 'template/ADD_ANNOTATION_ERROR';
export const CREATE_ANNOTATION_PENDING = 'template/CREATE_ANNOTATION_PENDING';
export const CREATE_ANNOTATION_SUCCESS = 'template/CREATE_ANNOTATION_SUCCESS';
export const CREATE_ANNOTATION_ERROR = 'template/CREATE_ANNOTATION_ERROR';
export const UNDO_ANNOTATION = 'UNDO_ANNOTATION';
export const CLOSE_ANNOTATION_SNACKBAR = 'template/CLOSE_ANNOTATION_SNACKBAR';
export const DELETE_ANNOTATION = 'DELETE_ANNOTATION';

const enableShowOutline = () => ({
  type: SHOW_OUTLINE,
  payload: {}
});

const addAnnotation = (data) => (
  {
    type: ADD_ANNOTATION_SUCCESS, // PENDING
    payload: data
  }
);

const createAnnotation = (data) => (
  {
    type: CREATE_ANNOTATION_SUCCESS, // PENDING
    payload: data
  }
);

const deleteAnnotation = (id) => (
  {
    type: DELETE_ANNOTATION,
    payload: id
  }
);

const undoAnnotation = (annotationCount) => (
  {
    type: UNDO_ANNOTATION,
    payload: annotationCount
  }
)

const closeAnnotationSnackbar = () => ({
  type: CLOSE_ANNOTATION_SNACKBAR,
  payload: {}
});

export { 
  enableShowOutline, 
  addAnnotation, 
  createAnnotation, 
  closeAnnotationSnackbar, 
  deleteAnnotation,
  undoAnnotation
 };
