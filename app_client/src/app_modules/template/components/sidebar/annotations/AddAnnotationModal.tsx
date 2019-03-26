import * as React from 'react';
import { Icon, Dropdown } from 'semantic-ui-react';
import { IAnnotationDataModel } from "./SidebarAnnotations";
import {
  AnnotationTag,
  AnnotationDropdownMenu,
  SearchBarInput,
  SemanticButton,
  StyledCheckbox,
  StyledCheckboxDiv,
  ActionDiv,
  CreateAnnotationDiv
} from './SidebarAnnotations.style';
import Button from '@material-ui/core/Button';

interface IAddAnnotationModalProps {
  open: boolean;
  data: IAnnotationDataModel[];
  selection: string[];
  searchValue: string;
  handleOnOpen: () => void;
  handleOnClose: () => void;
  handleOnSearch: (value) => void;
  handleModalSelection: (id) => void;
  handleSubmit: () => void;
  handleShowCreate: () => void;

}

const AddAnnotationModal: React.FunctionComponent<IAddAnnotationModalProps> = (props) => {
  const { open, data, selection, searchValue } = props;
  const {
    handleOnOpen,
    handleOnClose,
    handleOnSearch,
    handleModalSelection,
    handleSubmit,
    handleShowCreate
  } = props;
  const allSelected = selection.length === data.length;

  const applyButtonClass = !!selection.length ? { color: '#43A047' } : undefined;

  const searchBar = (
    <SearchBarInput
      icon='search'
      iconPosition='left'
      placeholder="Search"
      className="search-bar-input"
      value={searchValue}
      onChange={(e) => { handleOnSearch(e.target.value) }}
    />
  )

  const annotationsList = (
    data.map((item, index) => {
      const isChecked = selection.indexOf(item.id) !== -1;
      const handleClick = () => handleModalSelection(item.id);
      return (
        <StyledCheckboxDiv key={index}>
          <StyledCheckbox checked={isChecked} onChange={handleClick} />
          <AnnotationTag
            basecolor={item.primaryColor}
            subcolor={item.secondaryColor}
          >
            {item.tagName}
          </AnnotationTag>
        </StyledCheckboxDiv>
      )
    })
  )

  const createAnnotationSegment = !data.length && (
    <CreateAnnotationDiv>
      <p>No existing annotations found</p>
      <SemanticButton onClick={handleShowCreate}>
        <Icon name="plus circle" /> Create Annotation
      </SemanticButton>
    </CreateAnnotationDiv>
  )

  const addAnnotationButton = (
    <SemanticButton onClick={handleOnOpen}>
      <Icon name="plus circle" /> ADD ANNOTATION
    </SemanticButton>
  )

  const actionButtons = (
    <ActionDiv>
      <Button
        style={applyButtonClass}
        disabled={!selection.length}
        onClick={handleSubmit}
      >
        Apply
      </Button>
      <Button
        style={{ marginRight: '15px' }}
        onClick={handleOnClose}
      >
        Cancel
      </Button>
    </ActionDiv>
  )

  const mainBody = (
    <Dropdown
      multiple={true}
      closeOnBlur={false}
      closeOnChange={false}
      open={open}
      trigger={addAnnotationButton}
      icon={null}
      style={{ padding: '0px' }}
      direction="left"
    >
      <AnnotationDropdownMenu>
        {searchBar}
        <Dropdown.Divider style={{ marginBottom: '17px' }} />
        <div className="annotation-list">
          {annotationsList}
          {createAnnotationSegment}
        </div>
        <Dropdown.Divider />
        <div className="apply-all">
          <StyledCheckbox /> Apply to all variants of this segment?
        </div>
        <Dropdown.Divider />
        {actionButtons}
      </AnnotationDropdownMenu>
    </Dropdown>
  )

  return mainBody;
};

export default AddAnnotationModal;