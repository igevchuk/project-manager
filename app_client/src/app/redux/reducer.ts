import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import * as types from './actions';
import { IState, template } from './state';
import * as templateState from './state';

import Schema from '../../app_modules/template/controllers/document/schema';

type block = {
  order: number;
  paragraph: templateState.paragraph;
  segments: [
    {
      runs: templateState.run[];
      segment: templateState.textSegment;
    }
  ];
};

export const initialState: IState = {
  isLocal: true,
  activeSegId: 'b709de36-50bf-4429-97d4-cd660ea0ac3a', // 722d4399-12cb-497f-8e29-5f1dc08b0230
  template: {} as template,
  renderBlocks: [] as block[]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TEMPLATE_FULFILLED: {
      if (state.isLocal) {
        const templates = action.payload;
        const template = Array(templates)[0][0];

        const paragraphId = getParagraphIdBySegmentId(
          state.activeSegId,
          template
        );

        const renderBlocks = rederedBlocks(template);
        console.log(renderBlocks);

        const newState = {
          ...state,
          template, // : Array(templates)[0][0]
          renderBlocks
        };

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
      const indentAdjust = action.payload;
      const template = state.template;
      const paragraphId = getParagraphIdBySegmentId(
        state.activeSegId,
        template
      );

      console.log(paragraphId);

      const activeParagraphIndex = template.paragraphs.findIndex(
        paragraph => paragraph.id === paragraphId
      );
      const activeParagraph = template.paragraphs[activeParagraphIndex];

      const newParagraph = update(activeParagraph, {
        properties: { pStyle: { $set: 'Heading 3' } }
      });

      console.log(state.template);

      const newTemplate = update(state.template, {
        paragraphs: {
          $splice: [
            [activeParagraphIndex, 1],
            [activeParagraphIndex, 0, newParagraph]
          ]
        }
      });

      const newState = {
        ...state,
        template: newTemplate
      };

      console.log(newState);

      return newState;
    }
    default:
      return state;
  }
}

export const getParagraphIdBySegmentId = (
  segmentId: string,
  template: template
): string => {
  const activeSegment = template!.textSegments.find(segment => {
    return segment.id === segmentId;
  });

  const paragraphId = activeSegment!.ref.paragraphId;
  return paragraphId;
};

export const rederedBlocks = template => {
  const { blocks, paragraphs, textSegments, runs } = template;
  const schema = new Schema({ blocks, paragraphs, textSegments, runs });
  schema.initTemplate();
  return schema.SortedBlocks as block[];
};
