import { TextVariant } from './model';

export const ADD_VARIANT = 'ADD_VARIANT';
export const EDIT_VARIANT = 'EDIT_VARIANT';

const addVariant = (segmentId: number) => ({
  type: ADD_VARIANT,
  segmentId
});

const editVariant = (payload: TextVariant) => ({
  type: EDIT_VARIANT,
  payload
});

export { addVariant, editVariant };
