import * as React from 'react';
import EscapeOutside from "react-escape-outside"
import { Icon } from 'semantic-ui-react';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Variant from './Variant';
import { StyledVariants, VariantForm, Divider } from './Variants.style';
import { VariantCount } from './Document.style';

class Variants extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { segment, onEscapeOutside } = this.props;

    return (
      <EscapeOutside onEscapeOutside={ onEscapeOutside } key={ segment.id }>
        <StyledVariants>
          <span className='enumerate'>1.1</span>

          <VariantForm>
            <Divider><span>Fallback/Default Language <Icon name='info circle' /></span></Divider>

            <Variant content={ segment.text } />

            <button>
              <Icon name='plus circle' />
              Add Variant
            </button>
          </VariantForm>

          <VariantCount className='variant-count'>
            3 <CompareArrows />
          </VariantCount>
        </StyledVariants>
      </EscapeOutside>
    )
  }
}

export default Variants;