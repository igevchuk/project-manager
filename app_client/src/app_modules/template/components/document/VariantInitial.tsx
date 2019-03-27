import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { Editable } from './Variants.style';
import * as sortableHoc from 'react-sortable-hoc';
import ContentEditable from 'react-contenteditable';
import * as templateState from '../../../../app/redux/state';

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
  onUpdate: () => void;
}

class VariantInitial extends React.PureComponent<IVariantProps, {}> {
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

    return (
      <Form.Field>
        {/* <label>{variant.segment.id}.</label> */}
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

export default VariantInitial;
