import * as React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Form, Icon } from 'semantic-ui-react';
import { v4 } from 'uuid';
// import { Editable } from './Variants.style';
// import ContentEditable from 'react-contenteditable';
import * as templateState from '../../../../app/redux/state';
import CompareArrows from '@material-ui/icons/CompareArrows';

import {
  TextNode,
  SegmentNode,
  SegmentHover,
  SegmentHoverFeature,
  VariantCount
} from './Document.style';

const SegmentContainer = styled.span<{ ref: any; isDragging: boolean }>`
  // keep it for testing
  // border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  // background-color: white;
  // background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  // display: flex;
`;

// keep it
const Handle = styled.span`
  // width: 20px;
  // height: 20px;
  // background-color: orange;
  // border-radius: 4px;
  // margin-right: 8px;
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  // make the items look a bit nicer
  userSelect: 'none',
  padding: 2 * 2,
  margin: `0 ${4}px 0 0`,

  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',
  // styles we need to apply on draggables
  ...draggableStyle
});

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

type activeSegment = {
  canDrag: boolean;
  isActive: boolean;
  isVariant: boolean;
  segment: {
    id: string;
    ref: {};
    sequence: number;
    variantGroup: string;
    variantIsDefault: boolean;
  };
};
interface IDocSegmentProps {
  blockOrder: number;
  index: number;
  segmentNode: segmentSource;
  segmentSources: segmentSource[][];
  activeSegment: activeSegment;
  handleClick: (value: segmentSource) => void;
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

  public getSegment = provided => {
    const variantIsDefault = this.state.segmentNode.segment.variantIsDefault;
    const variants = this.props.segmentSources[this.state.blockOrder];

    const segment = (isActive: boolean = false) => (
      <SegmentNode
        variantIsDefault={variantIsDefault}
        key={v4()}
        onClick={e => this.props.handleClick(this.state.segmentNode)}
      >
        <SegmentHover key={v4()} showBackground={isActive}>
          <SegmentHoverFeature className="text-hover-feat">
            <Handle {...provided.dragHandleProps}>
              <Icon name="move" link={true} />
            </Handle>
          </SegmentHoverFeature>
          {this.state.segmentNode.runs.map(run => (
            <TextNode key={v4()}>{run.t.trim()}</TextNode>
          ))}
        </SegmentHover>
        <VariantCount key={v4()} className="variant-count">
          {variants && variants.length - 1} <CompareArrows />
        </VariantCount>
      </SegmentNode>
    );

    if (
      !this.props.activeSegment ||
      this.state.segmentNode.segment.id !== this.props.activeSegment.segment.id
    ) {
      return segment(false);
    }

    return segment(true);
  };

  public render() {
    // console.log(this.props);
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
            {this.getSegment(provided)}
          </SegmentContainer>
        )}
      </Draggable>
    );
  }
}

export default DocSegment;
