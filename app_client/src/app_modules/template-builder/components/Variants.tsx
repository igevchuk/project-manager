import * as React from 'react';
import EscapeOutside from 'react-escape-outside';
import { Icon } from 'semantic-ui-react';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Variant from './Variant';
import { StyledVariants, VariantForm, Divider } from './Variants.style';
import { VariantCount } from './Content.style';
import { textVariant } from '../../../app/redux/state';

interface IVariantsProps {
  segmentId: number;
  textVariants?: textVariant[];
  onEscapeOutside?: () => void;
}

interface IVariantsState {
  textVariants?: textVariant[];
}

class Variants extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      textVariants: props.textVariants || []
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
  }

  public renderVariantForm = (variant) => {
    return (
      <React.Fragment>
        {
          variant.sequence === 1 && (
            <Divider>
              <span>
                Fallback/Default Language <Icon name="info circle" />
              </span>
            </Divider>
          )
        }
        <Variant variant={variant} onUpdate={this.props.onUpdate} />
      </React.Fragment>
    )
  }

  public render() {
    const { segmentId, onEscapeOutside } = this.props;
    const { textVariants } = this.state;
    const restVariants = textVariants.slice(1, textVariants.length);

    return (
      <EscapeOutside onEscapeOutside={onEscapeOutside} key={segmentId}>
        <StyledVariants>
          <span className="enumerate">1.1</span>

          <div>
            {
              textVariants[0] && (
                <VariantForm>{ this.renderVariantForm(textVariants[0]) }</VariantForm>
              )
            }

            {
              restVariants.length > 0 && (
                <VariantForm>
                  <Divider>
                    <span>
                      Variants <Icon name="info circle" />
                    </span>
                  </Divider>
                  {
                    restVariants.map(variant => this.renderVariantForm(variant))
                  }
                  <button onClick={this.handleAdd}>
                    <Icon name="plus circle" />
                    Add Variant
                  </button>
                </VariantForm>
              )
            }
          </div>
          
          <VariantCount className="variant-count">
            { textVariants.length } <CompareArrows />
          </VariantCount>
        </StyledVariants>
      </EscapeOutside>
    );
  }
}

export default Variants;
