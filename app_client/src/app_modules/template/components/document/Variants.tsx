import * as React from 'react';
import EscapeOutside from 'react-escape-outside';
import { Icon } from 'semantic-ui-react';
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

    // this.setState(({ segmentVariants }) => ({
    //   segmentVariants: sortableHoc.arrayMove(
    //     segmentVariants,
    //     oldIndex,
    //     newIndex
    //   )
    // }));
  };

  public handleAdd = () => {
    // const newVariant = {
    //   title: 'New Variant',
    //   text: '',
    //   seq: this.state.variants.length + 1
    // };
    // this.setState({
    //   variants: [...this.state.variants, newVariant]
    // });
  };

  public renderVariantForm = (variant, isDefault) => {
    console.log(variant);
    return (
      <React.Fragment key={v4()}>
        {isDefault && (
          <Divider>
            <span>
              Fallback/Default Language <Icon name="info circle" />
            </span>
          </Divider>
        )}
        <Variant key={v4()} variant={variant} onUpdate={() => null} />
      </React.Fragment>
    );
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

    return (
      <EscapeOutside onEscapeOutside={onEscapeOutside} key={v4()}>
        <StyledVariants>
          <span className="enumerate">1.1</span>

          <div>
            {standardVariant[0] && (
              <VariantForm>
                {this.renderVariantForm(standardVariant[0], true)}
              </VariantForm>
            )}

            {restVariants.length > 0 && (
              <VariantForm>
                <Divider>
                  <span>
                    Variants <Icon name="info circle" />
                  </span>
                </Divider>
                {restVariants.map(variant =>
                  this.renderVariantForm(variant, false)
                )}
                <button onClick={this.handleAdd}>
                  <Icon name="plus circle" />
                  Add Variant
                </button>
              </VariantForm>
            )}
          </div>

          <VariantCount className="variant-count">
            3 <CompareArrows />
          </VariantCount>
        </StyledVariants>
      </EscapeOutside>
    );
  }
}

export default Variants;
