import * as React from 'react';
import styled from 'styled-components';
import { Form, Icon } from 'semantic-ui-react';
import { Editable } from './Variants.style';
import { textVariant } from '../../../../app/redux/state';
import * as sortableHoc from 'react-sortable-hoc';

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" link={true} />
  </span>
));

interface IVariantProps {
  variant: textVariant;
  onUpdate: (textVariant: textVariant) => void;
}

class Variant extends React.Component<IVariantProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public getTitle = title => {
    return 'ssss'; // title.trim() || 'New Variant';
  };

  public handleEditTitle = ({ target }) => {
    const { variant, onUpdate } = this.props;
    const updatedVariant = { ...variant, title: target.textContent };

    // onUpdate(updatedVariant);
  };

  public handleEditText = ({ target }) => {
    const { variant, onUpdate } = this.props;
    const updatedVariant = { ...variant, title: target.innerHTML };

    // onUpdate(updatedVariant);
  };

  public render() {
    const { variant } = this.props;

    return (
      <Form.Field>
        <label>{variant.sequence}.</label>

        <label contentEditable={true} onBlur={this.handleEditTitle}>
          {this.getTitle(variant.title)}
        </label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Editable contentEditable={true} onBlur={this.handleEditText}>
            {variant.text}
          </Editable>
          <DragHandle />
          {/* <Icon link={true} name="move" /> */}
        </div>
      </Form.Field>
    );
  }
}

export default Variant;
