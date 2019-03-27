import update from 'immutability-helper';
import { handleActions, Action } from 'redux-actions';
import * as types from './actions';
import { IState, template } from './state';
import * as templateState from './state';
import { v4 } from 'uuid';

import Schema from '../../app_modules/template/controllers/document/schema';

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

type block = {
  id: string;
  order: number;
  paragraph: templateState.paragraph;
  segments: [
    {
      runs: templateState.run[];
      segment: templateState.textSegment;
    }
  ];
};

const isLocal = process.env.NODE_ENV === 'production' ? false : true;
export const initialState: IState = {
  // isLocal: process.env.NODE_ENV === 'production' ? false : true,
  isLocal: false,
  activeSegId: '',
  template: {} as template,
  renderBlocks: [] as templateState.renderBlock[],
  variants: [] as segmentSource[][]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TEMPLATE_FULFILLED: {
      if (state.isLocal) {
        const templates = action.payload;
        const template = Array.from(templates)[0];
        const renderBlocks = rederedBlocks(template);

        const variants: segmentSource[][] = [];
        renderBlocks.map(block => {
          variants.push(block.segments);
        });

        const newState = {
          ...state,
          template,
          renderBlocks,
          variants
        };
        return newState;
      }

      const template = action.payload;
      const renderBlocks = rederedBlocks(template);

      const variants: segmentSource[][] = [];
      renderBlocks.map(block => {
        variants.push(block.segments);
      });

      const newState = {
        ...state,
        template: Array(template)[0],
        renderBlocks,
        variants
      };
      return newState;
    }
    case 'template/FETCH_FORM_FULFILLED': {
      const newState = {
        ...state,
        activeSegId: action.payload.id
      };
      console.log(state);
      return newState;
    }

    case 'emplate/ADD_TEXTSEGMENT_VARIANT': {
      const payload = action.payload as {
        segmentId: string;
      };

      const segmentIndex = state.template.textSegments.findIndex(
        segment => segment.id === payload.segmentId
      );
      const segment = state.template.textSegments[segmentIndex];

      const segmentId = v4();
      const newSegment = {
        ...segment,
        id: segmentId,
        // type: 'TextSegment',
        // properties: {},
        // sequence: 0,
        // ref: {
        //   paragraphId: 'acb64f7d-134c-4425-85ea-bc33f35a9143'
        // },
        // revisionCreatedDateTime: '2019-02-26T18:19:43.608000Z',
        // revisionCreatedBy: 2,
        text: 'This is new variant text segment.',
        variantDescription: 'Alternatve',
        variantIsDefault: false
        // variantGroup: 'e02d5516-d4f1-4a90-8f67-f96ba665a186'
      };

      const newTemplateWithSegment = update(state.template, {
        textSegments: {
          $splice: [[state.template.textSegments.length, 0, newSegment]]
        }
      });

      const runIndex = state.template.runs.findIndex(
        run => run.ref.textSegmentId === payload.segmentId
      );
      const run = state.template.runs[runIndex];

      const newRun = {
        ...run,
        id: v4(),
        // type: 'Run',
        // properties: {},
        // sequence: 0,
        ref: {
          textSegmentId: segmentId
        },
        // revisionCreatedDateTime: '2019-02-26T18:24:57.679000Z',
        // revisionCreatedBy: 2,
        // isVariable: false,
        t: 'A new variant text segment.'
      };

      const newTemplateWihRun = update(newTemplateWithSegment, {
        runs: {
          $splice: [[state.template.runs.length, 0, newRun]]
        }
      });

      const renderBlocks = rederedBlocks(newTemplateWihRun);

      const variants: segmentSource[][] = [];
      renderBlocks.map(block => {
        variants.push(block.segments);
      });

      const newState = {
        ...state,
        template: newTemplateWihRun,
        renderBlocks,
        variants
      };

      console.log(newState);

      return newState;
    }

    case 'template/EDIT_VARIANT_TITLE': {
      const payload = action.payload as {
        segmentId: string;
        variantDescription: string;
      };
      // console.log('state.variants');
      // return state;

      const segmentIndex = state.template.textSegments.findIndex(
        segment => segment.id === payload.segmentId
      );
      const segment = state.template.textSegments[segmentIndex];

      const newSegment = {
        ...segment,
        variantDescription: payload.variantDescription
      };

      const newTemplate = update(state.template, {
        textSegments: {
          $splice: [[segmentIndex, 1], [segmentIndex, 0, newSegment]]
        }
      });

      const variants = state.variants.map((variant, index) => {
        const segmentSource = variant.find(
          dataSource => dataSource.segment.id === payload.segmentId
        );
        return { index, segmentSource };
      });

      const variantIndex = variants.findIndex(
        variant => variant.segmentSource !== undefined
      );
      const variant = state.variants[variantIndex];

      const segmentSourceIndex = variant.findIndex(
        segmentSource => segmentSource.segment.id === payload.segmentId
      );
      const segmentSource = variant[segmentSourceIndex];

      const newSegmentSource = update(segmentSource, {
        segment: {
          variantDescription: { $set: payload.variantDescription }
        }
      });

      const newVariant = update(variant, {
        $splice: [
          [segmentSourceIndex, 1],
          [segmentSourceIndex, 0, newSegmentSource]
        ]
      });

      const newVariants = update(state.variants, {
        $splice: [[variantIndex, 1], [variantIndex, 0, newVariant]]
      });

      // console.log(variant);
      // console.log(segmentSource);
      // console.log(newSegmentSource);
      // console.log(newVariant);
      // console.log(newVariants);

      const newRenderBlocks = rederedBlocks(newTemplate);
      const newState = {
        ...state,
        template: newTemplate,
        renderBlocks: newRenderBlocks,
        variants: newVariants
      };

      console.log(newState);

      return newState;
    }

    case 'CHANGE_PARAGRAPH_LEVEL': {
      const paraName = action.payload;
      const template = state.template;
      const paragraphId = getParagraphIdBySegmentId(
        state.activeSegId,
        template
      );

      const activeParagraphIndex = template.paragraphs.findIndex(
        paragraph => paragraph.id === paragraphId
      );
      const activeParagraph = template.paragraphs[activeParagraphIndex];

      let newPStyle = '';
      switch (paraName) {
        case 'article':
          newPStyle = 'Title';
          break;
        case 'section':
          newPStyle = 'Heading 1';
          break;
        case 'subSection':
          newPStyle = 'Heading 2';
          break;
        case 'clause':
          newPStyle = 'Heading 3';
          break;
        case 'subClause':
          newPStyle = 'Heading 4';
          break;
        case 'noIndent':
          newPStyle = 'noIndent';
          break;
        default:
          newPStyle = 'noIndent';
      }

      const newParagraph = update(activeParagraph, {
        properties: { pStyle: { $set: newPStyle } }
      });

      const newTemplate = update(state.template, {
        paragraphs: {
          $splice: [
            [activeParagraphIndex, 1],
            [activeParagraphIndex, 0, newParagraph]
          ]
        }
      });

      const renderBlocks = rederedBlocks(newTemplate);

      const newState = {
        ...state,
        template: newTemplate,
        renderBlocks
      };

      return newState;
    }

    case 'TRACK_CURRENT_SEGMENT': {
      // console.log(state);
      const newState = {
        ...state,
        activeSegId: action.payload.id
      };
      return newState;
    }

    case types.CHANGE_INDENT: {
      // debugger;
      const indentAdjust = action.payload;
      const template = state.template;
      const paragraphId = getParagraphIdBySegmentId(
        state.activeSegId,
        template
      );

      console.log(paragraphId);

      // const runIndex = template.runs.findIndex(
      //   run => run.id === '8995c5bb-7dcb-45bf-8218-67e60dce3c54'
      // );
      // const selectRun = template.runs[runIndex];
      // const newRun = update(selectRun, {
      //   t: { $set: 'Heading greement Title' }
      // });

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
        }
        // runs: {
        //   $splice: [[runIndex, 1], [runIndex, 0, newRun]]
        // }
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
    preIndent = parseInt(temp as string, 10);
  }

  let newIndent = preIndent;
  if (indentAdjust > 0 || (indentAdjust < 0 && preIndent + indentAdjust >= 0)) {
    newIndent = preIndent + indentAdjust;
  }

  // console.log(preIndent);
  // console.log(newIndent);
  return newIndent;
};
