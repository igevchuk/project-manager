
import styled, { css } from 'styled-components';
import {
  Segment,
  Dropdown,
  TextArea,
  Form,
  Popup,
  Icon
} from 'semantic-ui-react';
import Button from '@material-ui/core/Button';

const PlaybookRule = styled.section``;

export const StyledTextArea = styled(TextArea)`
  &&& {
    border-top: none;
    border-left: none;
    border-right: none;
    padding-left: 0px;
    border-radius: 0;
    resize: none;

    &:focus {
      border-radius: 0;
    }
  }
`

export const StyledFormField = styled(Form.Field)`
  &&& {
    padding-bottom: 10px;
    label {
      color: #616161;
      font-size: 12px;
      line-height: 14px;
      font-weight: 500;
    }
  }
`
export const StyledPopup = styled(Popup)`
  opacity: 0.8;
  font-size: 12px;
  font-weight: 300;
  font-line: 16px;
`

export const InfoIcon = styled(Icon)`
  &&& {
    position: relative;
    bottom: 4px;
    left: 4px;
    color: white;
    background: #424242;
  }
`

export const LeftActionButton = styled(Button)`
  float: left;
`

export const ModalTitle = styled.div`
  font-size: 26px;
  font-weight: 500;
  line-height: 32px;
  color: #212121;
  padding-bottom: 30px;
`

export const BodyDiv = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
`

export const SoftBodyDiv = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: #616161;
`

export const PlaybookGroup = styled.section`
  border-bottom: 2px solid rgba(34,36,38,0.15);
  margin-bottom: 1rem;
  padding-bottom: 2rem;
  &:last-child {
    border-bottom: none;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  &&& {
    border-top: none;
    border-left: none;
    border-right: none;
    padding-left: 0px;
    border-radius: 0;
  }
`

export const PlaybookHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    color: rgb(117, 117, 117);
    font-size: 18px;
    font-weight: normal;
    line-height: 22px;
    margin-bottom: 0;
  }
  & > .ui.button {
    background: none;
    color: ${props => props.theme.colorRoles.primary};
  }
`;

export const PlaybookCard = styled(Segment)`
  &.ui.segment {
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      margin-bottom: 0;
    }
  }
`;

export default PlaybookRule;

