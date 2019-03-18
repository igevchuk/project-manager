import * as React from 'react';
import EscapeOutside from 'react-escape-outside';
import { Icon } from 'semantic-ui-react';
import CompareArrows from '@material-ui/icons/CompareArrows';
import { v4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';
import update from 'immutability-helper';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import taskData from './../../../__feature__/dnd/initial.data';
import Column from './Column';
import Column2 from './Column.2';

import Variant from './Variant';
import { StyledVariants, VariantForm, Divider } from './Variants.style';
import { VariantCount } from './Document.style';
import { VariantSchema, ITaskType } from './variantSchema';

import * as templateState from '../../../../app/redux/state';

const initialData = {
  tasks: {
    task_1: { id: 'task_1', content: 'Take out the garbage' },
    task_2: { id: 'task_2', content: 'Watch my favorite show' },
    task_3: { id: 'task_3', content: 'Charge my phone' },
    task_4: { id: 'task_4', content: 'Cook dinner' }
  },
  columns: {
    column_1: {
      id: 'column_1',
      title: 'Fallback/Default Language',
      taskIds: ['task_1']
    },
    column_2: {
      id: 'column_2',
      title: 'Variants',
      taskIds: ['task_2', 'task_3', 'task_4']
    }
  },
  columnOrder: ['column_1', 'column_2']
};

type taskType = {
  tasks: {
    task_1: { id: string; content: string };
    task_2: { id: string; content: string };
    task_3: { id: string; content: string };
    task_4: { id: string; content: string };
  };
  columns: {
    column_1: {
      id: string;
      title: string;
      taskIds: string[];
    };
  };
  columnOrder: string[];
};

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};
interface IVariantsProps {
  segmentVariants: segmentSource[];
  onEscapeOutside?: () => void;
}

interface IVariantsState {
  segmentVariants: segmentSource[];
  taskDataNew: ITaskType;
  taskData: taskType;
}

class Variants extends React.Component<IVariantsProps, IVariantsState> {
  constructor(props: IVariantsProps) {
    super(props);

    const variants = new VariantSchema(this.props.segmentVariants);
    variants.initVariants();
    console.log(variants);

    this.state = {
      segmentVariants: props.segmentVariants,
      taskDataNew: variants,
      taskData: initialData
    };
  }

  public onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('oldIndex');

    // this.setState(({ segmentVariants }) => ({
    //   segmentVariants: sortableHoc.arrayMove(
    //     segmentVariants,
    //     oldIndex,
    //     newIndex
    //   )
    // }));
  };

  public handleAdd = () => {
    // const newVariant = {
    //   title: 'New Variant',
    //   text: '',
    //   seq: this.state.variants.length + 1
    // };
    // this.setState({
    //   variants: [...this.state.variants, newVariant]
    // });
  };

  public renderVariantForm = (variant, isDefault) => {
    // console.log(variant);
    return (
      <React.Fragment key={v4()}>
        {isDefault && (
          <Divider>
            <span>
              Fallback/Default Language <Icon name="info circle" />
            </span>
          </Divider>
        )}
        <Variant key={v4()} variant={variant} onUpdate={() => null} />
      </React.Fragment>
    );
  };

  public onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // console.log(draggableId);

    const startColomn = this.state.taskData.columns[source.droppableId];
    const finishColomn = this.state.taskData.columns[destination.droppableId];

    if (startColomn === finishColomn) {
      const newTaskIds = Array.from(startColomn.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColomn,
        taskIds: newTaskIds
      };

      const newData = update(this.state.taskData, {
        columns: {
          [newColumn.id]: {
            $set: newColumn
          }
        }
      });

      const newState = {
        ...this.state,
        taskData: newData
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(startColomn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColomn,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finishColomn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColomn,
      taskIds: finishTaskIds
    };

    const newData = update(this.state.taskData, {
      columns: {
        [newStart.id]: {
          $set: newStart
        },
        [newFinish.id]: {
          $set: newFinish
        }
      }
    });

    const newState = {
      ...this.state,
      taskData: newData
    };

    this.setState(newState);
  };

  public render() {
    const { onEscapeOutside, ...props } = this.props;
    const { segmentVariants } = this.state;

    const standardVariant = segmentVariants.filter(segmentVariant => {
      return segmentVariant.segment.variantIsDefault;
    });

    const restVariants = segmentVariants.filter(segmentVariant => {
      return !segmentVariant.segment.variantIsDefault;
    });

    return (
      <EscapeOutside onEscapeOutside={onEscapeOutside} key={v4()}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <StyledVariants>
            <span className="enumerate">1.0</span>

            {this.state.taskDataNew.columnOrder.map(columnId => {
              const column = this.state.taskDataNew.columns.find(
                column => column.id === columnId
              );

              const standardTitle = (
                <span>
                  Fallback/Default Language <Icon name="info circle" />
                </span>
              );

              const variantTitle = (
                <span>
                  Variants <Icon name="info circle" />
                </span>
              );

              const tasks = (column as any).taskIds.map(taskId => {
                return this.state.taskDataNew.tasks.find(
                  task => (task as any).segment.id === taskId
                );
              });

              const asd = (
                <VariantForm key={v4()}>
                  <React.Fragment>
                    <Divider>
                      {(column as any).id && (column as any).id === 'column_1'
                        ? standardTitle
                        : variantTitle}
                      <Column2
                        key={v4()}
                        column={column as any}
                        tasks={tasks}
                      />
                    </Divider>
                  </React.Fragment>
                </VariantForm>
              );

              return asd;
            })}

            <div>
              {standardVariant[0] && (
                <VariantForm>
                  {this.renderVariantForm(standardVariant[0], true)}
                </VariantForm>
              )}

              {restVariants.length > 0 && (
                <VariantForm>
                  <Divider>
                    <span>
                      Variants <Icon name="info circle" />
                    </span>
                  </Divider>
                  {restVariants.map(variant =>
                    this.renderVariantForm(variant, false)
                  )}
                  <button onClick={this.handleAdd}>
                    <Icon name="plus circle" />
                    Add Variant
                  </button>
                </VariantForm>
              )}
            </div>

            <VariantCount className="variant-count">
              3 <CompareArrows />
            </VariantCount>

            {/* {this.state.taskData.columnOrder.map(columnId => {
              const column = this.state.taskData.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => this.state.taskData.tasks[taskId]
              );
              return <Column key={column.id} column={column} tasks={tasks} />;
            })} */}
          </StyledVariants>
        </DragDropContext>
      </EscapeOutside>
    );
  }
}

export default Variants;
