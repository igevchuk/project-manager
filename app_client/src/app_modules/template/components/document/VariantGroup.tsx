import * as React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import { contextWrapper } from '../../TemplateContext';
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

type column = {
  id: string;
  title: string;
  taskIds: string[];
};

interface IVariantGroupProps {
  column: column;
  segmentVariants: segmentSource[];
}

const VariantGroup: React.SFC<IVariantGroupProps> = props => {
  return (
    <Droppable droppableId={props.column.id}>
      {(provided, snapshot) => (
        <TaskList
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {props.segmentVariants.map((segmentVariant, index) => (
            <VariantDnd key={index} index={index} variant={segmentVariant} />
          ))}
          {provided.placeholder}
        </TaskList>
      )}
    </Droppable>
  );
};

export default contextWrapper(VariantGroup);
