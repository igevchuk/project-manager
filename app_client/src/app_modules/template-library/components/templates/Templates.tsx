import * as React from 'react';
import StyledTemplates, { HeadingButtonComponent } from './Templates.style';
import Table from '../table/Table';
import Button from '../button/Button';

class Templates extends React.Component<any, object> {
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <StyledTemplates>
        <HeadingButtonComponent>
          <h1> Template Builder</h1>
          <Button>New Template</Button>
        </HeadingButtonComponent>
        <Table />
      </StyledTemplates>
    );
  }
}

export default Templates;
