import { handleActions, Action } from 'redux-actions';

import { Variant, IState } from './model';
import {
  ADD_VARIANT,
  EDIT_VARIANT
} from './actions';

const initialState: IState = [<Variant>{
  id: 0,
  title: '',
  text: '',
  sequence: 0,
  segmentId: 0
}];

export default handleActions<IState, Variant>({
  [ADD_VARIANT]: (state: IState, action: Action<Variant, number>): IState => {
    return [{
      // id: state.reduce((maxId, variant) => Math.max(variant.id, maxId), -1) + 1,
      id: 1,
      title: 'New Variant',
      text: '',
      // sequence: state.reduce((maxSeq, variant) => Math.max(variant.sequence, maxSeq), -1) + 1,
      sequence: 1,
      segmentId: action.segmentId,
    }, ...state];
  },

  [EDIT_VARIANT]: (state: IState, action: Action<Variant>): IState => {
    return <IState>state.map(variant => 
      variant.id === action.payload.id
      ? { ...variant, ...action.payloaf }
      : variant
    );
  }
}, initialState);