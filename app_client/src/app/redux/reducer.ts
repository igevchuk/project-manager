import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import { FETCH_FORM, FETCH_FORM_FULFILLED } from './actions';
import * as types from './actions';
import { IState, template } from './state';

const initialState: IState = {
  isLocal: true,
  activeId: '722d4399-12cb-497f-8e29-5f1dc08b0230',
  template: {} as template
  // templates: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FORM_FULFILLED: {
      if (state.isLocal) {
        const templates = action.payload;
        const newState = {
          ...state,
          template: Array(templates)[0][0]
          // templates: Array(templates)[0]
        };

        // console.log(newState);

        return newState;
      }

      // console.log(action.payload);
      // const templates = action.payload;
      // const newState = {
      //   ...state,
      //   templates: Array(templates)[0]
      // };
    }
    case 'FETCH_FORM_FULFILLED': {
      console.log(action.payload);
      return state;
    }
    default:
      return state;
  }
}

export const getParagraphIdBySegmentId = (segmentId: string): number => {
  // const paragraph = paragraphs.filter(
  //   paragraph => paragraph.id === paragraphId
  // )[0];
  // return {
  //   blockId: paragraph.ref.blockId,
  //   pStyle: paragraph.properties.pStyle
  // };
  return 0;
};
