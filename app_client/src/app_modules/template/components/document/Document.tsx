import * as React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { StyledDocument } from './Document.style';
import { contextWrapper } from '../../TemplateContext';
import Schema from '../../controllers/document/schema';
import { HtmlSections } from './ContentSegments';
import * as templateState from '../../../../app/redux/state';

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

    const { blocks, paragraphs, textSegments, runs } = props.template;
    const schema = new Schema({ blocks, paragraphs, textSegments, runs });
    schema.initTemplate();
    const sections = schema.SortedBlocks as block[];

    this.state = {
      activeSegment: null,
      visible: false,
      template: props.template,
      docData: sections
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

  public renderDoc = (docData: block[]) => {
    return <HtmlSections blocks={docData} />;
  };

  public render() {
    if (!this.state.docData) {
      return 'loading ....';
    }

    const htmlSections = this.renderDoc(this.state.docData);

    return (
      <Grid.Column width={12}>
        <StyledDocument>
          <Segment basic={true}>{htmlSections}</Segment>
          <button
            hidden={true}
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
        </StyledDocument>
      </Grid.Column>
    );
  }
}

export default contextWrapper(TemplateContent);
