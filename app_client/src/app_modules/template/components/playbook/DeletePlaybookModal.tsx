import * as React from 'react';
import { Modal, Icon, Button as SemanticButton, Form } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import {
  LeftActionButton,
  ModalTitle,
  SoftBodyDiv
} from './PlaybookRule.style';

interface IDeletePlaybookModalState {
  displayModal: boolean;
}

class DeletePlaybookModal extends React.Component<
  {},
  IDeletePlaybookModalState
> {
  constructor(props) {
    super(props);
    this.state = { displayModal: false };
  }

  public close = () => this.setState({ displayModal: false });
  public open = () => this.setState({ displayModal: true });

  public render() {
    const { displayModal } = this.state;
    return (
      <Modal
        closeOnEscape={true}
        open={displayModal}
        size="small"
        trigger={
          <Button size="large" onClick={this.open}>
            <Icon name="trash" size="large" /> Delete Rule
          </Button>
        }
      >
        <Modal.Content>
          <ModalTitle>Delete Playbook Rule?</ModalTitle>
          <SoftBodyDiv>
            Are you sure you want to delete this Playbook Rule?
          </SoftBodyDiv>
        </Modal.Content>
        <Modal.Actions>
          <Button size="large" onClick={this.close}>
            Cancel
          </Button>
          <Button size="large" color="secondary">
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeletePlaybookModal;
