import { createAction as createReduxAction } from 'redux-actions';
// import { createAction } from 'typesafe-actions';
// import { Form } from "./model";

// Action defination
export const FETCH_FORM = 'formbuilder/FETCH_FORM';
export const PUBLISH_FORM = 'formbuilder/PUBLISH_FORM';
export const FETCH_FORM_FULFILLED = 'formbuilder/FETCH_FORM_FULFILLED';
export const FORM_ERROR_ACTION = 'formbuilder/FORM_ERROR_ACTION';

// formErrorAction
const fetchForm = createReduxAction<void>(FETCH_FORM, () => '');
const fetchFormFulfilled = createReduxAction<{}, {}>(
  FETCH_FORM_FULFILLED,
  (Response: {}) => Response
);
const formErrorAction = createReduxAction<{}, {}>(
  FORM_ERROR_ACTION,
  (Error: {}) => Error
);

const publishForm = createReduxAction<number, number>(
  PUBLISH_FORM,
  (id: number) => id
);

export { fetchForm, fetchFormFulfilled, formErrorAction, publishForm };
