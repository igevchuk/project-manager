import * as React from 'react';

import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

const surveySource = {
  beginDrag(props) {
    return {
      id: props.id,
      survey: props.survey,
      activePage: props.activePage
    };
  }
};

const surveyTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    const sourceSurvey = sourceProps.survey;
    const sourcePageId = sourceProps.activePage.id;

    if (sourceId !== targetId) {
      targetProps.onDrag({ sourceSurvey, sourcePageId, targetId });
    }
  }
};

const Page1: React.SFC = () => {
  return <div>Page1</div>;
};

// export default Page1;

export default flow(
  DragSource('segmentType', surveySource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget('segmentType', surveyTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Page1);
