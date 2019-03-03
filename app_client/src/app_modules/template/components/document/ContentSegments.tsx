import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import CompareArrows from '@material-ui/icons/CompareArrows';
import { v4 } from 'uuid';

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

import * as templateState from '../../../../app/redux/state';
import Variants from './Variants';

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
}

const segmentVariants = [
  { id: 1, text: 'text01 asd', title: 'text01', sequence: 1 },
  { id: 2, text: 'text02 dsa', title: 'text02', sequence: 2 },
  { id: 3, text: 'text03 cde', title: 'text03', sequence: 3 },
  { id: 4, text: 'text04 rdx', title: 'text04', sequence: 4 }
]; // this.getTextVariants(segment);

export const HtmlSections: React.SFC<ISectionProps> = props => {
  console.log(props.blocks);

  const [activeSegment, setActiveSegment] = React.useState({});
  const [activateVariant, setActivateVariant] = React.useState(false);

  const handleClick = (value: segmentSource): void => {
    setActiveSegment(value);
    setActivateVariant(true);
  };

  const handleEscapeOutside = (): void => {
    // this.setState({ activeSegment: null });
    setActivateVariant(true);
  };

  const getSegment = (segmentSource: segmentSource) => {
    console.log(activeSegment);

    const segment = (
      <SegmentNode key={v4()}>
        <SegmentHover key={v4()} onClick={e => handleClick(segmentSource)}>
          <SegmentHoverFeature className="text-hover-feat">
            <DragHandle />
          </SegmentHoverFeature>
          {segmentSource.runs.map(run => (
            <TextNode key={v4()}> {run.t}</TextNode>
          ))}
        </SegmentHover>
        <VariantCount key={v4()} className="variant-count">
          {4} <CompareArrows />
        </VariantCount>
      </SegmentNode>
    );

    const variant = (
      <Variants
        segmentSource={segmentSource}
        textVariants={segmentVariants}
        onEscapeOutside={handleEscapeOutside}
      />
    );

    if (!activateVariant) {
      return segment;
    } else {
      // return variant;
    }
  };

  const getDoc = (blocks: block[]): React.ReactNode => {
    const asd = blocks.map(block => {
      switch (block.paragraph.properties.pStyle) {
        case PStyle.Articl:
          const titleNode = (
            <TitleNode key={v4()} isTitle={true} background="cornflowerblue">
              {block.segments.map(segmentNode => getSegment(segmentNode))}
            </TitleNode>
          );
          return titleNode;
        case PStyle.Heading1:
          const sectionNode = (
            <SectionNode key={v4()} background="palevioletred">
              {block.segments.map(segmentNode => getSegment(segmentNode))}
            </SectionNode>
          );
          return sectionNode;
        case PStyle.Heading2:
          const subSectionNode = (
            <SegmentsNode key={v4()} background="red" indLevel={2}>
              {block.segments.map(segmentNode => getSegment(segmentNode))}
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
              {block.segments.map(segmentNode => getSegment(segmentNode))}
            </SegmentsNode>
          );
          return clauseNode;
        case PStyle.Heading4:
          const subClauseNode = (
            <SegmentsNode key={v4()} background="orange" indLevel={6}>
              {block.segments.map(segmentNode => getSegment(segmentNode))}
            </SegmentsNode>
          );
          return subClauseNode;
        default:
          const normalNode = (
            <SegmentsNode key={v4()} background="orange">
              {block.segments.map(segmentNode => getSegment(segmentNode))}
            </SegmentsNode>
          );
          return normalNode;
          break;
      }
    });
    return asd;
  };

  return <ArticleNode>{getDoc(props.blocks)}</ArticleNode>;
};

/////////////////////

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" size="small" />
  </span>
));

const SortableItem = sortableHoc.SortableElement(
  ({ value }: { value: { id: number; text: string } }) => {
    const [activeSegment, setActiveSegment] = React.useState({
      id: -1,
      text: ''
    });

    const segmentVariants = [
      { id: 1, text: 'text01 asd', title: 'text01', sequence: 1 },
      { id: 2, text: 'text02 dsa', title: 'text02', sequence: 2 },
      { id: 3, text: 'text03 cde', title: 'text03', sequence: 3 },
      { id: 4, text: 'text04 rdx', title: 'text04', sequence: 4 }
    ]; // this.getTextVariants(segment);

    if (!activeSegment || value.id !== activeSegment.id) {
      return (
        <div>
          <TextHover key={v4()} onClick={() => setActiveSegment(value)}>
            <TextHoverFeature className="text-hover-feat">
              <DragHandle />
            </TextHoverFeature>
            <TextNode className="text-node">{value.text}</TextNode>
          </TextHover>
        </div>
      );
    }

    return (
      <Variants
        segmentId={value.id}
        textVariants={segmentVariants}
        onEscapeOutside={() => setActiveSegment({ id: -1, text: '' })}
      />
    );
  }
);

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
    // console.log(this.props.blocks);
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
