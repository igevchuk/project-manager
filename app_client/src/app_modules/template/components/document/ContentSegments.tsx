import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import { v4 } from 'uuid';
import * as templateState from '../../../../app/redux/state';

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
  Button1,
  Button2,
  TextNode02,
  VariantCount
} from './Document.style';

type pStyle = 'Title' | 'Title' | 'Title' | 'Title' | 'Title';

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

type block01 = {
  order: number;
  paragraph: {
    id: string;
    ref: {
      blockId: number;
    };
    type: string;
    properties: {
      pStyle?: string;
      jc?: string;
      ind?: number;
    };
    revisionCreatedDateTime?: Date;
    revisionCreatedBy?: string;
  };
  segments: [
    {
      runs: templateState.run[];
      segment: {
        id: string;
        ref: {
          paragraphId: string;
        };
        sequence: number;
        variantGroup: string;
        variantDescription?: string;
        variantIsDefault: boolean;
        text: string;
        revisionCreatedDateTime?: Date;
        revisionCreatedBy?: string;
        properties?: {};
      };
    }
  ];
};

type block = {
  order: number;
  paragraph: templateState.paragraph;
  segments: [
    {
      runs: templateState.run[];
      segment: templateState.textSegment;
    }
  ];
};

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

type templateModel = {
  order: number;
  paragraph: {};
  segments: [{}];
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

      const aaaa = <div key={key}>aaaa</div>;

      let redering = <></>;

      const renderTextSegments = segments.map(paragraph => {
        // console.log(paragraph.segment);
        // debugger;
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
              return null;
            }

            redering = (
              <div>
                {paragraph.segment.runs.map(run => {
                  const asd = (
                    <TextNode key={run.id} className="text-node">{`  ${
                      run.t
                    }`}</TextNode>
                  );
                  return asd;
                })}
              </div>
            );

            break;
          case 'Heading4':
            if (paragraph.segment.runs.length === 0) {
              return <div key={paragraph.id}>{''}</div>;
            }

            redering = (
              <div>
                {paragraph.segment.runs.map(run => {
                  const asd = (
                    <TextNode key={run.id} className="text-node">{`  ${
                      run.t
                    }`}</TextNode>
                  );
                  return asd;
                })}
              </div>
            );

            break;
          default:
            if (paragraph.segment.runs.length === 0) {
              return <div key={paragraph.id}>{''}</div>;
            }

            redering = (
              <div>
                {paragraph.segment.runs.map(run => {
                  const asd = (
                    <TextNode key={run.id} className="text-node">{`  ${
                      run.t
                    }`}</TextNode>
                  );
                  return asd;
                })}
              </div>
            );

            break;
        }

        return redering;
      });

      // each block
      return renderTextSegments;
    });

    return <div>{grpTextsegments}</div>;
  };

  public getDocs = (blocks: block[]): React.ReactNode => {
    const asd = blocks.map(block => {
      // console.log(block.segments);

      switch (block.paragraph.properties.pStyle) {
        case 'Title':
          console.log('block.segments');

          if (!block.segments) {
            return null;
          }

          const aa = (
            <div key={block.order}>
              {block.segments.map(segment => {
                const sredering = (
                  <div>
                    {segment.runs.map(run => {
                      const asd = (
                        <TextNode key={run.id} className="text-node">{`  ${
                          run.t
                        }`}</TextNode>
                      );
                      return asd;
                    })}
                  </div>
                );
              })}
            </div>
          );

          // console.log(aa);

          return aa;
          break;
        case 'Heading 1':
          // return <h1 key={block.order}>{block.paragraph.properties.pStyle}</h1>;
          break;
        // if (paragraph.segment.runs.length === 0) {
        //   return <div key={paragraph.id}>{''}</div>;
        // }

        // let resultasd = '';
        // for (const run of paragraph.segment.runs) {
        //   // result = ReactHtmlParser(result + `<span>${run.t}</span>`);
        //   resultasd = resultasd + ' ' + `${run.t}`;
        // }

        // redering = <h1 key={paragraph.id}>{resultasd}</h1>;

        case 'Heading 2':
          // return <h1 key={block.order}>{block.paragraph.properties.pStyle}</h1>;
          break;

        default:
          break;
        // if (paragraph.segment.runs.length === 0) {
        //   return <div key={paragraph.id}>{''}</div>;
        // }

        // redering = (
        //   <div>
        //     {paragraph.segment.runs.map(run => {
        //       const asd = (
        //         <TextNode key={run.id} className="text-node">{`  ${
        //           run.t
        //         }`}</TextNode>
        //       );
        //       return asd;
        //     })}
        //   </div>
        // );
      }
    });
    // console.log(asd);
    return asd;
  };

  ////////
  //
  //
  // switch (block.paragraph.properties.pStyle) {
  //   case 'Title':
  //     redering = (
  //       <h1 key={block.sequence}>{block.paragraph.properties.pStyle}</h1>
  //     );

  //     //    redering = (
  //     //   <div>
  //     //     {paragraph.segment.runs.map(run => {
  //     //       const asd = (
  //     //         <TextNode key={run.id} className="text-node">{`  ${
  //     //           run.t
  //     //         }`}</TextNode>
  //     //       );
  //     //       return asd;
  //     //     })}
  //     //   </div>
  //     // );

  //     break;
  //   case 'Heading1':
  //     // redering = <h1 key={paragraph.id}>ss</h1>;

  //     // if (paragraph.segment.runs.length === 0) {
  //     //   return <div key={paragraph.id}>{''}</div>;
  //     // }

  //     // let resultasd = '';
  //     // for (const run of paragraph.segment.runs) {
  //     //   // result = ReactHtmlParser(result + `<span>${run.t}</span>`);
  //     //   resultasd = resultasd + ' ' + `${run.t}`;
  //     // }

  //     // redering = <h1 key={paragraph.id}>{resultasd}</h1>;

  //     break;
  //   //   case 'Heading2':
  //   //     // redering = <h2 key={paragraph.id}>{'h2'}</h2>;

  //   //     if (paragraph.segment.runs.length === 0) {
  //   //       return <div key={paragraph.id}>{''}</div>;
  //   //     }

  //   //     let resultad = '';
  //   //     for (const run of paragraph.segment.runs) {
  //   //       // result = ReactHtmlParser(result + `<span>${run.t}</span>`);
  //   //       resultad = resultad + ' ' + `${run.t}`;
  //   //     }

  //   //     redering = <h2 key={paragraph.id}>{resultad}</h2>;

  //   //     break;
  //   //   case 'Heading3':
  //   //     if (paragraph.segment.runs.length === 0) {
  //   //       return null;
  //   //     }

  //   //     redering = (
  //   //       <div>
  //   //         {paragraph.segment.runs.map(run => {
  //   //           const asd = (
  //   //             <TextNode key={run.id} className="text-node">{`  ${
  //   //               run.t
  //   //             }`}</TextNode>
  //   //           );
  //   //           return asd;
  //   //         })}
  //   //       </div>
  //   //     );

  //   //     break;
  //   //   case 'Heading4':
  //   //     if (paragraph.segment.runs.length === 0) {
  //   //       return <div key={paragraph.id}>{''}</div>;
  //   //     }

  //   //     redering = (
  //   //       <div>
  //   //         {paragraph.segment.runs.map(run => {
  //   //           const asd = (
  //   //             <TextNode key={run.id} className="text-node">{`  ${
  //   //               run.t
  //   //             }`}</TextNode>
  //   //           );
  //   //           return asd;
  //   //         })}
  //   //       </div>
  //   //     );

  //   //     break;
  //   default:
  //     // if (paragraph.segment.runs.length === 0) {
  //     //   return <div key={paragraph.id}>{''}</div>;
  //     // }

  //     // redering = (
  //     //   <div>
  //     //     {paragraph.segment.runs.map(run => {
  //     //       const asd = (
  //     //         <TextNode key={run.id} className="text-node">{`  ${
  //     //           run.t
  //     //         }`}</TextNode>
  //     //       );
  //     //       return asd;
  //     //     })}
  //     //   </div>
  //     // );

  //     break;
  // }
  // });

  public render() {
    console.log(this.props.blocks);
    const doc = this.getDocs(this.props.blocks);

    // console.log(doc);
    return <div>{doc}</div>;

    return (
      <div>
        <Button1 selected={true}>this is testing</Button1>
        <TextNode02 color={'orange'} border={4}>
          aaaaa
        </TextNode02>
      </div>
    );
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
