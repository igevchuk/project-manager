// const TodosDispatch = React.createContext(null);

// function TodosApp() {
//   // Note: `dispatch` won't change between re-renders
//   const [todos, dispatch] = useReducer(todosReducer);

//   return (
//     <TodosDispatch.Provider value={dispatch}>
//       <DeepTree todos={todos} />
//     </TodosDispatch.Provider>
//   );
// }

// function DeepChild(props) {
//   // If we want to perform an action, we can get dispatch from context.
//   const dispatch = useContext(TodosDispatch);

//   function handleClick() {
//     dispatch({ type: 'add', text: 'hello' });
//   }

//   return (
//     <button onClick={handleClick}>Add todo</button>
//   );
// }

import * as React from 'react';
import EscapeOutside from 'react-escape-outside';
import { Icon } from 'semantic-ui-react';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Variant from './Variant';
import { StyledVariants, VariantForm, Divider } from './Variants.style';
import { VariantCount } from './Document.style';
import { textVariant } from '../../../../app/redux/state';

import * as sortableHoc from 'react-sortable-hoc';

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
  ({ value }: { value: { id: number; text: string; sequence: number } }) => {
    const aaaa = (
      <div>
        {value.sequence === 1 && (
          <VariantForm>
            {renderVariantForm(value)}
            <Divider>
              <span>
                Variants <Icon name="info circle" />
              </span>
            </Divider>
          </VariantForm>
        )}

        {value.sequence > 1 && (
          <VariantForm>
            {renderVariantForm(value)}
            <button onClick={handleAdd}>
              <Icon name="plus circle" />
              Add Variant
            </button>
          </VariantForm>
        )}
      </div>
    );

    return aaaa;
  }
);

const renderVariantForm = variant => {
  return (
    <React.Fragment>
      {variant.sequence === 1 && (
        <Divider>
          <span>
            Fallback/Default Language <Icon name="info circle" />
          </span>
        </Divider>
      )}
      <div>
        <Variant variant={variant} onUpdate={() => null} />
      </div>
    </React.Fragment>
  );
};

const SortableContainer = sortableHoc.SortableContainer(({ children }) => {
  return <div>{children}</div>;
});

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

  public onSortEnd = ({ oldIndex, newIndex }) => {
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
        <SortableContainer onSortEnd={this.onSortEnd} useDragHandle={true}>
          <StyledVariants>
            <span className="enumerate">1.1</span>
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
