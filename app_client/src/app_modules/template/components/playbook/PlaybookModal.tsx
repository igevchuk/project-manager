import * as React from 'react'
import { Modal, Icon, Button as SemanticButton, Form } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import DeletePlaybookModal from './DeletePlaybookModal';
import {
  InfoIcon,
  ModalTitle,
  StyledDropdown,
  StyledFormField,
  StyledPopup,
  StyledTextArea
} from './PlaybookRule.style';

interface IForm {
  category: string;
  rule: string;
  confirmationLanguage: string;
  explanation: string;
}

interface IPlaybookModal {
  newRule: boolean;
  ruleType: string;
}

interface IPlaybookModalState {
    displayModal: boolean,
    formData: IForm
}

const CATEGORY_OPTIONS = [
    { key: "acceptable", text: "Acceptable Language", value: "acceptable" },
    { key: "escalations", text: "Escalation Required Language", value: "escalations" },
    { key: "conditional", text: "Conditional Language", value: "conditional" }
]

class PlaybookModal extends React.Component<IPlaybookModal, IPlaybookModalState> {
  constructor(props){
    super(props)
    this.state = { displayModal: false, formData: this.getBaseFormData()};
    this.updateFormData = this.updateFormData.bind(this);
    this.getBaseFormData = this.getBaseFormData.bind(this);
  }

  public close = () => this.setState({ displayModal: false, formData: this.getBaseFormData()})
  public open = () => this.setState({ displayModal: true })

  public getBaseFormData = () => ({
    category: this.props.ruleType,
    confirmationLanguage: '',
    explanation: '',
    rule: ''
  })

  public componentDidMount = () => {
    this.updateFormData(null, {name: 'category', value: this.props.ruleType})
  }

  public updateFormData(_, { name, value }) {
    this.setState(prevState => ({
      formData: { ...prevState.formData, [name]: value }
    }));
  }

  public render() {
    const { newRule } = this.props;
    const { displayModal } = this.state;
    return (
     <Modal
      closeOnEscape={true}
      open={displayModal}
      size="small"
      trigger={
        <SemanticButton onClick={ this.open }>
            <Icon name="plus circle" /> ADD RULE
        </SemanticButton>
      }
    >
      <Modal.Content>
        <ModalTitle>{ newRule ? "New" : "Edit" } Playbook Rule</ModalTitle>
        <Form>
            <StyledFormField>
                <label>Category</label>
                <StyledDropdown
                  fluid={true}
                  onChange={this.updateFormData}
                  options={CATEGORY_OPTIONS}
                  selection={true}
                  name="category"
                  value={this.state.formData.category}
                />
            </StyledFormField>
            <StyledFormField>
              <label>Rule</label>
              <StyledTextArea
                onChange={this.updateFormData}
                placeholder="Enter the text for this Playbook Rule..."
                name="rule"
                value={this.state.formData.rule}
              />
            </StyledFormField>
            {this.state.formData.category !== 'acceptable' && <StyledFormField>
              <label>
                Confirmation Language
                <StyledPopup
                  content="Confirmation language appears as a subcondition that the reviewer must confirm before the reviewer applies any Playbook Rule in the Acceptable Language category"
                  inverted={true}
                  position="right center"
                  trigger={<InfoIcon size="tiny" name="info" circular={true}/>}
                  wide="very"
                />
              </label>
              <StyledTextArea
                onChange={this.updateFormData}
                placeholder="Enter the confirmation language that relates to this Playbook Rule"
                name="confirmationLanguage"
                value={this.state.formData.confirmationLanguage}
              />
            </StyledFormField>}
            <StyledFormField>
              <label>Explanation</label>
              <StyledTextArea
                onChange={this.updateFormData}
                placeholder="Provide an optional explanation for this rule..."
                name="explanation"
                value={this.state.formData.explanation}
              />
            </StyledFormField>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <DeletePlaybookModal />
        <Button size="large" onClick={this.close}>Cancel</Button>
        <Button size="large">Save</Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

export default PlaybookModal;