import * as React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { HandlerRole } from 'dnd-core';
import { Form, Icon } from 'semantic-ui-react';
import { Editable } from './Variants.style';
import { v4 } from 'uuid';
import ContentEditable from 'react-contenteditable';
import * as templateState from '../../../../app/redux/state';
import * as sortableHoc from 'react-sortable-hoc';
import CompareArrows from '@material-ui/icons/CompareArrows';
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

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" size="small" />
  </span>
));

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
  segmentSources: segmentSource[][];
}
class Task2 extends React.Component<IDndProps> {
  constructor(props) {
    super(props);
  }
  public getSegment = (
    blockOrder: number,
    segmentSource: segmentSource,
    index: number
  ) => {
    const variantIsDefault = segmentSource.segment.variantIsDefault;
    const variants = this.props.segmentSources[blockOrder];

    // console.log(index);

    const handleClick = (value: segmentSource): void => {
      // const isVariant = activeSegment.segment.id === value.segment.id;
      // setActiveSegment({
      //   isActive: true,
      //   isVariant,
      //   segment: value.segment
      // });
      // props.appDispatch({
      //   type: 'TRACK_CURRENT_SEGMENT',
      //   payload: {
      //     id: value.segment.id,
      //     segment: value.segment
      //   }
      // });
    };

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
          {/* {variants && variants.length - 1} <CompareArrows /> */}
        </VariantCount>
      </SegmentNode>
    );

    // const variant = () => (
    //   <Variants
    //     key={v4()}
    //     segmentVariants={variants}
    //     onEscapeOutside={handleEscapeOutside}
    //   />
    // );

    // if (!variantIsDefault) {
    //   return null;
    // }

    // if (
    //   !activeSegment ||
    //   segmentSource.segment.id !== activeSegment.segment.id
    // ) {
    //   return segment(false);
    // }

    // if (activeSegment.isVariant) {
    //   return variant();
    // } else {
    //   return segment(true);
    // }
  };

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
