import { 
  Modal, 
  Icon, 
  Button, 
  Dropdown, 
  Form, 
  Segment, 
  Input, 
  Label,
  Checkbox
} from 'semantic-ui-react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';

// Tab Styles
export const TabBody = styled.div`
    margin-bottom: 1rem;
    padding-bottom: 2rem;
    min-height: 500px;
`;

export const AnnotationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 0;
  }
  & > .ui.button {
    background: none;
    color: ${props => props.theme.colorRoles.primary};
  }
`;

export const NoAnnotationsSegment = styled(Segment)`
  &.ui.segment {
    box-shadow: none;
    background: #f5f5f5;
    border: none;
    color: #828282;
    font-weight: 200;
  }
`;

export const AnnotationSegment = styled(Segment)`
  &.ui.segment {
    border-radius: 0px;
  }
`;

export const AnnotationSegmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

`;

export const AnnotationSegmentDetail = styled.div`
  color: rgba(130,130,130);
  font-size: 12px;
  font-weight: 300;
`;

export const AnnotationTag = styled(Label)`
  &.ui.label {

    border-radius: 4px;
    background-color: ${props => !!props.subcolor ? props.subcolor : '#FFFDE7'};
    border: 1px solid ${props => !!props.basecolor ? props.basecolor : '#F57F17'};
    color: ${props => !!props.basecolor ? props.basecolor : '#F57F17'};
    height: 17px;
    line-height: 1px;
    font-weight: 500;
  }
`;

export const DeleteButton = styled.div`
  border: 1px solid transparent;
  padding: 0.1rem 0 0 0.2rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: -6px;


  :hover {
    background: rgba(130,130,130, 0.1);
  }
`;

// ------------- Add annotation  (Modal) Dropdown Styles

export const SemanticButton = styled(Button)`
  
  &.ui.button {
    padding: 0; 
    color: #616161;
    background: none;

    :hover {
      color: #43A047;
    }
  }
`;

export const AnnotationDropdownMenu = styled(Dropdown.Menu)`
  &.menu {
    width: 260px;
    // min-height: 400px;
    outline: none;
  }

  .annotation-list {
    height: 250px;
    overflow-y: auto;
    padding-left: 12px;
  }

  .apply-all {
    display: flex;
    font-size: 12px;
    padding: 3px 0 3px 12px;
  }

  .search-bar-input {
    margin: 4px 0;
  }
`;

export const SearchBarInput = styled(Input)`

  &&&&& {
    margin: 4px 0;
  }

  &.ui.input {
    border: none;
  }

  input[type=text] {
    border: none;
  }

  .search-bar-input {
    margin: 4px 0;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  &.ui.fitted.checkbox {
    margin-right: 8px;
  }
`;

export const StyledCheckboxDiv = styled.div`
  display: flex;
  margin-bottom: 17px;

  &.ui.label {
    line-height: 3px;
    margin-top: 1px;
    margin-left: 10px;
  }

  .ui.label {
    line-height: 3px;
    margin-top: 1px;
  }
`;

export const ActionDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 0 18px;
  padding-bottom: 10px;
`;

export const CreateAnnotationDiv = styled.div`
  p {
    color: #616161;
    font-weight: 300;
  }

  .ui.button {
    color: #1A237E;
  }
`;

export const StyledMenu = styled(Menu)`
  border: none;
`;

// ---------- Create Annotation Dropdown (modal)
export const StyledDropdown = styled(Dropdown.Menu)`
  width: 300px;
  border-radius: 0px;

  .main-body {
  display: block;
  width: 100%;
  font-size: 1em;
  line-height: 1.4;
  padding: 1rem;
  background: #fff;

    p {
      margin: 0;
    }

    .title {
      font-size: 12px;
      color: #616161;
    }

    .input-field {
      width: inherit;
      margin-bottom: 16px;
    }
  }
`;

export const StyledCreateModal = styled(Modal)`
  &.ui.modal {
    // height: 285px;
    width: 300px;
    border-radius: 0px;
  }

  p {
    margin: 0;
  }

  .title {
    font-size: 12px;
    color: #616161;
  }

  .input-field {
    width: inherit;
    margin-bottom: 16px;
  }

  .apply-all {
    margin-top: 20px;
  }
`;

export const ColorDropDown = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid grey;
  justify-content: space-between;
  padding: 6px 0px;
  cursor: pointer;
  transition: 0.3s linear;

  .label {
    display: flex;
  }

  :hover {
    // border-bottom: 0.1rem solid black;
  }
`;

export const ColorLabel = styled.div`
  display: flex;

  p {
    line-height: 16px;
  }
`;

export const ColorSelect = styled(Dropdown.Menu)`
  width: inherit;
  height: 255px;
  overflow-y: auto;

  &&&& {
    top: 36px!important;
  }

  .color-list {
    padding: 10px 16px;
    cursor: pointer;
    
    :hover {
      background: #f5f5f5;
    }
  }

`;

export const ColorDot = styled.div`
  border-radius: 50%
  height: 16px;
  width: 16px;
  border: 1px solid ${props => props.theme.primarycolor};
  background-color: ${props => props.theme.secondarycolor};
  margin-right: 10px;
`;

export const CreateActionDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 14px;
`;

export const StyledCreateCheckbox = styled(Checkbox)`
  &.ui.fitted.checkbox {
    margin-right: 8px;
    vertical-align: text-bottom;
  }
`;
