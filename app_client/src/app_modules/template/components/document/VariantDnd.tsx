import * as React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Form, Icon } from 'semantic-ui-react';
import ContentEditable from 'react-contenteditable';

import { Editable } from './Variants.style';
import { textVariant } from '../../../../app/redux/state';
import * as templateState from '../../../../app/redux/state';

const Container = styled.div<{ ref: any; isDragging: boolean }>`
  // border: 1px solid lightgrey;
  // border-radius: 2px;
  padding: -0.4px;
  margin-bottom: 4px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : '#f5f5f5')};
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

interface IVariantProps {
  variant: segmentSource;
  onUpdate: (textVariant: textVariant) => void;
}

interface IVariantDndProps {
  task: { id: string; content: string };
  variant: segmentSource;
  index: number;
}
class VariantDnd extends React.PureComponent<IVariantDndProps> {
  constructor(props) {
    super(props);
  }

  public handleEditTitle = ({ target }) => {
    alert('ssss');
    // const { variant, onUpdate } = this.props;
    // const updatedVariant = { ...variant, title: target.textContent };
    // onUpdate(updatedVariant);
  };

  public handleEditText = ({ target }) => {
    alert('dddd');
    // const { variant, onUpdate } = this.props;
    // const updatedVariant = { ...variant, title: target.innerHTML };
    // onUpdate(updatedVariant);
  };

  public render() {
    return (
      <Draggable
        draggableId={this.props.variant.segment.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Form.Field>
              <ContentEditable
                html={this.props.variant.segment.variantDescription}
                disabled={false}
                onChange={this.handleEditTitle}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Editable
                  onChange={this.handleEditText}
                  disabled={false}
                  html={this.props.variant.runs[0].t}
                />
                <Handle {...provided.dragHandleProps}>
                  <Icon name="move" link={true} />
                </Handle>
              </div>
            </Form.Field>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default VariantDnd;
