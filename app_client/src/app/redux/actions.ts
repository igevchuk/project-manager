// import { createAction as createReduxAction } from 'redux-actions';
import { createAction } from 'redux-actions';

// import { createAction } from 'typesafe-actions';
// import { Form } from "./model";
import { IState } from './state';
import { article } from './state';

// Action defination
export const FETCH_FORM = 'formbuilder/FETCH_FORM';
export const PUBLISH_FORM = 'formbuilder/PUBLISH_FORM';
export const FETCH_FORM_FULFILLED = 'formbuilder/FETCH_FORM_FULFILLED';
export const FORM_ERROR_ACTION = 'formbuilder/FORM_ERROR_ACTION';

const fetchFormFulfilled = templates => ({
  type: FETCH_FORM_FULFILLED,
  payload: templates
});

// formErrorAction
const fetchForm = createAction<void>(FETCH_FORM, () => '');
// const fetchFormFulfilled_ = createAction<article, article>(
//   FETCH_FORM_FULFILLED,
//   (article: article) => article
// );
const formErrorAction = createAction<{}, {}>(
  FORM_ERROR_ACTION,
  (Error: {}) => Error
);

const publishForm = createAction<number, number>(
  PUBLISH_FORM,
  (id: number) => id
);

export { fetchForm, fetchFormFulfilled, formErrorAction, publishForm };
