import * as React from 'react';
import styled from 'styled-components';
import { Form, Icon } from 'semantic-ui-react';
import { Editable } from './Variants.style';

class Variant extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { content } = this.props;

    return (
      <Form.Field>
        <label>1. Standart/Neutral</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Editable contentEditable={true}>{ content }</Editable>
          <Icon link={true} name='move' />
        </div>
      </Form.Field>
    )
  }
}

export default Variant;