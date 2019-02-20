// 1874

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

const handleEscapeOutside = (): void => {
  // this.setState({ activeSegment: null });
};
const SortableItem = sortableHoc.SortableElement(
  ({ value }: { value: string }) => {
    if (true) {
      return (
        <div>
          <TextHover key={v4()}>
            <TextHoverFeature className="text-hover-feat">
              <DragHandle />
            </TextHoverFeature>
            <TextNode className="text-node">{value}</TextNode>
          </TextHover>
        </div>
      );
    }

    return <Variants segment={value} onEscapeOutside={handleEscapeOutside} />;
  }
);

const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

type segment = {
  id: number;
  text: string;
};

type docPiece = {
  id?: number;
  text?: string;
  // blockId?: number;
  // paragraphId?: number;
  // textSegmentId?: number;
  // run?: {};
};
interface ISegmentProps {
  segments: segment[];
}

interface ISegmentState {
  segments: segment[];
  activeSegment: docPiece;
  items: string[];
}

class SegmentsComponent extends React.PureComponent<
  ISegmentProps,
  ISegmentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeSegment: {},
      segments: this.props.segments,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
    };
  }

  public onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex);
    this.setState(({ segments }) => ({
      segments: sortableHoc.arrayMove(segments, oldIndex, newIndex)
    }));
  };

  public render() {
    const { items, segments } = this.state;
    // console.log(segments);

    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle={true}>
        {segments.map((segment, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={segment.text}
          />
        ))}
      </SortableContainer>
    );
  }
}

export default SegmentsComponent;
