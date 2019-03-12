import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import CompareArrows from '@material-ui/icons/CompareArrows';
import { v4 } from 'uuid';
import * as templateState from '../../../../app/redux/state';
import Variants from './Variants';
import {
  TextHover,
  TextHoverFeature,
  TextNode,
  ArticleNode,
  TitleNode,
  SectionNode,
  SegmentsNode,
  SegmentNode,
  SegmentHover,
  SegmentHoverFeature,
  VariantCount
} from './Document.style';

enum PStyle {
  Articl = 'Title',
  Heading1 = 'Heading 1',
  Heading2 = 'Heading 2',
  Heading3 = 'Heading 3',
  Heading4 = 'Heading 4'
}

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

type block = {
  order: number;
  paragraph: templateState.paragraph;
  segments: segmentSource[];
};

interface ISectionProps {
  blocks: block[];
  appDispatch: React.Dispatch<any>;
}

const initialState = {
  isActive: false,
  isVariant: false,
  segment: {
    id: '',
    ref: {},
    sequence: -1,
    variantGroup: '',
    variantIsDefault: false
  }
};

export const HtmlSections: React.SFC<ISectionProps> = props => {
  const [activeSegment, setActiveSegment] = React.useState(initialState);
  const [segmentSources, setSegmentSources] = React.useState(
    [] as segmentSource[][]
  );

  const handleClick = (value: segmentSource): void => {
    const isVariant = activeSegment.segment.id === value.segment.id;

    setActiveSegment({
      isActive: true,
      isVariant,
      segment: value.segment
    });

    props.appDispatch({
      type: 'TRACK_CURRENT_SEGMENT',
      payload: {
        id: value.segment.id,
        segment: value.segment
      }
    });
  };

  const handleEscapeOutside = (): void => {
    setActiveSegment(initialState);
  };

  const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
    return <div>{children}</div>;
  });

  // return (
  //   <SortableContainer onSortEnd={this.onSortEnd} useDragHandle={true}>
  //     {segments.map((segment, index) => (
  //       <SortableItem key={`item-${index}`} index={index} value={segment} />
  //     ))}
  //   </SortableContainer>
  // );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // console.log(oldIndex);
    // this.setState(({ segments }) => ({
    //   segments: sortableHoc.arrayMove(segments, oldIndex, newIndex)
    // }));
  };

  const getSegment = (blockOrder: number, segmentSource: segmentSource) => {
    const variantIsDefault = segmentSource.segment.variantIsDefault;
    const variants = segmentSources[blockOrder];

    const segment = (isActive: boolean = false) => (
      // <SortableContainer onSortEnd={onSortEnd} useDragHandle={true}>
      <SegmentNode key={v4()} onClick={e => handleClick(segmentSource)}>
        <SegmentHover key={v4()} showBackground={isActive}>
          <SegmentHoverFeature className="text-hover-feat">
            <DragHandle />
          </SegmentHoverFeature>
          {segmentSource.runs.map(run => (
            <TextNode key={v4()}> {run.t}</TextNode>
          ))}
        </SegmentHover>
        <VariantCount key={v4()} className="variant-count">
          {variants && variants.length - 1} <CompareArrows />
        </VariantCount>
      </SegmentNode>
      // </SortableContainer>
    );

    const variant = () => (
      <Variants
        key={v4()}
        segmentVariants={variants}
        onEscapeOutside={handleEscapeOutside}
      />
    );

    if (!variantIsDefault) {
      return null;
    }

    if (activeSegment.isVariant) {
      return variant();
    }

    if (
      !activeSegment ||
      segmentSource.segment.id !== activeSegment.segment.id
    ) {
      return segment(false);
    } else {
      return segment(true);
    }
  };

  const getDoc = (blocks: block[]): React.ReactNode => {
    // console.log(props.blocks);
    const sources: segmentSource[][] = [];
    if (segmentSources.length === 0) {
      blocks.map(block => {
        sources.push(block.segments);
      });
      setSegmentSources(sources);
    }

    const htmlSections = blocks.map(block => {
      switch (block.paragraph.properties.pStyle) {
        case PStyle.Articl:
          const titleNode = (
            <TitleNode key={v4()} isTitle={true} background="cornflowerblue">
              {block.segments.map(segmentNode =>
                getSegment(block.order, segmentNode)
              )}
            </TitleNode>
          );
          return titleNode;
        case PStyle.Heading1:
          const sectionNode = (
            <SectionNode key={v4()} background="palevioletred">
              {block.segments.map(segmentNode =>
                getSegment(block.order, segmentNode)
              )}
            </SectionNode>
          );
          return sectionNode;
        case PStyle.Heading2:
          const subSectionNode = (
            <SegmentsNode key={v4()} background="red" indLevel={2}>
              {block.segments.map(segmentNode =>
                getSegment(block.order, segmentNode)
              )}
            </SegmentsNode>
          );
          return subSectionNode;
        case PStyle.Heading3:
          const clauseNode = (
            <SegmentsNode
              key={v4()}
              background={'rgb(159,168,218)'}
              indLevel={4}
            >
              {block.segments.map(segmentNode =>
                getSegment(block.order, segmentNode)
              )}
            </SegmentsNode>
          );
          return clauseNode;
        case PStyle.Heading4:
          const subClauseNode = (
            <SegmentsNode key={v4()} background="orange" indLevel={6}>
              {block.segments.map(segmentNode =>
                getSegment(block.order, segmentNode)
              )}
            </SegmentsNode>
          );
          return subClauseNode;
        default:
          const normalNode = (
            <SegmentsNode key={v4()} background="orange">
              {block.segments.map(segmentNode =>
                getSegment(block.order, segmentNode)
              )}
            </SegmentsNode>
          );
          return normalNode;
          break;
      }
    });
    return htmlSections;
  };

  return (
    <ArticleNode>
      {getDoc(props.blocks)}
      <button
        hidden={true}
        onClick={() =>
          props.appDispatch({
            type: 'FETCH_FORM_FULFILLED',
            payload: {
              id: 114,
              name: 'this is name'
            }
          })
        }
      >
        +
      </button>
    </ArticleNode>
  );
};

