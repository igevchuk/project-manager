import * as React from 'react';
import { v4 } from 'uuid';
import { DragSource, DropTarget } from 'react-dnd';
import { Form, Icon } from 'semantic-ui-react';

import arrayMove from 'array-move';
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => (
  <span>
    {/* <img src="smiley.gif" alt="Smiley face" height="4" width="4" /> */}
    <Icon link={true} name="move" />
  </span>
));

const SortableItem = sortableElement(({ value }) => (
  <p>
    <DragHandle />
    <span>{value}</span>
  </p>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

class SortableComponent extends React.PureComponent {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
  };

  render() {
    const { items } = this.state;

    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </SortableContainer>
    );
  }
}

export default SortableComponent;

// import flow from 'lodash/flow';
// import SegmentTypes from './document/segmentTypes';

// import {
//   StyledDocument,
//   TextHover,
//   TextHoverFeature,
//   TextNode,
//   VariantCount
// } from './Document.style';

// import {
//   Button,
//   Header,
//   Icon,
//   Image,
//   Menu,
//   Segment,
//   Sidebar,
//   Grid
// } from 'semantic-ui-react';

// const segmentSource = {
//   beginDrag(props) {
//     const targetId = props.segment.id;
//     // alert(targetId);
//     return {
//       id: props.segment.id
//       // survey: props.survey,
//       // activePage: props.activePage
//     };
//   }
// };

// const segmentTarget = {
//   hover(targetProps, monitor) {
//     const targetId = targetProps.segment.id;
//     // console.log(targetId);
//     // const sourceProps = monitor.getItem();
//     // const sourceId = sourceProps.id;
//     // const sourceSurvey = sourceProps.survey;
//     // const sourcePageId = sourceProps.activePage.id;
//     // if (sourceId !== targetId) {
//     //   targetProps.onDrag({ sourceSurvey, sourcePageId, targetId });
//     // }
//   }
// };

// class ContentSegmentDND extends React.Component {
//   // public handleClick = (e, segment) => {
//   //   //
//   // };
//   render() {
//     const { segment, connectDragSource, connectDropTarget } = this.props;
//     return connectDragSource(
//       connectDropTarget(
//         // <div>
//         //   <TextHover key={v4()}>
//         //     <TextHoverFeature className="text-hover-feat">
//         //       <Icon name="move" size="small" />
//         //     </TextHoverFeature>
//         //     <TextNode className="text-node">{segment.text}</TextNode>
//         //   </TextHover>
//         // </div>
//         <div>
//           <TextNode className="text-node">{segment.text}</TextNode>
//         </div>
//       )
//     );
//   }
// }

// export default flow(
//   DragSource(SegmentTypes.SEGMENT, segmentSource, (connect, monitor) => ({
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   })),
//   DropTarget(SegmentTypes.SEGMENT, segmentTarget, connect => ({
//     connectDropTarget: connect.dropTarget()
//   }))
// )(ContentSegmentDND);
