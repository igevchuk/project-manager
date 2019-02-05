// import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';

import { FETCH_FORM, FETCH_FORM_FULFILLED } from './actions';
import * as types from './actions';

import { IState } from './state';
import { template } from './state';
import { article } from './state';
import { section } from './state';
import { subSection } from './state';
import { clause } from './state';
import { subClause } from './state';
import { textSegment } from './state';

const initialState: IState = {
  activeId: 1,
  templates: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FORM_FULFILLED: {
      const templates = action.payload;
      const newState = {
        ...state,
        templates: Array(templates)[0]
      };
      // console.log(newState.templates[0]);

      return newState;
    }

    default:
      return state;
  }
}

// export default handleActions<IState>(
//   {
//     [FETCH_FORM]: (state: IState, action: Action<IState>): IState => {
//       return state;
//     },

//     [FETCH_FORM_FULFILLED]: (state: IState, action: Action<IState>): IState => {
//       const aa = action.payload;
//       console.log(aa);

//       const newState = {
//         ...state,
//         article: {
//           id: 2,
//           name: 'stringaaa',
//           ref: { templateId: 111 }
//         }
//       };

//       return newState;
//     }
//   },
//   initialState
// );
