import * as React from 'react';
import EscapeOutside from 'react-escape-outside';
import { Icon } from 'semantic-ui-react';
import * as sortableHoc from 'react-sortable-hoc';
import CompareArrows from '@material-ui/icons/CompareArrows';
import { v4 } from 'uuid';

import Variant from './Variant';
import { StyledVariants, VariantForm, Divider } from './Variants.style';
import { VariantCount } from './Document.style';
import { textVariant } from '../../../../app/redux/state';
import * as templateState from '../../../../app/redux/state';

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};
interface IVariantsProps {
  segmentVariants: segmentSource[];
  onEscapeOutside?: () => void;
}

export const Variants: React.SFC<IVariantsProps> = props => {
  const [segmentVariants, setActiveSegment] = React.useState({
    ...props
  });

  console.log(segmentVariants);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // console.log(oldIndex);
    // this.setState(({ textVariants }) => ({
    //   textVariants: sortableHoc.arrayMove(textVariants, oldIndex, newIndex)
    // }));
  };

  const variants = (
    <div>
      {segmentVariants.segmentVariants.map((variant, index) => {
        const variantIsDefault = variant.segment.variantIsDefault;
        if (variantIsDefault) {
          return (
            <VariantForm key={v4()}>
              <SortableItem key={v4()} index={index} value={variant} />
            </VariantForm>
          );
        }

        // return (
        //   <VariantForm key={v4()}>
        //     <Divider>
        //       <span>
        //         Variants <Icon name="info circle" />
        //       </span>
        //     </Divider>

        //     <SortableItem key={v4()} index={index} value={variant} />

        //     <button onClick={handleAdd}>
        //       <Icon name="plus circle" />
        //       Add Variant
        //     </button>
        //   </VariantForm>
        // );
      })}
    </div>
  );

  const variantsbak = (
    <div>
      {segmentVariants.segmentVariants[0] && (
        <VariantForm>
          {renderVariantForm(segmentVariants.segmentVariants[0])}
        </VariantForm>
      )}

      {segmentVariants.segmentVariants.length > 0 && (
        <VariantForm>
          <Divider>
            <span>
              Variants <Icon name="info circle" />
            </span>
          </Divider>

          {segmentVariants.segmentVariants.map(variant =>
            renderVariantForm(variant)
          )}

          <button onClick={handleAdd}>
            <Icon name="plus circle" />
            Add Variant
          </button>
        </VariantForm>
      )}
    </div>
  );

  // return <div>ssss</div>;
  return (
    <EscapeOutside key={v4()} onEscapeOutside={segmentVariants.onEscapeOutside}>
      <SortableContainer onSortEnd={onSortEnd} useDragHandle={true}>
        <StyledVariants>
          <span className="enumerate">1.1</span>
          {variants}
          {/* <VariantCount className="variant-count">
            segmentVariants && segmentVariants.segmentVariants.length
            {'4'} <CompareArrows />
          </VariantCount> */}
        </StyledVariants>
      </SortableContainer>
    </EscapeOutside>
  );
};

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" size="small" />
  </span>
));

const handleAdd = () => {
  // const newVariant = {
  //   title: 'New Variant',
  //   text: '',
  //   sequence: this.state.textVariants.length + 1
  // };
  // this.setState({
  //   textVariants: [...this.state.textVariants, newVariant]
  // });
};

const SortableItem = sortableHoc.SortableElement(
  ({ value }: { value: segmentSource }) => {
    return renderVariantForm(value);
  }
);

const renderVariantForm = variant => {
  return (
    <React.Fragment key={v4()}>
      {variant.sequence === 1 && (
        <Divider>
          <span>
            Fallback/Default Language <Icon name="info circle" />
          </span>
        </Divider>
      )}
      <div>
        <Variant key={v4()} variant={variant} onUpdate={() => null} />
      </div>
    </React.Fragment>
  );
};

const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

// type segmentSource = {
//   runs: templateState.run[];
//   segment: templateState.textSegment;
// };

// ////////////////////////////////////
class Variantsa extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      textVariants: props.textVariants
    };
  }

  public handleAdd = () => {
    const newVariant = {
      title: 'New Variant',
      text: '',
      sequence: this.state.textVariants.length + 1
    };

    this.setState({
      textVariants: [...this.state.textVariants, newVariant]
    });
  };

  public renderVariantForm = variant => {
    return (
      <React.Fragment>
        {variant.sequence === 1 && (
          <Divider>
            <span>
              Fallback/Default Language <Icon name="info circle" />
            </span>
          </Divider>
        )}
        <Variant variant={variant} onUpdate={this.props.onUpdate} />
      </React.Fragment>
    );
  };

  public onSortEnda = ({ oldIndex, newIndex }) => {
    console.log(oldIndex);
    this.setState(({ textVariants }) => ({
      textVariants: sortableHoc.arrayMove(textVariants, oldIndex, newIndex)
    }));
  };

  public render() {
    const { segmentId, onEscapeOutside, ...props } = this.props;
    const { textVariants } = this.state;
    const restVariants = textVariants.slice(1, textVariants.length);

    const variantsasd = (
      <div>
        {textVariants.map((variant, index) => (
          <SortableItem key={`item-${index}`} index={index} value={variant} />
        ))}
      </div>
    );

    const variants = (
      <div>
        {textVariants[0] && (
          <VariantForm>{this.renderVariantForm(textVariants[0])}</VariantForm>
        )}

        {restVariants.length > 0 && (
          <VariantForm>
            <Divider>
              <span>
                Variants <Icon name="info circle" />
              </span>
            </Divider>
            {restVariants.map(variant => this.renderVariantForm(variant))}
            <button onClick={this.handleAdd}>
              <Icon name="plus circle" />
              Add Variant
            </button>
          </VariantForm>
        )}
      </div>
    );

    return (
      <EscapeOutside onEscapeOutside={onEscapeOutside} key={segmentId}>
        <SortableContainer onSortEnd={this.onSortEnda} useDragHandle={true}>
          <StyledVariants>
            <span className="enumerate">1.1</span>
            {variantsasd}
            <VariantCount className="variant-count">
              {textVariants.length} <CompareArrows />
            </VariantCount>
          </StyledVariants>
        </SortableContainer>
      </EscapeOutside>
    );
  }
}

export default Variants;
