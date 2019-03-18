import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import ContentEditable from 'react-contenteditable';

export const StyledVariants = styled.div`
  align-items: top;
  background: #f5f5f5;
  border-left: 2px solid orange;
  display: flex;
  flex-direction: column;

  margin: 1em -2em;
  padding: 1em 1em 0 1em;
  & .enumerate {
    margin-right: 1em;
  }
  & > .variant-count {
    display: inline-flex;
  }
`;

export const VariantForm = styled(Form)`
  border: 1px solid rgba(34, 36, 38, 0.15);
  flex: 1;
  padding: 1em 1em 1em 2em;
  margin-bottom: 1em;
  &&& label {
    font-size: 12px;
    font-weight: normal;
    opacity: 0.5;
  }
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 12px;
    padding: 0;
    &,
    & > .icon {
      color: #2185d0;
    }
    &:focus {
      outline: none;
    }
  }
`;

export const Divider = styled.div`
  & > span {
    background-color: #f5f5f5;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.5em;
    margin-left: -1em;
    padding: 0 0.5em;
    position: absolute;
    top: -0.75em;
  }
`;

export const Editable = styled(ContentEditable)`
  width: 100%;
  flex: auto;
  outline: 0;
  text-align: left;
  line-height: 1.5em;
  padding: 0.67857143em 1em;
  margin-right: 1em;
  background: #fff;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-radius: 0.28571429rem;
  }
  &:hover {
    background: rgb(255, 252, 220);
  }
  &:hover:before {
    border: 2px solid orange;
  }
  &:focus {
    background: ${props => props.theme.lllgreen};
  }
  &:focus:before {
    border: ${props => `2px solid ${props.theme.green}`};
  }
  & + .icon {
    visibility: hidden;
  }
  &:hover + .icon {
    visibility: visible;
  }
`;
