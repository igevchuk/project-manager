import * as React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { StyledDocument } from './Document.style';
import { contextWrapper } from '../../TemplateContext';
import Schema from '../../controllers/document/schema';
import { HtmlSections } from './DocSegments';

import DragDropByHandle from '../../../__feature__/DragDropByHandle';

import * as templateState from '../../../../app/redux/state';
import * as actions from './../../redux/actions';

// defining rendering block which is not the same as the block from backend
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

type template = {
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
interface IContentProps {
  template: template;
  blocks: templateState.renderBlock[];
  isOutline: boolean;
  appDispatch: React.Dispatch<any>;
  templateDispatch?: React.Dispatch<any>;
}

interface IDocState {
  renewSchema: boolean;
  activeSegment: null;
  visible: boolean;
  template: template;
  isOutline: boolean;
  // docData: block[];
}

class TemplateContent extends React.PureComponent<IContentProps, IDocState> {
  constructor(props: any) {
    super(props);

    this.state = {
      renewSchema: false,
      activeSegment: null,
      visible: false,
      template: this.props.template,
      isOutline: this.props.isOutline
      // docData: this.rederedBlocks()
    };
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

  public renderDoc = (blocks: block[]) => {
    return (
      <HtmlSections blocks={blocks} appDispatch={this.props.appDispatch} />
    );
  };

  public render() {
    if (!this.props.blocks) {
      return 'loading ....';
    }

    // console.log(this.props.blocks);

    const htmlSections = this.renderDoc(this.props.blocks);

    return (
      <div>
        {this.state.isOutline && <Segment basic={true}>{htmlSections}</Segment>}
        {!this.state.isOutline && (
          <Grid.Column width={12}>
            <StyledDocument>
              <Segment basic={true}>{htmlSections}</Segment>
              <button
                hidden={true}
                onClick={() =>
                  this.props.appDispatch({
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
              {/* <DragDropByHandle /> */}
            </StyledDocument>
          </Grid.Column>
        )}
      </div>
    );
  }
}

export default contextWrapper(TemplateContent);
