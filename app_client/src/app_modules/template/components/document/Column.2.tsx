import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import styled from 'styled-components';

import Task1 from './Task.1';
import { taskType } from './state';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 240px;

  display: flex;
  flex-direction: column;
`;
const Titile = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ ref: any; isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};

  flex-grow: 1;
  min-height: 100px;
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
    // console.log(this.props);
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
