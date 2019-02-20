import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon link={true} name="move" />
  </span>
));

const SortableItem = sortableHoc.SortableElement(
  ({ value }: { value: string }) => (
    <div>
      <DragHandle />
      <span>{value}</span>
    </div>
  )
);

const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

type segment = {
  id: number;
  text: string;
};
interface ISegmentProps {
  segments: segment[];
}

interface ISegmentState {
  segments: segment[];
  items: string[];
}

class SegmentsComponent extends React.PureComponent<
  ISegmentProps,
  ISegmentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
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
