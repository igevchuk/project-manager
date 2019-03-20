import * as React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { HandlerRole } from 'dnd-core';
import { Form, Icon } from 'semantic-ui-react';
import { Editable } from './Variants.style';
import { v4 } from 'uuid';
import ContentEditable from 'react-contenteditable';
import * as templateState from '../../../../app/redux/state';

const Container = styled.div<{ ref: any; isDragging: boolean }>`
  // border: 1px solid lightgrey;
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

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

interface IDndProps {
  blockOrder: number;
  index: number;
  segmentNode: segmentSource;
}
class Task2 extends React.Component<IDndProps> {
  constructor(props) {
    super(props);
  }

  public handleEditText = ({ target }) => {
    // const { variant, onUpdate } = this.props;
    // const updatedVariant = { ...variant, title: target.innerHTML };
    // onUpdate(updatedVariant);
  };

  public handleEditTitle = ({ target }) => {
    // const { variant, onUpdate } = this.props;
    // const updatedVariant = { ...variant, title: target.textContent };
    // onUpdate(updatedVariant);
  };

  public render() {
    return (
      <Draggable
        draggableId={this.props.segmentNode.segment.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <ContentEditable
              html={this.props.segmentNode.segment.variantDescription}
              disabled={false}
              onChange={this.handleEditTitle}
            />

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Editable
                onChange={this.handleEditText}
                disabled={false}
                html={this.props.segmentNode.runs[0].t}
              />
              <Handle {...provided.dragHandleProps}>
                <Icon name="move" link={true} />
              </Handle>
            </div>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task2;
