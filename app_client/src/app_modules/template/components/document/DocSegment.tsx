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

export const DragHandleA = () => (
  <span>
    <Icon name="move" size="small" />
    <span> this is testing</span>
    <span> more testing</span>
  </span>
);

const Container = styled.span<{ ref: any; isDragging: boolean }>`
  // border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

  display: flex;
  flex-direction: row;
`;

const SegmentContainer = styled.div<{ ref: any; isDragging: boolean }>`
  // border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  // background-color: white;
  // background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
`;

const Handle = styled.span`
  // width: 20px;
  // height: 20px;
  // background-color: orange;
  // border-radius: 4px;
  // margin-right: 8px;
`;

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 2 * 2,
  margin: `0 ${4}px 0 0`,

  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

interface IDocSegmentProps {
  blockOrder: number;
  index: number;
  segmentNode: segmentSource;
  segmentSources: segmentSource[][];
}

interface IDocSegmentState {
  blockOrder: number;
  index: number;
  segmentNode: segmentSource;
  segmentSources: segmentSource[][];
}

class DocSegment extends React.Component<IDocSegmentProps, IDocSegmentState> {
  constructor(props) {
    super(props);

    this.state = {
      blockOrder: this.props.blockOrder,
      index: this.props.index,
      segmentNode: this.props.segmentNode,
      segmentSources: this.props.segmentSources
    };
  }

  public getSegment = () => {
    const variantIsDefault = this.state.segmentNode.segment.variantIsDefault;
    const variants = this.props.segmentSources[this.state.blockOrder];

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
      <SegmentNode
        key={v4()}
        onClick={e => handleClick(this.state.segmentNode)}
      >
        <SegmentHover key={v4()} showBackground={isActive}>
          <SegmentHoverFeature className="text-hover-feat">
            <DragHandle />
          </SegmentHoverFeature>
          {this.state.segmentNode.runs.map(run => (
            <TextNode key={v4()}> {run.t}</TextNode>
          ))}
        </SegmentHover>
        <VariantCount key={v4()} className="variant-count">
          {variants && variants.length - 1} <CompareArrows />
        </VariantCount>
      </SegmentNode>
    );

    const variant = () => (
      // <Variants
      //   key={v4()}
      //   segmentVariants={variants}
      //   onEscapeOutside={handleEscapeOutside}
      // />
      <div>variant</div>
    );

    if (!variantIsDefault) {
      return null;
    }

    // if (
    //   !activeSegment ||
    //   segmentSource.segment.id !== activeSegment.segment.id
    // ) {
    //   return segment(false);
    // }

    return segment(true);

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
    console.log(this.props);
    return (
      <Draggable
        draggableId={this.props.segmentNode.segment.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <SegmentContainer
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.draggableProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <SegmentNode
              key={v4()}
              // onClick={e => handleClick(this.state.segmentNode)}
            >
              <SegmentHover key={v4()} showBackground={false}>
                <SegmentHoverFeature className="text-hover-feat">
                  <Handle {...provided.dragHandleProps}>
                    <Icon name="move" link={true} />
                  </Handle>
                </SegmentHoverFeature>
                {this.state.segmentNode.runs.map(run => (
                  <TextNode key={v4()}> {run.t}</TextNode>
                ))}
              </SegmentHover>
              <VariantCount key={v4()} className="variant-count">
                {/* {variants && variants.length - 1} <CompareArrows /> */}
                {4} <CompareArrows />
              </VariantCount>
            </SegmentNode>
          </SegmentContainer>
        )}
      </Draggable>
    );
  }
}

export default DocSegment;
