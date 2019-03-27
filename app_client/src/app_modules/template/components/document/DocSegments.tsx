import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import CompareArrows from '@material-ui/icons/CompareArrows';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import update from 'immutability-helper';
import { v4 } from 'uuid';

import * as templateState from '../../../../app/redux/state';
import DocSegment from './DocSegment';
import Variants from './Variants';
import {
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

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const BlockContainer = styled.div`
  display: flex;
  flex-flow: row wrap;

  margin: -4px;
  padding: 4px;
  // border: 1px solid lightgrey;
  // border-radius: 2px;
`;

const TaskList = styled.div``;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  display: 'inline',
  padding: 4,
  overflow: 'visible'
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
  variants: segmentSource[][];
  appDispatch: React.Dispatch<any>;
}

const initialState = {
  canDrag: true,
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

const DocSegments: React.SFC<ISectionProps> = props => {
  const [activeSegment, setActiveSegment] = React.useState(initialState);
  const [docBlocks, setDocBlocks] = React.useState(props.blocks);

  const handleClick = (value: segmentSource): void => {
    const isVariant = activeSegment.segment.id === value.segment.id;

    setActiveSegment({
      canDrag: !isVariant,
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
    segmentNode: segmentSource,
    index: number
  ) => {
    const variantIsDefault = segmentNode.segment.variantIsDefault;
    const currentVariants = props.variants[blockOrder];
    // console.log(currentVariants);

    const segment = (isActive: boolean = false) => (
      <SegmentNode
        key={v4()}
        onClick={e => handleClick(segmentNode)}
        variantIsDefault={variantIsDefault}
      >
        <SegmentHover key={v4()} showBackground={isActive}>
          <SegmentHoverFeature className="text-hover-feat">
            <DragHandle />
          </SegmentHoverFeature>
          {segmentNode.runs.map(run => (
            <TextNode key={v4()}> {run.t}</TextNode>
          ))}
        </SegmentHover>
        <VariantCount key={v4()} className="variant-count">
          {currentVariants && currentVariants.length - 1} <CompareArrows />
        </VariantCount>
      </SegmentNode>
    );

    const variant = () => (
      <Variants
        key={v4()}
        segmentVariants={currentVariants}
        onEscapeOutside={handleEscapeOutside}
      />
    );

    if (!variantIsDefault) {
      return null;
    }

    if (!activeSegment || segmentNode.segment.id !== activeSegment.segment.id) {
      return segment(false);
    }

    if (activeSegment.isVariant) {
      console.log(currentVariants);
      return variant();
    } else {
      return segment(true);
    }
  };

  const getSegments = (block: block) => {
    // console.log('rending getSegments');

    if (activeSegment.canDrag) {
      // textSegment drag and drop goes here
      return (
        <BlockContainer>
          <Droppable droppableId={block.id} direction="horizontal">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {block.segments.map((segmentNode, index) => (
                  <DocSegment
                    key={segmentNode.segment.id}
                    index={index}
                    segmentNode={segmentNode}
                    blockOrder={block.order}
                    segmentSources={props.variants}
                    activeSegment={activeSegment}
                    handleClick={handleClick}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </BlockContainer>
      );
    } else {
      // variants drag and drop goes here
      return block.segments.map((segmentNode: segmentSource, index) =>
        getSegment(block.order, segmentNode, index)
      );
    }
  };

  const getDoc = (blocks: block[]): React.ReactNode => {
    const htmlSections = blocks.map(block => {
      switch (block.paragraph.properties.pStyle) {
        case PStyle.Article:
          const titleNode = (
            <TitleNode key={v4()} isTitle={true} background="cornflowerblue">
              {getSegments(block)}
            </TitleNode>
          );
          return titleNode;
        case PStyle.Heading1:
          const sectionNode = (
            <SectionNode key={v4()} background="palevioletred">
              {getSegments(block)}
            </SectionNode>
          );
          return sectionNode;
        case PStyle.Heading2:
          const subSectionNode = (
            <SegmentsNode key={v4()} background="red" indLevel={2}>
              {getSegments(block)}
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
              {getSegments(block)}
            </SegmentsNode>
          );
          return clauseNode;
        case PStyle.Heading4:
          const subClauseNode = (
            <SegmentsNode key={v4()} background="orange" indLevel={6}>
              {getSegments(block)}
            </SegmentsNode>
          );
          return subClauseNode;
        default:
          const normalNode = (
            <SegmentsNode key={v4()} background="orange">
              {getSegments(block)}
            </SegmentsNode>
          );
          return normalNode;
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
      {activeSegment.canDrag && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Container>{getDoc(props.blocks)}</Container>
        </DragDropContext>
      )}

      {!activeSegment.canDrag && getDoc(props.blocks)}

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

export default DocSegments;
