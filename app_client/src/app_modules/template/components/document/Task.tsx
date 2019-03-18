import * as React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { HandlerRole } from 'dnd-core';
import { Form, Icon } from 'semantic-ui-react';

const Container = styled.div<{ ref: any; isDragging: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  // background-color: orange;
  // border-radius: 4px;
  margin-right: 8px;
`;

interface IDndProps {
  task: { id: string; content: string };
  index: number;
}
class Dnd extends React.Component<IDndProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Handle {...provided.dragHandleProps}>
              <Icon name="move" link={true} />
            </Handle>
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Dnd;
