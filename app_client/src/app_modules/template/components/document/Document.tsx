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
  constructor(props: any) {
    super(props);
    this.state = {
      activeSegment: null,
      visible: false,
      template: {}
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

  public renderDoc = (docData: any) => {
    return <RenderSegments segments={docData} blocks={docData} />;
  };

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
