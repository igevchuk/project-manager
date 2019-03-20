import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import CompareArrows from '@material-ui/icons/CompareArrows';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DocSegment, { DragHandleA } from './DocSegment';
import update from 'immutability-helper';

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
  Article = 'Title',
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
// }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // flex-flow: column nowrap;
`;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin: 8px;
  border: 4px solid lightgrey;
  border-radius: 2px;
  width: 640px;
`;
const TaskListB = styled.span<{ ref: any; isDraggingOver: boolean }>``;

const TaskList = styled.div``;

const SegmentContainer = styled.div<{ ref: any; isDragging: boolean }>`
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
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 2 * 2,
  margin: `0 ${4}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: 4,
  overflow: 'auto'
});

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
  id: string;
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

const HtmlSections: React.SFC<ISectionProps> = props => {
  const [activeSegment, setActiveSegment] = React.useState(initialState);
  const [docBlocks, setDocBlocks] = React.useState(props.blocks);
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

  const getSegment = (
    blockOrder: number,
    segmentSource: segmentSource,
    index: number
  ) => {
    const variantIsDefault = segmentSource.segment.variantIsDefault;
    const variants = segmentSources[blockOrder];

    // console.log(index);

    const segment = (isActive: boolean = false) => (
      // <Draggable
      //   key={v4()}
      //   draggableId={segmentSource.segment.id}
      //   index={index}
      // >
      //   {(provided, snapshot) => (
      //     <SegmentContainer
      //       {...provided.draggableProps}
      //       ref={provided.innerRef}
      //       isDragging={snapshot.isDragging}
      //     >
      //       <Handle {...provided.dragHandleProps} />
      //       {'asdf'}
      //     </SegmentContainer>
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

  const getDoc = (blocks: block[]): React.ReactNode => {
    // console.log(blocks);
    console.log(docBlocks);

    const htmlSections = blocks.map(block => {
      switch (block.paragraph.properties.pStyle) {
        case PStyle.Article:
          const titleNode = (
            <TitleNode key={v4()} isTitle={true} background="cornflowerblue">
              <BlockContainer>
                <Droppable droppableId={block.id} direction="horizontal">
                  {(provided, snapshot) => (
                    <TaskList
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      {block.segments.map((segmentNode, index) => (
                        // getSegment(block.order, segmentNode, index)
                        <DocSegment
                          blockOrder={block.order}
                          key={segmentNode.segment.id}
                          segmentNode={segmentNode}
                          index={index}
                          segmentSources={segmentSources}
                        />
                      ))}
                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              </BlockContainer>

              {/* {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )} */}
            </TitleNode>
          );
          return titleNode;
        case 'PStyle.Heading1':
          const sectionNode = (
            <SectionNode key={v4()} background="palevioletred">
              <BlockContainer>
                <Droppable droppableId={block.id}>
                  {(provided, snapshot) => (
                    <TaskList
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      {block.segments.map((segmentNode, index) =>
                        getSegment(block.order, segmentNode, index)
                      )}

                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              </BlockContainer>

              {/* {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )} */}
            </SectionNode>
          );
          return sectionNode;
        case 'PStyle.Heading2':
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
        case 'PStyle.Heading4':
          const subClauseNode = (
            <SegmentsNode key={v4()} background="orange" indLevel={6}>
              {block.segments.map((segmentNode, index) =>
                getSegment(block.order, segmentNode, index)
              )}
            </SegmentsNode>
          );
          return subClauseNode;
        default:
          // const normalNode = (
          //   <SegmentsNode key={v4()} background="orange">
          //     {block.segments.map((segmentNode, index) =>
          //       getSegment(block.order, segmentNode, index)
          //     )}
          //   </SegmentsNode>
          // );
          // return normalNode;
          return;
          break;
      }
    });
    return htmlSections;
  };

  const onDragEnd = result => {
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

    const startColomnIndex = docBlocks.findIndex(
      block => block.id === source.droppableId
    );
    const startColomn = docBlocks[startColomnIndex];
    const finishColomnIndex = docBlocks.findIndex(
      block => block.id === destination.droppableId
    );
    const finishColomn = docBlocks[finishColomnIndex];

    if (startColomn === finishColomn) {
      const colSegments = startColomn.segments;
      const draggableSegment = colSegments.filter(
        startSegment => startSegment.segment.id === draggableId
      )[0];

      colSegments.splice(source.index, 1);
      colSegments.splice(destination.index, 0, draggableSegment);

      const newColumn = {
        ...startColomn,
        segments: colSegments
      };

      const newData = update(docBlocks, {
        $splice: [[startColomnIndex, 1], [startColomnIndex, 0, newColumn]]
      });

      setDocBlocks(newData);
      return;
    }

    // Moving from one list to another
    const startSegments = startColomn.segments;

    const draggableSegment = startSegments.filter(
      startSegment => startSegment.segment.id === draggableId
    )[0];

    startSegments.splice(source.index, 1);
    const newStartColomn = {
      ...startColomn,
      segments: startSegments
    };

    const finishSegments = finishColomn.segments;
    finishSegments.splice(destination.index, 0, draggableSegment);
    const newFinishColomn = {
      ...finishColomn,
      segments: finishSegments
    };

    const startNewData = update(docBlocks, {
      $splice: [[startColomnIndex, 1], [startColomnIndex, 0, newStartColomn]]
    });

    const finalData = update(startNewData, {
      $splice: [[finishColomnIndex, 1], [finishColomnIndex, 0, newFinishColomn]]
    });

    setDocBlocks(finalData);
  };

  return (
    <ArticleNode>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>{getDoc(props.blocks)}</Container>
      </DragDropContext>

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

export default HtmlSections;
