import { createAction } from 'redux-actions';

import { Variant } from './model';

export const ADD_VARIANT = 'ADD_VARIANT';
export const EDIT_VARIANT = 'EDIT_VARIANT';

const addVariant = createAction<Variant, number>(
  ADD_VARIANT, 
  (segmentId: number) => segmentId
);

const editVariant = createAction<Variant, Variant>(
  EDIT_VARIANT, 
  (payload: Variant) => payload
);

export { addVariant, editVariant };

