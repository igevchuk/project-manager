import * as React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Form, Icon } from 'semantic-ui-react';
import ContentEditable from 'react-contenteditable';
import { contextWrapper } from '../../TemplateContext';

import { Editable } from './Variants.style';
import * as templateState from '../../../../app/redux/state';

const Container = styled.div<{ ref: any; isDragging: boolean }>`
  // border: 1px solid lightgrey;
  // border-radius: 2px;
  padding: -0.4px;
  margin-bottom: 4px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : '#f5f5f5')};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  // background-color: orange;
  // border-radius: 4px;
  margin-right: 8px;
`;

type segmentSource = {
  runs: templateState.run[];
  segment: templateState.textSegment;
};

interface IVariantDndProps {
  task: { id: string; content: string };
  index: number;
  variant: segmentSource;
  appDispatch: React.Dispatch<any>;
  template: templateState.template;
  blocks: templateState.renderBlock[];
}

const VariantDnd: React.SFC<IVariantDndProps> = props => {
  const handleEditTitle = ({ target }) => {
    props.appDispatch({
      type: 'FETCH_FORM_FULFILLED',
      payload: {
        id: '722d4399-12cb-497f-8e29-5f1dc08b0230',
        name: 'this is name asd'
      }
    });

    console.log(props.template);
    // props.appDispatch({
    //   type: 'EDIT_VARIANT_TITLE',
    //   payload: {
    //     segmentId: props.variant.segment.id,
    //     variantDescription: target.value
    //   }
    // });
  };

  const handleEditText = ({ target }) => {
    alert('dddd');
    // const { variant, onUpdate } = this.props;
    // const updatedVariant = { ...variant, title: target.innerHTML };
    // onUpdate(updatedVariant);
  };

  return (
    <Draggable draggableId={props.variant.segment.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Form.Field>
            <ContentEditable
              html={props.variant.segment.variantDescription}
              disabled={false}
              onChange={handleEditTitle}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Editable
                onChange={handleEditText}
                disabled={false}
                html={props.variant.runs[0].t}
              />
              <Handle {...provided.dragHandleProps}>
                <Icon name="move" link={true} />
              </Handle>
            </div>
          </Form.Field>
        </Container>
      )}
    </Draggable>
  );
};

export default contextWrapper(VariantDnd);

// class TemplateContent extends React.PureComponent<IVariantDndProps> {
//   constructor(props: any) {
//     super(props);
//   }
//   public handleEditTitle = ({ target }) => {
//     this.props.appDispatch({
//       type: 'FETCH_FORM_FULFILLED',
//       payload: {
//         id: '722d4399-12cb-497f-8e29-5f1dc08b0230',
//         name: 'this is name asd'
//       }
//     });

//     // props.appDispatch({
//     //   type: 'EDIT_VARIANT_TITLE',
//     //   payload: {
//     //     segmentId: props.variant.segment.id,
//     //     variantDescription: target.value
//     //   }
//     // });
//   };

//   public handleEditText = ({ target }) => {
//     alert('dddd');
//     // const { variant, onUpdate } = this.props;
//     // const updatedVariant = { ...variant, title: target.innerHTML };
//     // onUpdate(updatedVariant);
//   };

//   public render() {
//     return (
//       <Draggable
//         draggableId={this.props.variant.segment.id}
//         index={this.props.index}
//       >
//         {(provided, snapshot) => (
//           <Container
//             {...provided.draggableProps}
//             ref={provided.innerRef}
//             isDragging={snapshot.isDragging}
//           >
//             <Form.Field>
//               <ContentEditable
//                 html={this.props.variant.segment.variantDescription}
//                 disabled={false}
//                 onChange={this.handleEditTitle}
//               />
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Editable
//                   onChange={this.handleEditText}
//                   disabled={false}
//                   html={this.props.variant.runs[0].t}
//                 />
//                 <Handle {...provided.dragHandleProps}>
//                   <Icon name="move" link={true} />
//                 </Handle>
//               </div>
//             </Form.Field>
//           </Container>
//         )}
//       </Draggable>
//     );
//   }
// }
