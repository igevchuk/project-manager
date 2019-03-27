import * as React from 'react';
import { tagColor, tag } from '../../../../../app/redux/state';

import { Dropdown } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';
import { ArrowDropDown } from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import {
  StyledDropdown,
  StyledCreateModal,
  ColorDropDown,
  ColorLabel,
  ColorSelect,
  ColorDot,
  CreateActionDiv,
  StyledCreateCheckbox
} from './SidebarAnnotations.style';


const initialState = {
  annotationName: '',
  colorID: '',
  colorName: '',
  primaryColor: '',
  secondaryColor: ''
}

interface ICreateAnnotationProps {
  defaultName: string;
  open: boolean;
  handleClose: () => void;
  handleCreateAnnotation: (payload) => void;
  tagColors: tagColor[];
}


const CreateAnnotation: React.FunctionComponent<ICreateAnnotationProps> = (props) => {
  const { open, tagColors, defaultName } = props;
  const { handleClose, handleCreateAnnotation } = props;
  const tagColor = tagColors[0];
  const [primaryColour, secondaryColour] = tagColor.value.split('|')
  const [openColor, setOpenColor] = React.useState(false);
  const [modalData, setModalData] = React.useState(
    {
      annotationName: defaultName,
      colorID: tagColor.id,
      colorName: tagColor.name,
      primaryColor: primaryColour,
      secondaryColor: secondaryColour
    }
  );

  const handleOpenColor = () => setOpenColor(true);
  const handleCloseColor = () => setOpenColor(false);

  const handleOnNameChange = (e) => setModalData({
    ...modalData,
    annotationName: e.target.value
  })

  const handleColorSelect = (color) => {
    const findColor = tagColors.find(item => item.id === color)
    if (findColor === undefined) {
      return;
    }
    const [primaryColour, secondaryColour] = findColor.value.split('|')
    setModalData({
      ...modalData,
      colorID: findColor.id,
      colorName: findColor.name,
      primaryColor: primaryColour,
      secondaryColor: secondaryColour
    })
  }

  const handleCreate = () => {
    const payload: tag = {
      id: String(Math.random()),
      name: modalData.annotationName,
      colour_id: modalData.colorID,
    }
    handleCreateAnnotation(payload);
  }

  const colorDotList = (
    tagColors.map((color, index) => {
      const [primaryColour, secondaryColour] = color.value.split('|');
      return (
        <ColorLabel
          className='color-list'
          onClick={() => handleColorSelect(color.id)}
          key={index}
        >
          <ColorDot
            theme={{
              primarycolor: primaryColour,
              secondarycolor: secondaryColour
            }}
          />
          <p>{color.name}</p>
        </ColorLabel>
      )
    })
  )

  const colorDropDownSelect = (
    <Dropdown
      open={openColor}
      onClose={handleCloseColor}
      trigger={
        <ColorDropDown onClick={handleOpenColor}>
          <ColorLabel>
            <ColorDot
              theme={{
                primarycolor: modalData.primaryColor,
                secondarycolor: modalData.secondaryColor
              }}
            />
            <p>{modalData.colorName}</p>
          </ColorLabel>
          <ArrowDropDown />
        </ColorDropDown>
      }
      icon={null}
      style={{ padding: '0px', width: 'inherit', marginBottom: '14px' }}
      direction="left" // for dropdown - remove if popup
    >
      <ColorSelect>
        {colorDotList}
      </ColorSelect>
    </Dropdown>
  )

  const actionButtons = (
    <CreateActionDiv>
      <Button 
        style={{ color: '#43A047' }} 
        onClick={handleCreate}
      >
        CREATE
      </Button>
      <Button
        style={{ marginRight: '15px' }}
        onClick={handleClose}
      >
        Cancel
      </Button>
    </CreateActionDiv>
  )

  // Modal pop up option
  // const mainBody = (
  //   <StyledCreateModal
  //     closeOnEscape={true}
  //     open={open}
  //     onClose={handleClose}
  //   >
  //     <Modal.Content>
  //       <p className='title'>Annotation Name</p>
  //       <TextField
  //         className='input-field'
  //         value={modalData.annotationName}
  //         onChange={handleOnNameChange}
  //       />
  //       <p className='title'>Color</p>
  //       {colorDropDownSelect}
  //       <div className='apply-all'>
  //         <StyledCreateCheckbox /> Apply to all variants of this segment?
  //       </div>
  //       {actionButtons}
  //     </Modal.Content>

  //   </StyledCreateModal>
  // )

  const mainBody = (
    <Dropdown
      open={open}
      closeOnBlur={false}
      closeOnChange={false}
      icon={null}
      trigger={<div style={{ display: 'none' }}>x</div>}
      direction="left"
      style={{ position: 'absolute', marginLeft: '93%', marginTop: '14px' }}
    >
      <StyledDropdown>
        <div className='main-body'>
          <p className='title'>Annotation Name</p>
          <TextField
            className='input-field'
            value={modalData.annotationName}
            onChange={handleOnNameChange}
          />
          <p className='title'>Color</p>
          {colorDropDownSelect}
          <div className='apply-all'>
            <StyledCreateCheckbox /> Apply to all variants of this segment?
          </div>
          {actionButtons}
        </div>
      </StyledDropdown>
    </Dropdown>
  );

  return mainBody;
};

export default CreateAnnotation;