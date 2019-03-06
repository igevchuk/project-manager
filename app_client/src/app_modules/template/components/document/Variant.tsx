import * as React from 'react';
import styled from 'styled-components';
import { Form, Icon } from 'semantic-ui-react';
import { Editable } from './Variants.style';
import { textVariant } from '../../../../app/redux/state';
import * as sortableHoc from 'react-sortable-hoc';
import * as templateState from '../../../../app/redux/state';
import ContentEditable from 'react-contenteditable';

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" link={true} />
  </span>
));

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

interface IVariantProps {
  variant: segmentSource;
  onUpdate: (textVariant: textVariant) => void;
}

class Variant extends React.Component<IVariantProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public getTitle = title => {
    return title.trim() || 'New Variant';
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
    console.log(variant);

    return (
      <Form.Field>
        <label>{variant.segment.id}.</label>
        <ContentEditable
          html={this.getTitle(variant.segment.text)}
          disabled={false}
          onChange={this.handleEditTitle}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Editable
            onChange={this.handleEditText}
            disabled={false}
            html={this.getTitle(variant.segment.text)}
          />
          <DragHandle />
        </div>
      </Form.Field>
    );
  }
}

export default Variant;
