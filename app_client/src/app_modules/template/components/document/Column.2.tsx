import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import styled from 'styled-components';

import Task1 from './Task.1';
import { taskType } from './state';

const TaskList = styled.div<{ ref: any; isDraggingOver: boolean }>`
  padding: 4px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#f5f5f5')};

  flex-grow: 1;
  // min-height: 100px;
`;

type tsk = { id: string; content: string };
interface IDndProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: tsk[];
}
class Dnd extends React.Component<IDndProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    console.log('this.props.tasks');
    console.log(this.props);
    return (
      <Droppable droppableId={this.props.column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {this.props.tasks.map((task, index) => (
              <Task1 key={(task as any).segment.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    );
  }
}

export default Dnd;
