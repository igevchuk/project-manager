import * as React from 'react';
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Grid
} from 'semantic-ui-react';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Variants from './Variants';

import {
  StyledDocument,
  TextHover,
  TextHoverFeature,
  TextNode,
  VariantCount
} from './Document.style';

import { v4 } from 'uuid';
import { contextWrapper } from '../../TemplateContext';
import Schema from '../../controllers/document/schema';
import * as visitor from '../../controllers/document/visitor';
import * as strategy from '../../controllers/document/strategy';
import * as abstract from '../../controllers/document/abstract';
import * as schemaInstanc from '../../controllers/document/schema';
import RenderSegments from './ContentSegments';
import * as templateState from '../../../../app/redux/state';
import { instanceOf } from 'prop-types';

const fakeSegments = [
  { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' },
  { id: 2, text: 'Donec venenatis dolor id ex sodales consequat. ' },
  {
    id: 3,
    text:
      'Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. Nullam porttitor lacinia diam, sed ultrices magna fringilla pellentesque. Ut viverra fermentum pretium. Donec at fringilla odio. '
  },
  {
    id: 4,
    text:
      'Praesent euismod dui ut ante fermentum, sed consectetur lacus pretium. Vestibulum ornare sollicitudin lectus at ultrices. '
  },
  { id: 5, text: 'Mauris ultricies pellentesque est vel maximus. ' }
];

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

interface IContentProps {
  template: {
    id: number;
    name: string;
    blocks: templateState.block[];
    paragraphs: templateState.paragraph[];
    textSegments: templateState.textSegment[];
    tables: templateState.table[];
    tableRows: templateState.tableRow[];
    tableCells: templateState.tableCell[];
    runs: templateState.run[];
  };
  dispatch: React.Dispatch<any>;
}

class TemplateContent extends React.Component<IContentProps, any> {
  public docPieces: docPiece[] = [];

  constructor(props: any) {
    super(props);
    this.state = {
      activeSegment: null,
      visible: false,
      template: {},
      docPieces: [
        {
          // blockId: -1,
          // paragraphId: -1,
          // textSegmentId: -1,
          // text: '',
          // run: {}
        }
      ]
    };
  }

  public componentDidMount() {
    this.setState(
      (prevState, props) => ({ template: this.props.template }),
      () => {
        // console.log(this.state.template);
      }
    );
  }

  public handleHideClick = () => this.setState({ visible: false });
  public handleShowClick = () => this.setState({ visible: true });
  public handleSidebarHide = () => this.setState({ visible: false });

  public handleClick = (e: any, segment: any): void => {
    this.setState({ activeSegment: segment });
  };

  public handleEscapeOutside = (): void => {
    this.setState({ activeSegment: null });
  };

  public renderSegment = (segment: any): any => {
    const { activeSegment } = this.state;

    // if (!activeSegment || segment.id !== activeSegment.id) {
    //   return [
    //     // <ContentSegmentDND segment={segment} key={v4()} />,
    //     <ContentSegmentDND key={v4()} />,
    //     <VariantCount key={v4()} className="variant-count">
    //       3 <CompareArrows />
    //     </VariantCount>
    //   ];
    // }

    // return (
    //   <Variants segment={segment} onEscapeOutside={this.handleEscapeOutside} />
    // );
  };

  // public asd = () => {
  //   alert('aaaa');
  // };

  public renderDoca = () => {
    const docPieces: docPiece[] = [];
    const map = new Map();
    for (const item of this.docPieces) {
      if (!map.has(item.id)) {
        map.set(item.id, true); // set any value to Map
        docPieces.push(item);
      }
    }
    // console.log(docPieces);

    return <RenderSegments segments={docPieces} />;

    return <div>ALSKDJF</div>;
    // return result.map(docPiece => {
    //   return (
    //     <div key={docPiece.id}>
    //       {this.renderSegment({ id: docPiece.id, text: docPiece.text })}
    //     </div>
    //   );
    // });
  };

  public renderDoc = (docData: any) => {
    return <RenderSegments segments={docData} />;
    // console.log(docData);

    return <div>ALSKDJF</div>;
    // return result.map(docPiece => {
    //   return (
    //     <div key={docPiece.id}>
    //       {this.renderSegment({ id: docPiece.id, text: docPiece.text })}
    //     </div>
    //   );
    // });
  };

  public getDoc(composite: abstract.TemplateComponent) {
    const childrenComposites = composite.getChildren();

    for (const childComposite of childrenComposites) {
      if (childComposite.metadata.isSegment) {
        const docPiece = {
          id: childComposite.metadata.segment.id,
          blockId: childComposite.metadata.segment.blockId,
          segment: childComposite.metadata.segment,
          variant: childComposite.metadata.variant
        };
        this.docPieces.push(docPiece);
      } else {
        this.getDoc(childComposite);
      }
    }
  }

  public render() {
    const { blocks, paragraphs, textSegments, runs } = this.props.template;

    if (!this.state.template) {
      return 'loading ....';
    }

    // generating Doc data
    const schema = new Schema({ blocks, paragraphs, textSegments, runs });
    schema.initTemplate();
    const docData = schema.SortedBlocks;
    const template = this.renderDoc(docData);
    // console.log(docData);

    return (
      <Grid.Column width={12}>
        <StyledDocument>
          <div>
            <button
              onClick={() =>
                this.props.dispatch({
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

            <Segment basic={true}>
              {/* {fakeSegments.map(segment => this.renderSegment(segment))} */}
              <br />
              {template}
            </Segment>
          </div>
        </StyledDocument>
      </Grid.Column>
    );
  }
}

export default contextWrapper(TemplateContent);
