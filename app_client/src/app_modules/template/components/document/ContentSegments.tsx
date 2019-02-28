import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import { v4 } from 'uuid';
import * as templateState from '../../../../app/redux/state';

import Variants from './Variants';
import {
  StyledDocument,
  TextHover,
  TextHoverFeature,
  TextNode,
  Button1,
  Button2,
  TextNode02,
  TitleNode,
  SectionNode,
  SebSectionNode,
  ClauseNode,
  SubClauseNode,
  VariantCount
} from './Document.style';

type pStyle = 'Title' | 'Title' | 'Title' | 'Title' | 'Title';

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

type segment = {
  id: number;
  text: string;
};

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

  public getDoc = (blocks: block[]): React.ReactNode => {
    const asd = blocks.map(block => {
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
                  <div key={innerKey++}>
                    {segment.runs.map(run => {
                      const asd = (
                        <TitleNode key={run.id} className="text-node">{`  ${
                          run.t
                        }`}</TitleNode>
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
        case 'Heading 1':
          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div key={block.order++}>
                    {segment.runs.map(run => {
                      const asd = (
                        <SectionNode key={run.id} className="text-node">{`  ${
                          run.t
                        }`}</SectionNode>
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
        case 'Heading 2':
          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div key={block.order++}>
                    {segment.runs.map(run => {
                      const asd = (
                        <SebSectionNode
                          key={run.id}
                          className="text-node"
                        >{`  ${run.t}`}</SebSectionNode>
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
        case 'Heading 3':
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
        case 'Heading 4':
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
          return (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div key={block.order++}>
                    {segment.runs.map(run => {
                      const asd = (
                        <TextNode key={run.id} className="text-node">{`  ${
                          run.t
                        }`}</TextNode>
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
      }
    });
    return asd;
  };

  public render() {
    console.log(this.props.blocks);
    const doc = this.getDoc(this.props.blocks);

    // console.log(doc);
    return <div>{doc}</div>;

    return (
      <div>
        <Button1 selected={true}>this is testing</Button1>
        <TextNode02 color={'orange'} border={4}>
          aaaaa
        </TextNode02>
      </div>
    );
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
