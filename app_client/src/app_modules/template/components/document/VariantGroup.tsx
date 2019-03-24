import * as React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

// import { Provider } from './../../TemplateContext';
import appReducer, {
  initialState as appState
} from '../../../../app/redux/reducer';

import VariantDnd from './VariantDnd';
import * as templateState from '../../../../app/redux/state';

const TaskList = styled.div<{ ref: any; isDraggingOver: boolean }>`
  padding: 4px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#f5f5f5')};

  flex-grow: 1;
  // min-height: 100px;
`;

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

type tsk = { id: string; content: string };
interface IVariantGroupProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: tsk[];
  segmentVariants: segmentSource[];
}

const VariantGroup: React.SFC<IVariantGroupProps> = props => {
  const [templateState, dispatch] = React.useReducer(appReducer, {
    ...appState
  });

  return (
    <Droppable droppableId={props.column.id}>
      {(provided, snapshot) => (
        <TaskList
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {props.segmentVariants.map((segmentVariant, index) => (
            <VariantDnd
              key={index}
              variant={segmentVariant}
              task={{ id: segmentVariant.segment.id, content: '' }}
              index={index}
              // templateState={templateState}
            />
          ))}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  );
};

export default VariantGroup;