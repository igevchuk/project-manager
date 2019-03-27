import * as React from 'react';
import { Icon, Modal, Dropdown, Radio as SRadio } from 'semantic-ui-react';
import Radio from '@material-ui/core/Radio';
import { SemanticButton as SButton } from '../sidebar/annotations/SidebarAnnotations.style';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';
import {
  ModalBody,
  RadioButtons,
  ActionButtons,
  InformationLabel
} from './ExportModal.style'

const formatOptions = [
  {
    key: 0,
    text: "PDF (.pdf)",
    value: "PDF"
  },
  {
    key: 1,
    text: "Word Document (.doc)",
    value: "DOC"
  },
  {
    key: 2,
    text: "Excel file",
    value: "XLS"
  },
]

const modalWidth = { width: '852px' }

interface IProps {
  open: boolean;
  templateName: string;
  handleClose: () => void;
}


const ExportModal: React.FunctionComponent<IProps> = (props) => {
  const { open, templateName } = props;
  const { handleClose } = props;
  const [modalData, setModalData] = React.useState({
    name: templateName,
    format: 'PDF',
    pdfOption: 'flat'
  })

  const displayRadioButtons = modalData.format === 'PDF';
  const informationText = modalData.format === 'DOC' ?
    'Exporting a Word Document will save a flat version, no variants will be included.' :
    'Excel export will includes all segment variants and playbook rules.'

  const handleOnNameChange = (e) => {
    const value = e.target.value;
    setModalData({
      ...modalData,
      name: value
    });
  }

  const handleDropDownChange = (data) => {
    const value = data.value;
    setModalData({
      ...modalData,
      format: value
    })
  }

  const handleRadioChange = (type) => {
    setModalData({
      ...modalData,
      pdfOption: type
    })
  }

  const radioButton = (type) => (
    <Radio
      checked={modalData.pdfOption === type}
      value="checkedA"
      classes={{
        checked: 'radio-option',
        colorPrimary: 'radio-option'
      }}
      onClick={() => handleRadioChange(type)}
    />
  )

  const radioButtons = (
    <RadioButtons>
      <FormControlLabel
        control={radioButton('flat')}
        label="Flat Document (Show no Variants)"
        classes={{
          label: 'radio-label'
        }}
      />
      <FormControlLabel
        control={radioButton('extend')}
        label="Expanded Document (Show all Variants)"
        classes={{
          label: 'radio-label'
        }}
      />
    </RadioButtons>
  )

  const informationLabel = (
    <InformationLabel>
      <Icon name='info circle' />
      <p>{informationText}</p>
    </InformationLabel>
  )

  const mainBody = (
    <Modal
      open={open}
      onClose={handleClose}
      style={modalWidth}
    >
      <ModalBody>
        <div className='left-col'>
          <h3>Export</h3>
          <TextField
            id="standard-name"
            label="Name"
            value={modalData.name}
            margin="normal"
            onChange={handleOnNameChange}
            className='text-field'
          />
          <div className='format-div'>
            <p className="format-title">Format</p>
            <Dropdown
              fluid={true}
              selection={true}
              options={formatOptions}
              placeholder=''
              className='drop-down'
              onChange={(e, data) => handleDropDownChange(data)}
            />
          </div>
          {displayRadioButtons && radioButtons}
          {!displayRadioButtons && informationLabel}
        </div>
      </ModalBody>
      <ActionButtons>
        <SButton className="cancel-button" onClick={handleClose}>CANCEL</SButton>
        <SButton className="export-button">EXPORT</SButton>
      </ActionButtons>
    </Modal>
  )

  return mainBody;
};

export default ExportModal;