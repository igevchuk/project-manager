import * as React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { StyledDocument } from './Document.style';
import { contextWrapper } from '../../TemplateContext';
import DocSegments from './DocSegments';
import * as templateState from '../../../../app/redux/state';

interface IContentProps {
  isOutline: boolean;
  templateState: templateState.appState;
  appDispatch: React.Dispatch<any>;
  templateDispatch?: React.Dispatch<any>;
}

class TemplateContent extends React.PureComponent<IContentProps> {
  constructor(props: any) {
    super(props);
  }

  public renderDoc = () => {
    return (
      <DocSegments
        blocks={this.props.templateState.renderBlocks}
        appDispatch={this.props.appDispatch}
      />
    );
  };

  public render() {
    const htmlSections = this.renderDoc();

    return (
      <div>
        {this.props.isOutline && <Segment basic={true}>{htmlSections}</Segment>}
        {!this.props.isOutline && (
          <Grid.Column width={12}>
            <StyledDocument>
              <Segment basic={true}>{htmlSections}</Segment>
            </StyledDocument>
          </Grid.Column>
        )}
      </div>
    );
  }
}

export default contextWrapper(TemplateContent);
