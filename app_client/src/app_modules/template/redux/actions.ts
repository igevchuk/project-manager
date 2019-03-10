// import { createAction as createReduxAction } from 'redux-actions';
import { createAction } from 'redux-actions';

// Action defination
export const SHOW_OUTLINE = 'template/SHOW_OUTLINE';

const enableShowOutline = () => ({
  type: SHOW_OUTLINE
});

export { enableShowOutline };
