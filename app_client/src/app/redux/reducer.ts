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
  activeSegId: '722d4399-12cb-497f-8e29-5f1dc08b0230', // 722d4399-12cb-497f-8e29-5f1dc08b0230  b709de36-50bf-4429-97d4-cd660ea0ac3a
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

      console.log(action.payload);
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

      const runIndex = template.runs.findIndex(
        run => run.id === '8995c5bb-7dcb-45bf-8218-67e60dce3c54'
      );
      const selectRun = template.runs[runIndex];
      const newRun = update(selectRun, {
        t: { $set: 'Heading greement Title' }
      });

      const activeParagraphIndex = template.paragraphs.findIndex(
        paragraph => paragraph.id === paragraphId
      );
      const activeParagraph = template.paragraphs[activeParagraphIndex];

      const pStyle = activeParagraph.properties.pStyle;
      const newIndent = adjustIndent(pStyle, indentAdjust);

      const newParagraph = update(activeParagraph, {
        properties: { pStyle: { $set: 'Heading ' + newIndent } }
      });

      const newTemplate = update(state.template, {
        paragraphs: {
          $splice: [
            [activeParagraphIndex, 1],
            [activeParagraphIndex, 0, newParagraph]
          ]
        },
        runs: {
          $splice: [[runIndex, 1], [runIndex, 0, newRun]]
        }
      });

      const renderBlocks = rederedBlocks(newTemplate);

      const newState = {
        ...state,
        template: newTemplate,
        renderBlocks
      };

      // console.log(newState);

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

export const adjustIndent = (pStyle: string, indentAdjust: number): number => {
  let preIndent = 0;
  if (pStyle!.startsWith('Heading')) {
    const temp = pStyle.split(' ').pop();
    preIndent = parseInt(temp as string, 4);
  }

  let newIndent = preIndent;
  if (indentAdjust > 0 || (indentAdjust < 0 && preIndent + indentAdjust >= 0)) {
    newIndent = preIndent + indentAdjust;
  }

  console.log(preIndent);
  console.log(newIndent);
  return newIndent;
};
