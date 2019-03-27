import * as React from 'react';
import EscapeOutside from 'react-escape-outside';
import CompareArrows from '@material-ui/icons/CompareArrows';
import update from 'immutability-helper';
import { Icon } from 'semantic-ui-react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 } from 'uuid';
import '@atlaskit/css-reset';

import { contextWrapper } from '../../TemplateContext';
import VariantGroup from './VariantGroup';
import VariantInitial from './VariantInitial';
import { StyledVariants, VariantForm, Divider } from './Variants.style';
import { VariantCount } from './Document.style';
import { VariantSchema } from './variantSchema';
import * as templateState from '../../../../app/redux/state';

type column = {
  id: string;
  title: string;
  taskIds: string[];
};

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

type taskType = {
  tasks: segmentSource[];
  columns: column[];
  columnOrder: string[];
};

interface IVariantsProps {
  segmentVariants: segmentSource[];
  appDispatch: React.Dispatch<any>;
  onEscapeOutside?: () => void;
}

interface IVariantsState {
  variantTask: taskType;
}

class Variants extends React.Component<IVariantsProps, IVariantsState> {
  constructor(props: IVariantsProps) {
    super(props);

    const variantTask = new VariantSchema(this.props.segmentVariants);
    variantTask.initVariants();
    console.log(variantTask);

    this.state = {
      variantTask: variantTask as taskType
    };
  }

  public handleAdd = () => {
    this.props.appDispatch({
      type: 'emplate/ADD_TEXTSEGMENT_VARIANT',
      payload: {
        segmentId: this.props.segmentVariants[0].segment.id
      }
    });
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

    const startColomnIndex = this.state.variantTask.columns.findIndex(
      column => column.id === source.droppableId
    );
    const startColomn = this.state.variantTask.columns[startColomnIndex];
    const finishColomnIndex = this.state.variantTask.columns.findIndex(
      column => column.id === destination.droppableId
    );
    const finishColomn = this.state.variantTask.columns[finishColomnIndex];

    if (startColomn === finishColomn) {
      const newTaskIds = Array.from((startColomn as column).taskIds);

      // newTaskIds.splice(source.index, 1);
      // newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = update(startColomn, {
        taskIds: {
          $splice: [[source.index, 1], [destination.index, 0, draggableId]]
        }
      });

      console.log(newColumn);

      const newDataa = update(this.state.variantTask, {
        columns: {
          $splice: [[startColomnIndex, 1], [finishColomnIndex, 0, newColumn]]
        }
      });

      console.log(newDataa);
      debugger;

      const newTaskDataNew = Array.from(this.state.variantTask.columns);

      newTaskDataNew.splice(startColomnIndex, 1);
      newTaskDataNew.splice(startColomnIndex, 0, newColumn);

      const newData = {
        ...this.state.variantTask,
        columns: newTaskDataNew
      };

      console.log(newData);

      // const newData = update(taskVariant, {
      //   columns: {
      //     $splice: [
      //       [startColomnIndex, 1],
      //       [
      //         startColomnIndex,
      //         0,
      //         newColumn as {
      //           id: string;
      //           title: string;
      //           taskIds: string[];
      //         }
      //       ]
      //     ]
      //   }
      // });

      const newState = {
        ...this.state,
        taskVariant: newData
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    console.log('finishColomn');
    const startTaskIds = Array.from(startColomn.taskIds);
    startTaskIds.splice(source.index, 1);
    startTaskIds.splice(0, 0, finishColomn.taskIds[0]);

    const newStartColomn = {
      ...startColomn,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finishColomn.taskIds);
    finishTaskIds.splice(0, 1);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColomn = {
      ...finishColomn,
      taskIds: finishTaskIds
    };

    const newData = update(this.state.variantTask, {
      columns: {
        $splice: [[startColomnIndex, 1], [startColomnIndex, 0, newStartColomn]]
      }
    });

    const newDataa = update(newData, {
      columns: {
        $splice: [
          [finishColomnIndex, 1],
          [finishColomnIndex, 0, newFinishColomn]
        ]
      }
    });

    const newState = {
      ...this.state,
      taskVariant: newDataa
    };

    this.setState(newState);
  };

  public render() {
    const { segmentVariants, onEscapeOutside, ...props } = this.props;
    const { columnOrder, columns, tasks } = this.state.variantTask;

    console.log(columnOrder);
    console.log(columns);
    console.log(tasks);

    const standardVariant = segmentVariants.filter(segmentVariant => {
      return segmentVariant.segment.variantIsDefault;
    });

    const alternatveVariants = segmentVariants.filter(segmentVariant => {
      return !segmentVariant.segment.variantIsDefault;
    });

    const variants = (
      <StyledVariants>
        <span className="enumerate">1.0.1</span>

        {columnOrder.map(columnId => {
          const column = columns.find(
            column => column.id === columnId
          ) as column;

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

          const segmentVariants =
            columnId === 'column_1' ? standardVariant : alternatveVariants;

          const variants = (
            <VariantForm key={v4()}>
              <React.Fragment>
                <Divider>
                  {column.id && column.id === 'column_1'
                    ? standardTitle
                    : variantTitle}

                  <VariantGroup
                    key={v4()}
                    column={column}
                    segmentVariants={segmentVariants}
                  />
                </Divider>
              </React.Fragment>

              {column.id && column.id === 'column_2' && (
                <button onClick={this.handleAdd}>
                  <Icon name="plus circle" />
                  Add Variant
                </button>
              )}
            </VariantForm>
          );

          return variants;
        })}

        <VariantCount className="variant-count">
          {alternatveVariants && alternatveVariants.length} <CompareArrows />
        </VariantCount>
      </StyledVariants>
    );
    return (
      <EscapeOutside onEscapeOutside={onEscapeOutside} key={v4()}>
        <DragDropContext onDragEnd={this.onDragEnd}>{variants}</DragDropContext>
      </EscapeOutside>
    );
  }
}

export default contextWrapper(Variants);
