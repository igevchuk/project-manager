import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
// import { FETCH_FORM, FETCH_FORM_FULFILLED } from './actions';
import * as types from './actions';
import { IState, template } from './state';

export const initialState: IState = {
  isLocal: true,
  activeSegId: '722d4399-12cb-497f-8e29-5f1dc08b0230',
  template: {} as template
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TEMPLATE_FULFILLED: {
      if (state.isLocal) {
        const templates = action.payload;
        const newState = {
          ...state,
          template: Array(templates)[0][0]
        };

        const paragraphId = getParagraphIdBySegmentId(
          state.activeSegId,
          newState.template
        );
        // console.log(paragraphId);

        return newState;
      }

      // console.log(action.payload);
      const templates = action.payload;
      const newState = {
        ...state,
        template: Array(templates)[0]
      };
    }
    case 'FETCH_FORM_FULFILLED': {
      console.log(action.payload);
      return state;
    }
    case types.CHANGE_INDENT: {
      console.log(action.payload);
      return state;
    }
    default:
      return state;
  }
}

export const getParagraphIdBySegmentId = (
  segmentId: string,
  template: template
): string => {
  const activeSegment = template.textSegments.find(segment => {
    return segment.id === segmentId;
  });

  const paragraphId = activeSegment!.ref.paragraphId;
  return paragraphId;
};
