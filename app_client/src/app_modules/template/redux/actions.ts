// import { createAction as createReduxAction } from 'redux-actions';
import { createAction } from 'redux-actions';

// Action defination
export const SHOW_OUTLINE = 'templates/SHOW_OUTLINE';
export const TEMPLATE_ERROR_ACTION = 'templates/FORM_ERROR_ACTION';
export const FETCH_LOCAL_TEMPLATE = 'templates/FETCH_LOCAL_TEMPLATE';

const enableShowOutline = () => ({
  type: SHOW_OUTLINE
});

const templateErrorAction = createAction<{}, {}>(
  TEMPLATE_ERROR_ACTION,
  (Error: {}) => Error
);

export { enableShowOutline, templateErrorAction };
