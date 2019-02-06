import { TextVariant, IState } from './model';
import {
  ADD_VARIANT,
  EDIT_VARIANT
} from './actions';

const initialState: IState = [{
  id: 0,
  title: '',
  text: '',
  sequence: 0,
  segmentId: 0
}];


export default function reducer(state: IState = initialState, action) {
  switch (action.type) {
    case ADD_VARIANT:
      return [{
        // id: state.reduce((maxId, variant) => Math.max(variant.id, maxId), -1) + 1,
        id: 1,
        title: 'New Variant',
        text: '',
        // sequence: state.reduce((maxSeq, variant) => Math.max(variant.sequence, maxSeq), -1) + 1,
        sequence: 1,
        segmentId: action.segmentId,
      }, ...state];
    case EDIT_VARIANT:
      return state.map(variant => 
        variant.id === action.payload.id
        ? { ...variant, ...action.payloaf }
        : variant
      );
    default:
        return state;
  }
}