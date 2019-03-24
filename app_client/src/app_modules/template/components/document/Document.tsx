import * as React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { StyledDocument } from './Document.style';
import { contextWrapper } from '../../TemplateContext';
import DocSegments from './DocSegments';
import * as templateState from '../../../../app/redux/state';

interface IContentProps {
  blocks: templateState.renderBlock[];
  isOutline: boolean;
  appDispatch: React.Dispatch<any>;
  templateDispatch?: React.Dispatch<any>;
  activeSeg: string;
}

class TemplateContent extends React.PureComponent<IContentProps> {
  constructor(props: any) {
    super(props);
  }

  public renderDoc = (blocks: templateState.renderBlock[]) => {
    return <DocSegments blocks={blocks} appDispatch={this.props.appDispatch} />;
  };

  public render() {
    if (!this.props.blocks) {
      return 'loading ....';
    }

    const htmlSections = this.renderDoc(this.props.blocks);

    return (
      <div>
        {this.props.isOutline && <Segment basic={true}>{htmlSections}</Segment>}
        {!this.props.isOutline && (
          <Grid.Column width={12}>
            <StyledDocument>
              <Segment basic={true}>{htmlSections}</Segment>
              <button
                hidden={false}
                onClick={() =>
                  this.props.appDispatch({
                    type: 'FETCH_FORM_FULFILLED',
                    payload: {
                      id: '722d4399-12cb-497f-8e29-5f1dc08b0230',
                      name: 'this is name asd'
                    }
                  })
                }
              >
                +
              </button>
            </StyledDocument>
          </Grid.Column>
        )}
      </div>
    );
  }
}

export default contextWrapper(TemplateContent);
