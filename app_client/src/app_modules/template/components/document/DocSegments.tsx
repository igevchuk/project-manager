import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import CompareArrows from '@material-ui/icons/CompareArrows';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task1 from './Task.1';

import { v4 } from 'uuid';
import * as templateState from '../../../../app/redux/state';
import Variants from './Variants';
import {
  TextHover,
  TextHoverFeature,
  TextNode,
  ArticleNode,
  TitleNode,
  SectionNode,
  SegmentsNode,
  SegmentNode,
  SegmentHover,
  SegmentHoverFeature,
  VariantCount
} from './Document.style';

enum PStyle {
  Articl = 'Title',
  Heading1 = 'Heading 1',
  Heading2 = 'Heading 2',
  Heading3 = 'Heading 3',
  Heading4 = 'Heading 4',
  NoIndent = 'No Indent'
}

// export interface ITaskTypeA {
//   tasks: segmentSource[];
//   columns: column[];
//   columnOrder: string[];
//
//   segments: segmentSource[];
//   blocks: block[];
//   columnOrder: string[];
// }
const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" size="small" />
  </span>
));

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

type block = {
  order: number;
  paragraph: templateState.paragraph;
  segments: segmentSource[];
};

interface ISectionProps {
  blocks: block[];
  appDispatch: React.Dispatch<any>;
}

const initialState = {
  isActive: false,
  isVariant: false,
  segment: {
    id: '',
    ref: {},
    sequence: -1,
    variantGroup: '',
    variantIsDefault: false
  }
};

