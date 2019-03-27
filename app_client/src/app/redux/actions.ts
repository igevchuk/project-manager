// import { createAction as createReduxAction } from 'redux-actions';
import { createAction } from 'redux-actions';

// import { createAction } from 'typesafe-actions';
// import { Form } from "./model";

// const prefix = 'useApiRequest/';

// export const FETCHING = `${prefix}FETCHING`;
// export const SUCCESS = `${prefix}SUCCESS`;
// export const ERROR = `${prefix}ERROR`;

// Action defination
export const FETCH_TEMPLATE = 'template/FETCH_FORM';
export const PUBLISH_TEMPLATE = 'template/PUBLISH_FORM';
export const FETCH_TEMPLATE_FULFILLED = 'template/FETCH_TEMPLATE_FULFILLED';
export const TEMPLATE_ERROR_ACTION = 'template/FORM_ERROR_ACTION';

export const CHANGE_INDENT = 'template/INCREASE_INDENT';

const changeIndent = adjustIndent => ({
  type: CHANGE_INDENT,
  payload: adjustIndent
});

// const decreaseIndent = () => ({
//   type: CHANGE_INDENT,
//   payload: 'decreaseIndent'
// });

const fetchTemplateFulfilled = templates => ({
  type: FETCH_TEMPLATE_FULFILLED,
  payload: templates
});

const fetchTemplate = createAction<void>(FETCH_TEMPLATE, () => '');
const templateErrorAction = createAction<{}, {}>(
  TEMPLATE_ERROR_ACTION,
  (Error: {}) => Error
);

const publishTemplate = createAction<number, number>(
  PUBLISH_TEMPLATE,
  (id: number) => id
);

export {
  fetchTemplate,
  fetchTemplateFulfilled,
  templateErrorAction,
  publishTemplate,
  changeIndent
};
