import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import { v4 } from 'uuid';

import Variants from './Variants';
import {
  StyledDocument,
  TextHover,
  TextHoverFeature,
  TextNode,
  VariantCount
} from './Document.style';

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

    // textVariant = {
    //   id?: uuid;
    //   title?: string;
    //   text?: string;
    //   sequence?: number;
    //   ref?: {
    //     segmentId?: uuid;
    //   };
    // };

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

// type docPiece = {
//   id?: number;
//   text?: string;
//   // blockId?: number;
//   // paragraphId?: number;
//   // textSegmentId?: number;
//   // run?: {};
// };

type docPiece = {
  id: number;
  segment: {
    id: number;
    blockId?: number;
    paragraphId?: number;
    text: string;
    run?: {};
    pStyle?: string;
  };
  variant: {
    id: number;
    ref?: {
      paragraphId?: number;
    };
    sequence?: number;
    type?: string;
    variantGroup?: number;
    variantType?: string;
    variantIsDefault?: boolean;
    text?: string;
    revision?: number;
    revisionCreatedDateTime?: Date;
    revisionCreatedBy?: string;
  };
};

interface ISegmentProps {
  segments: docPiece[];
}

interface ISegmentState {
  segments: docPiece[];
  // activeSegment: docPiece;
  items: string[];
}

class SegmentsComponent extends React.PureComponent<
  ISegmentProps,
  ISegmentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      // activeSegment: {},
      segments: this.props.segments,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
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

  public render() {
    const { items, segments } = this.state;

    return <div>sldkfj</div>;
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
