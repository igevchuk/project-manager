import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import { v4 } from 'uuid';

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from 'react-html-parser';

import Variants from './Variants';
import {
  StyledDocument,
  TextHover,
  TextHoverFeature,
  TextNode,
  VariantCount
} from './Document.style';

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" size="small" />
  </span>
));

const SortableItem = sortableHoc.SortableElement(
  ({ value }: { value: { id: number; text: string } }) => {
    const [activeSegment, setActiveSegment] = React.useState({
      id: -1,
      text: ''
    });
    const segmentVariants = [
      { id: 1, text: 'text01 asd', title: 'text01', sequence: 1 },
      { id: 2, text: 'text02 dsa', title: 'text02', sequence: 2 },
      { id: 3, text: 'text03 cde', title: 'text03', sequence: 3 },
      { id: 4, text: 'text04 rdx', title: 'text04', sequence: 4 }
    ]; // this.getTextVariants(segment);

    if (!activeSegment || value.id !== activeSegment.id) {
      return (
        <div>
          <TextHover key={v4()} onClick={() => setActiveSegment(value)}>
            <TextHoverFeature className="text-hover-feat">
              <DragHandle />
            </TextHoverFeature>
            <TextNode className="text-node">{value.text}</TextNode>
          </TextHover>
        </div>
      );
    }

    return (
      <Variants
        segmentId={value.id}
        textVariants={segmentVariants}
        onEscapeOutside={() => setActiveSegment({ id: -1, text: '' })}
      />
    );
  }
);

const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

type segment = {
  id: number;
  text: string;
};

type docPiece = {
  id: number;
  segment: {
    id: number;
    blockId?: number;
    paragraphId?: number;
    text: string;
    run?: {};
    pStyle?: string;
  };
  variant: {
    id: number;
    ref?: {
      paragraphId?: number;
    };
    sequence?: number;
    type?: string;
    variantGroup?: number;
    variantType?: string;
    variantIsDefault?: boolean;
    text?: string;
    revision?: number;
    revisionCreatedDateTime?: Date;
    revisionCreatedBy?: string;
  };
};

interface ISegmentProps {
  segments: docPiece[];
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
      segments: this.props.segments
    };
  }

  public handleClick = (e: any, value: any): void => {
    console.log(value);
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

  public getDoc = (): React.ReactNode => {
    const groupedTextsegments = this.groupBy(this.state.segments, 'blockId');
    const keys = Object.keys(groupedTextsegments);

    // console.log(groupedTextsegments);

    const grpTextsegments = keys.map(key => {
      const segments = groupedTextsegments[key];
      // console.log(segments);

      let redering = <></>;

      const renderTextSegments = segments.map(paragraph => {
        console.log(paragraph.segment);
        debugger;
        switch (paragraph.segment.pStyle) {
          case 'Heading1':
            // redering = <h1 key={paragraph.id}>ss</h1>;

            if (paragraph.segment.runs.length === 0) {
              return <div key={paragraph.id}>{''}</div>;
            }

            let resultasd = '';
            for (const run of paragraph.segment.runs) {
              // result = ReactHtmlParser(result + `<span>${run.t}</span>`);
              resultasd = resultasd + ' ' + `${run.t}`;
            }

            redering = <h1 key={paragraph.id}>{resultasd}</h1>;

            break;
          case 'Heading2':
            // redering = <h2 key={paragraph.id}>{'h2'}</h2>;

            if (paragraph.segment.runs.length === 0) {
              return <div key={paragraph.id}>{''}</div>;
            }

            let resultad = '';
            for (const run of paragraph.segment.runs) {
              // result = ReactHtmlParser(result + `<span>${run.t}</span>`);
              resultad = resultad + ' ' + `${run.t}`;
            }

            redering = <h2 key={paragraph.id}>{resultad}</h2>;

            break;
          case 'Heading3':
            if (paragraph.segment.runs.length === 0) {
              return <div key={paragraph.id}>{''}</div>;
            }

            let result = '';
            for (const run of paragraph.segment.runs) {
              // result = ReactHtmlParser(result + `<span>${run.t}</span>`);
              result = result + ' ==== ' + `${run.t}`;
            }

            redering = <div key={paragraph.id}>{result}</div>;

            break;
          case 'Heading4':
            if (paragraph.segment.runs.length === 0) {
              return <div key={paragraph.id}>{''}</div>;
            }

            let resulta = '';
            for (const run of paragraph.segment.runs) {
              resulta = resulta + ' ==== ' + `${run.t}`;
            }

            redering = <div key={paragraph.id}>{resulta}</div>;
            break;
          default:
            if (paragraph.segment.runs.length === 0) {
              return <div key={paragraph.id}>{''}</div>;
            }

            let resultas = '';
            for (const run of paragraph.segment.runs) {
              resultas = resultas + ' ==== ' + `<span>${run.t}</span>`;
            }

            redering = <div key={paragraph.id}>{resultas}</div>;
            break;
        }

        return redering;
      });

      // each block
      return renderTextSegments;
    });

    return <div>{grpTextsegments}</div>;
  };

  public render() {
    const asd = this.getDoc();

    return <div>{asd}</div>;
    // return (
    //   <SortableContainer onSortEnd={this.onSortEnd} useDragHandle={true}>
    //     {segments.map((segment, index) => (
    //       <SortableItem key={`item-${index}`} index={index} value={segment} />
    //     ))}
    //   </SortableContainer>
    // );
  }
}

export default SegmentsComponent;