export const HtmlSections: React.SFC<ISectionProps> = props => {
  const [activeSegment, setActiveSegment] = React.useState(initialState);
  const [segmentSources, setSegmentSources] = React.useState(
    [] as segmentSource[][]
  );

  React.useEffect(() => {
    const sources: segmentSource[][] = [];
    if (segmentSources.length === 0) {
      props.blocks.map(block => {
        sources.push(block.segments);
      });

      setSegmentSources(sources);
    }
  });

  const handleClick = (value: segmentSource): void => {
    const isVariant = activeSegment.segment.id === value.segment.id;

    setActiveSegment({
      isActive: true,
      isVariant,
      segment: value.segment
    });

    props.appDispatch({
      type: 'TRACK_CURRENT_SEGMENT',
      payload: {
        id: value.segment.id,
        segment: value.segment
      }
    });
  };

  const handleEscapeOutside = (): void => {
    setActiveSegment(initialState);
  };

  const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
    return <div>{children}</div>;
  });

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

  const getSegment = (
    blockOrder: number,
    segmentSource: segmentSource,
    index: number
  ) => {
    const variantIsDefault = segmentSource.segment.variantIsDefault;
    const variants = segmentSources[blockOrder];

    const segment = (isActive: boolean = false) => (
      // <Draggable
      //   draggableId={segmentSource.segment.id}
      //   index={index}
      //   key={v4()}
      // >
      //   {(provided, snapshot) => (
      //     <Container
      //       {...provided.draggableProps}
      //       ref={provided.innerRef}
      //       isDragging={snapshot.isDragging}
      //     >
      //       <SegmentNode key={v4()} onClick={e => handleClick(segmentSource)}>
      //         <SegmentHover key={v4()} showBackground={isActive}>
      //           <SegmentHoverFeature className="text-hover-feat">
      //             {/* <DragHandle /> */}
      //             <Handle {...provided.dragHandleProps}>
      //               <Icon name="move" link={true} />
      //             </Handle>
      //           </SegmentHoverFeature>
      //           {segmentSource.runs.map(run => (
      //             <TextNode key={v4()}> {run.t}</TextNode>
      //           ))}
      //         </SegmentHover>
      //         <VariantCount key={v4()} className="variant-count">
      //           {variants && variants.length - 1} <CompareArrows />
      //         </VariantCount>
      //       </SegmentNode>
      //     </Container>
      //   )}
      // </Draggable>

      <SegmentNode key={v4()} onClick={e => handleClick(segmentSource)}>
        <SegmentHover key={v4()} showBackground={isActive}>
          <SegmentHoverFeature className="text-hover-feat">
            <DragHandle />
          </SegmentHoverFeature>
          {segmentSource.runs.map(run => (
            <TextNode key={v4()}> {run.t}</TextNode>
          ))}
        </SegmentHover>
        <VariantCount key={v4()} className="variant-count">
          {variants && variants.length - 1} <CompareArrows />
        </VariantCount>
      </SegmentNode>
    );

    const variant = () => (
      <Variants
        key={v4()}
        segmentVariants={variants}
        onEscapeOutside={handleEscapeOutside}
      />
    );

    if (!variantIsDefault) {
      return null;
    }

    if (
      !activeSegment ||
      segmentSource.segment.id !== activeSegment.segment.id
    ) {
      return segment(false);
    }

    if (activeSegment.isVariant) {
      return variant();
    } else {
      return segment(true);
    }
  };

  const TaskList = styled.span<{ ref: any; isDraggingOver: boolean }>``;

  const getDoc = (blocks: block[]): React.ReactNode => {
    // console.log(blocks);
    const htmlSections = blocks.map(block => {
      switch (block.paragraph.properties.pStyle) {
        case PStyle.Articl:
          const titleNode = (
            <TitleNode key={v4()} isTitle={true} background="cornflowerblue">
              {/* <Droppable droppableId={block.paragraph.id}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {block.segments.map((segmentNode, index) =>
                      getSegment(block.order, segmentNode, index)
                    )}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable> */}
              {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )}
            </TitleNode>
          );
          return titleNode;
        case PStyle.Heading1:
          const sectionNode = (
            <SectionNode key={v4()} background="palevioletred">
              {/* <Droppable droppableId={block.paragraph.id}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {block.segments.map((segmentNode, index) =>
                      getSegment(block.order, segmentNode, index)
                    )}

                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable> */}
              {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )}
            </SectionNode>
          );
          return sectionNode;
        case PStyle.Heading2:
          const subSectionNode = (
            <SegmentsNode key={v4()} background="red" indLevel={2}>
              {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )}
            </SegmentsNode>
          );
          return subSectionNode;
        case PStyle.Heading3:
          const clauseNode = (
            <SegmentsNode
              key={v4()}
              background={'rgb(159,168,218)'}
              indLevel={4}
            >
              {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )}
            </SegmentsNode>
          );
          return clauseNode;
        case PStyle.Heading4:
          const subClauseNode = (
            <SegmentsNode key={v4()} background="orange" indLevel={6}>
              {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )}
            </SegmentsNode>
          );
          return subClauseNode;
        default:
          const normalNode = (
            <SegmentsNode key={v4()} background="orange">
              {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )}
            </SegmentsNode>
          );
          return normalNode;
          return;
          break;
      }
    });
    return htmlSections;
  };

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    console.log(result);
    debugger;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // const startColomnIndex = this.state.taskDataNew.columns.findIndex(
    //   column => column.id === source.droppableId
    // );
    // const startColomn = this.state.taskDataNew.columns[startColomnIndex];
    // const finishColomnIndex = this.state.taskDataNew.columns.findIndex(
    //   column => column.id === destination.droppableId
    // );
    // const finishColomn = this.state.taskDataNew.columns[finishColomnIndex];

    // if (startColomn === finishColomn) {
    //   const newTaskIds = Array.from((startColomn as any).taskIds);

    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...startColomn,
    //     taskIds: newTaskIds
    //   };

    //   const newData = update(this.state.taskDataNew, {
    //     columns: {
    //       $splice: [
    //         [startColomnIndex, 1],
    //         [startColomnIndex, 0, newColumn as any]
    //       ]
    //     }
    //   });

    //   const newState = {
    //     ...this.state,
    //     taskDataNew: newData
    //   };

    //   this.setState(newState);
    //   return;
    // }

    // // Moving from one list to another
    // console.log(finishColomn);
    // const startTaskIds = Array.from(startColomn.taskIds);
    // startTaskIds.splice(source.index, 1);
    // startTaskIds.splice(0, 0, finishColomn.taskIds[0]);

    // const newStartColomn = {
    //   ...startColomn,
    //   taskIds: startTaskIds
    // };

    // const finishTaskIds = Array.from(finishColomn.taskIds);
    // finishTaskIds.splice(0, 1);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinishColomn = {
    //   ...finishColomn,
    //   taskIds: finishTaskIds
    // };

    // const newData = update(this.state.taskDataNew, {
    //   columns: {
    //     $splice: [[startColomnIndex, 1], [startColomnIndex, 0, newStartColomn]]
    //   }
    // });

    // const newDataa = update(newData, {
    //   columns: {
    //     $splice: [
    //       [finishColomnIndex, 1],
    //       [finishColomnIndex, 0, newFinishColomn]
    //     ]
    //   }
    // });

    // const newState = {
    //   ...this.state,
    //   taskDataNew: newDataa
    // };

    // this.setState(newState);
  };

  return (
    <ArticleNode>
      <DragDropContext onDragEnd={onDragEnd}>
        {getDoc(props.blocks)}
      </DragDropContext>

      {/* {getDoc(props.blocks)} */}
      <button
        hidden={true}
        onClick={() =>
          props.appDispatch({
            type: 'FETCH_FORM_FULFILLED',
            payload: {
              id: 114,
              name: 'this is name'
            }
          })
        }
      >
        +
      </button>
    </ArticleNode>
  );
};

/////////////////////

const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

type docPiece = {
  id: string;
  blockId: number;
  segment: {
    id: string;
    blockId?: number;
    paragraphId?: string;
    text: string;
    run?: {};
    pStyle?: string;
  };
  variant: {
    id: string;
    ref?: {
      paragraphId?: string;
    };
    sequence?: number;
    type?: string;
    variantGroup?: string;
    variantDescription?: string;
    variantIsDefault?: boolean;
    text?: string;
    revisionCreatedDateTime?: Date;
    revisionCreatedBy?: string;
    properties?: {};
  };
};

interface ISegmentProps {
  blocks: block[];
}

interface ISegmentState {
  segments: docPiece[];
}

class SegmentsComponent extends React.PureComponent<
  ISegmentProps,
  ISegmentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      segments: []
    };
  }

  public handleClick = (e: any, value: any): void => {
    // console.log(value);
  };

  public onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex);
    this.setState(({ segments }) => ({
      segments: sortableHoc.arrayMove(segments, oldIndex, newIndex)
    }));
  };

  public groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item]
      }),
      {}
    );

  public render() {
    return <div>{'doc'}</div>;
  }
}

export default SegmentsComponent;
