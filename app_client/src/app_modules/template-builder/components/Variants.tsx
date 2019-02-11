import * as React from 'react';
import EscapeOutside from 'react-escape-outside';
import { Icon } from 'semantic-ui-react';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Variant from './Variant';
import { StyledVariants, VariantForm, Divider } from './Variants.style';
import { VariantCount } from './Content.style';

class Variants extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      variants: props.textVariants || []
    };
  }

  public handleAdd = () => {
    const newVariant = {
      title: 'New Variant',
      text: '',
      seq: this.state.variants.length + 1
    };

    this.setState({
      variants: [...this.state.variants, newVariant]
    });
  }

  public renderVariantForm = (variant) => {
    return (
      <React.Fragment>
        {
          variant.seq === 1 && (
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
    const { segment, onEscapeOutside } = this.props;
    const { variants } = this.state;
    const restVariants = variants.slice(1, variants.length);

    return (
      <EscapeOutside onEscapeOutside={onEscapeOutside} key={segment.id}>
        <StyledVariants>
          <span className="enumerate">1.1</span>

          <div>
            {
              variants[0] && (
                <VariantForm>{ this.renderVariantForm(variants[0]) }</VariantForm>
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
            3 <CompareArrows />
          </VariantCount>
        </StyledVariants>
      </EscapeOutside>
    );
  }
}

export default Variants;
