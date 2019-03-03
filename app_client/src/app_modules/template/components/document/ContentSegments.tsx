import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import styled from 'styled-components';
import { v4 } from 'uuid';
import CompareArrows from '@material-ui/icons/CompareArrows';

import * as templateState from '../../../../app/redux/state';
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
  Section,
  SebSectionNode,
  ClauseNode,
  SubClauseNode,
  VariantCount
} from './Document.style';

import Variants from './Variants';

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

interface ISectionProps {
  blocks: block[];
}

export const HtmlSections: React.SFC<ISectionProps> = props => {
  console.log(props.blocks);

  const handleClick = (e: any, value: any): void => {
    console.log(value);
  };

  const nodeStyling = (
    segment: { id: string; text?: string },
    activeSegment?: { id: number; text: string }
  ) => {
    // if (!activeSegment || segment.id !== activeSegment.id) {
    if (true) {
      return [
        <SegmentHover key={v4()} onClick={e => handleClick(e, segment)}>
          <SegmentHoverFeature className="text-hover-feat">
            <Icon name="move" size="small" />
          </SegmentHoverFeature>
          <TextNode className="text-node">{segment.text}</TextNode>
        </SegmentHover>,
        <VariantCount key={v4()} className="variant-count">
          {/* {segmentVariants.length} <CompareArrows /> */}
        </VariantCount>
      ];
    }
    return (
      <Variants
      // segmentId={segment.id}
      // textVariants={segmentVariants}
      // onEscapeOutside={this.handleEscapeOutside}
      />
    );
  };

  const getSegment = (segmentSource: {
    runs: templateState.run[];
    segment: templateState.textSegment;
  }) => {
    const segment = (
      <SegmentNode key={v4()}>
        <SegmentHover key={v4()} onClick={e => handleClick(e, segmentSource)}>
          <SegmentHoverFeature className="text-hover-feat">
            <Icon name="move" size="small" />
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
    return segment;
  };

  const getDoc = (blocks: block[]): React.ReactNode => {
    const asd = blocks.map(block => {
      switch (block.paragraph.properties.pStyle) {
        case 'Title':
          const titleNode = (
            <TitleNode key={v4()} isTitle={true} background="cornflowerblue">
              {block.segments.map(segmentNode => getSegment(segmentNode))}
            </TitleNode>
          );
          return titleNode;
        case 'Heading 1':
          const sectionNode = (
            <SectionNode key={v4()} background="palevioletred">
              {block.segments.map(segmentNode => getSegment(segmentNode))}
            </SectionNode>
          );
          return sectionNode;
        case 'Heading 2':
          const subSectionNode = (
            <SegmentsNode key={v4()} background="red" indLevel={2}>
              {block.segments.map(segmentNode => getSegment(segmentNode))}
            </SegmentsNode>
          );
          return subSectionNode;
        case 'Heading 3':
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
        case 'Heading 4':
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

  public nodeStyling = (
    segment: { id: string; text?: string },
    activeSegment?: { id: number; text: string }
  ) => {
    // if (!activeSegment || segment.id !== activeSegment.id) {
    if (true) {
      return [
        <TextHover key={v4()} onClick={e => this.handleClick(e, segment)}>
          <TextHoverFeature className="text-hover-feat">
            <Icon name="move" size="small" />
          </TextHoverFeature>
          <TextNode className="text-node">{segment.text}</TextNode>
        </TextHover>,
        <VariantCount key={v4()} className="variant-count">
          {/* {segmentVariants.length} <CompareArrows /> */}
        </VariantCount>
      ];
    }
    return (
      <Variants
      // segmentId={segment.id}
      // textVariants={segmentVariants}
      // onEscapeOutside={this.handleEscapeOutside}
      />
    );
  };

  public getDoc = (blocks: block[]): React.ReactNode => {
    const asd = blocks.map(block => {
      // debugger;
      switch (block.paragraph.properties.pStyle) {
        case 'Title':
          if (!(block.segments.length > 0)) {
            return null;
          }

          let innerKey = 1;

          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <Section key={innerKey++} background="cornflowerblue">
                    ✨ Magic ${segment.runs.length}`}
                  </Section>
                );
                return sredering;
              })}
            </div>
          );

          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div key={innerKey++}>
                    {segment.runs.map(run => {
                      const asd = (
                        <Section key={run.id} background="cornflowerblue">
                          ✨ Magic ${run.t}`}
                        </Section>
                      );
                      return asd;
                    })}
                  </div>
                );
                return sredering;
              })}
            </div>
          );

          break;
        case 'Heading1':
          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div key={block.order++}>
                    {segment.runs.map(run => {
                      return this.nodeStyling({ id: run.id, text: run.t });
                    })}
                  </div>
                );
                return sredering;
              })}
            </div>
          );

          break;
        case 'Heading2':
          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div key={block.order++}>
                    {segment.runs.map(run => {
                      const asd = (
                        <Section key={run.id} background="cornflowerblue">
                          ✨ Magic ${run.t}`}
                        </Section>
                      );
                      return asd;
                    })}
                  </div>
                );
                return sredering;
              })}
            </div>
          );
          break;
        case 'Heading3':
          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div key={block.order++}>
                    {segment.runs.map(run => {
                      const asd = (
                        <ClauseNode key={run.id} className="text-node">{`  ${
                          run.t
                        }`}</ClauseNode>
                      );
                      return asd;
                    })}
                  </div>
                );
                return sredering;
              })}
            </div>
          );
          break;
        case 'Heading4':
          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div key={block.order++}>
                    {segment.runs.map(run => {
                      const asd = (
                        <SubClauseNode key={run.id} className="text-node">{`  ${
                          run.t
                        }`}</SubClauseNode>
                      );
                      return asd;
                    })}
                  </div>
                );
                return sredering;
              })}
            </div>
          );
          break;
        default:
          return 'null';
          break;
      }
    });
    return asd;
  };

  public render() {
    console.log(this.props.blocks);
    const doc = this.getDoc(this.props.blocks);
    return <div>{doc}</div>;

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
