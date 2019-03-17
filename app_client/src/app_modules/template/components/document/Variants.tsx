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

interface IVariantsState {
  segmentVariants: segmentSource[];
}

const SortableItem = sortableHoc.SortableElement(
  ({ value }: { value: segmentSource }) => {
    return (
      <VariantForm>
        {renderVariantForm(value)}
        <button onClick={handleAdd}>
          <Icon name="plus circle" />
          Add Variant
        </button>
      </VariantForm>
    );
  }
);

const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const DragHandle = sortableHoc.SortableHandle(() => (
  <span>
    <Icon name="move" size="small" />
  </span>
));

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

class Variants extends React.Component<IVariantsProps, IVariantsState> {
  constructor(props: IVariantsProps) {
    super(props);

    this.state = {
      // textVariants: props.textVariants,
      segmentVariants: props.segmentVariants
    };
  }

  public onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('oldIndex');

    this.setState(({ segmentVariants }) => ({
      segmentVariants: sortableHoc.arrayMove(
        segmentVariants,
        oldIndex,
        newIndex
      )
    }));
  };

  public render() {
    const { onEscapeOutside, ...props } = this.props;
    const { segmentVariants } = this.state;

    const standardVariant = segmentVariants.filter(segmentVariant => {
      return segmentVariant.segment.variantIsDefault;
    });

    const restVariants = segmentVariants.filter(segmentVariant => {
      return !segmentVariant.segment.variantIsDefault;
    });

    // const renderVariantForm = variant => {
    //   return (
    //     <React.Fragment>
    //       {variant.sequence === 1 && (
    //         <Divider>
    //           <span>
    //             Fallback/Default Language <Icon name="info circle" />
    //           </span>
    //         </Divider>
    //       )}
    //       {/* <Variant variant={variant} onUpdate={this.props.onUpdate} /> */}
    //     </React.Fragment>
    //   );
    // };

    const variants = (
      <div>
        {standardVariant.map((variant, index) => {
          return <SortableItem key={v4()} index={index} value={variant} />;
        })}

        {restVariants.map((variant, index) => {
          return <SortableItem key={v4()} index={index} value={variant} />;
        })}
        <button onClick={handleAdd}>
          <Icon name="plus circle" />
          Add Variant
        </button>
      </div>
    );

    return (
      <EscapeOutside onEscapeOutside={onEscapeOutside} key={v4()}>
        <SortableContainer onSortEnd={this.onSortEnd} useDragHandle={true}>
          <StyledVariants>
            <span className="enumerate">1.1</span>
            {variants}
            <VariantCount className="variant-count">
              {segmentVariants.length} <CompareArrows />
            </VariantCount>
          </StyledVariants>
        </SortableContainer>
      </EscapeOutside>
    );
  }
}

export default Variants;
