import * as React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

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
class VariantGroup extends React.Component<IVariantGroupProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Droppable droppableId={this.props.column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {this.props.segmentVariants.map((segmentVariant, index) => (
              <VariantDnd
                variant={segmentVariant}
                key={index}
                task={{ id: segmentVariant.segment.id, content: '' }}
                index={index}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    );
  }
}

export default VariantGroup;