/////////////////////

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" size="small" />
  </span>
));

const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

type docPiece = {
  id: string;
  blockId: number;
  segment: {
    id: string;
    blockId?: number;
    paragraphId?: string;
    text: string;
    run?: {};
    pStyle?: string;
  };
  variant: {
    id: string;
    ref?: {
      paragraphId?: string;
    };
    sequence?: number;
    type?: string;
    variantGroup?: string;
    variantDescription?: string;
    variantIsDefault?: boolean;
    text?: string;
    revisionCreatedDateTime?: Date;
    revisionCreatedBy?: string;
    properties?: {};
  };
};

interface ISegmentProps {
  blocks: block[];
}

interface ISegmentState {
  segments: docPiece[];
}

class SegmentsComponent extends React.PureComponent<
  ISegmentProps,
  ISegmentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      segments: []
    };
  }

  public handleClick = (e: any, value: any): void => {
    console.log(value);
  };

  public onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex);
    this.setState(({ segments }) => ({
      segments: sortableHoc.arrayMove(segments, oldIndex, newIndex)
    }));
  };

  public groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item]
      }),
      {}
    );

  public render() {
    // const doc = this.getDoc(this.props.blocks);
    return <div>{'doc'}</div>;

    // return (
    //   <SortableContainer onSortEnd={this.onSortEnd} useDragHandle={true}>
    //     {segments.map((segment, index) => (
    //       <SortableItem key={`item-${index}`} index={index} value={segment} />
    //     ))}
    //   </SortableContainer>
    // );
  }
}

export default SegmentsComponent;
