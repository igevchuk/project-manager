// @flow
/* eslint-disable no-confusing-arrow */
import styled, { css } from 'styled-components';
import React, { PureComponent } from 'react';

class TextFieldComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.isControlled = props.value !== undefined;
  }

  state = {
    text: this.props.defaultValue || '',
    focus:
      this.props.hasBeenFocused !== undefined
        ? this.props.hasBeenFocused
        : false,
    error: this.props.error || false
  };

  onChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    if (!this.isControlled) {
      const text = e.target.value;
      const isInvalid = this.props.validator && !this.props.validator(text);
      const isEmptyButRequired = this.props.required ? !e.target.value : false;

      this.setState({
        text,
        error: this.props.error || isInvalid || isEmptyButRequired
      });
    }
  };

  onFocus = e => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.setState({
      focus: true
    });
  };

  onBlur = e => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.setState({ focus: false });
  };

  onKeyUp = e => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }
  };

  render() {
    const hasValidOptions =
      this.props.options &&
      (Array.isArray(this.props.options) && this.props.options.length > 0);

    const hasError = Boolean(
      this.state.error || this.props.error || this.props.errorText
    );

    // Boolean to add to floating label logic
    const hasControlledValue =
      this.isControlled &&
      typeof this.props.value === 'string' &&
      this.props.value.length > 0;
    return (
      <div className={`${this.props.className} text-field-container`}>
        <FloatingLabel
          aria-label={this.props.floatingLabelText}
          className={'text-field-floating-label'}
          error={hasError}
          focus={this.props.hasBeenFocused || this.state.focus}
          floatingLabelStyle={
            hasError
              ? this.props.floatingLabelErrorStyle
              : this.props.floatingLabelStyle
          }
          floating={
            this.state.focus ||
            this.props.hintText ||
            this.props.options ||
            this.props.defaultOption ||
            this.state.text.length ||
            hasControlledValue
          }
        >
          {this.props.floatingLabelText || ''}
          {this.props.required ? ' *' : ''}
        </FloatingLabel>
        {!this.props.options && (
          <HintText
            className={'text-field-hint-text'}
            hintTextStyle={this.props.hintTextStyle}
            error={hasError}
            show={
              !this.props.defaultValue &&
              !this.state.text.length &&
              !this.props.value
            }
          >
            {this.props.hintText}
          </HintText>
        )}
        {this.props.helperText && !this.props.errorText && (
          <HelperText
            className={'text-field-helper-text'}
            helperTextStyle={this.props.helperTextStyle}
            show={
              !this.state.error &&
              (this.props.helperTextPersistent ? true : this.state.focus)
            }
          >
            {this.props.helperText}
          </HelperText>
        )}
        {this.props.options && !hasValidOptions && (
          <ErrorText
            show={!hasError}
            className={'text-field-error-text'}
            errorTextStyle={this.props.errorTextStyle}
          >
            Must have an array of at least one option passed in
          </ErrorText>
        )}
        <ErrorText
          show={hasError}
          className={'text-field-error-text'}
          errorTextStyle={this.props.errorTextStyle}
        >
          {this.props.errorText}
        </ErrorText>
        {!this.props.hasBorder && (
          <UnderlineFocus
            disabled={this.props.options || this.props.focusDisabled}
            className={'text-field-underline-focus'}
            underlineFocusStyle={this.props.underlineFocusStyle}
            focus={this.props.hasBeenFocused || this.state.focus}
            error={hasError}
          />
        )}
        <Input
          tabIndex={this.props.tabIndex || 0}
          type={this.props.type || ''}
          inputStyle={this.props.inputStyle}
          disabled={this.props.options || this.props.disabled}
          autoFocus={this.props.autoFocus}
          value={this.props.value || this.state.text}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          name={this.props.name}
          {...(this.props.inputRef ? { innerRef: this.props.inputRef } : {})}
          className={'text-field-input'}
        />
      </div>
    );
  }
}

const defaultTextColor = css`
  ${props => props.theme.default};
`;
const secondaryTextColor = css`
  ${props => props.theme.secondary};
`;
const hintTextColor = css`
  ${props => props.theme.hint};
`;
const primary = css`
  ${props => props.theme.primary || props.theme.inputColorOverrides.textField};
`;
const error = css`
  ${props => props.theme.error || '#d50000'};
`;

const fadeInOut = css`
  transition: opacity 200ms;
  opacity: ${props => +props.show};
`;

const placeBelow = css`
  position: absolute;
  bottom: -2em;
  font-size: 0.75em;
  width: 100%;
`;

const FloatingLabel = styled.div`
  position: absolute;
  transition: all 200ms;
  top: ${props => (props.floating ? '-1.5em' : '0em')};
  font-size: 1em;
  transform: ${props => `scale(${props.floating ? 0.75 : 1})`};
  transform-origin: 0 50%;
  color: ${props => {
    if (props.error) {
      return error;
    }
    return props.focus && props.floating ? primary : secondaryTextColor;
  }};
  width: 100%;
  left: 0;
  ${props => props.floatingLabelStyle};
`;

const HintText = styled.div`
  position: absolute;
  color: ${props => (props.error ? error : hintTextColor)};
  opacity: ${props => +props.show};
  width: 100%;
  left: 0;
  ${props => props.hintTextStyle};
`;

const ErrorText = styled.div`
  color: ${error};
  ${fadeInOut};
  ${placeBelow};
  ${props => props.errorTextStyle};
`;

const HelperText = styled.div`
  color: ${secondaryTextColor};
  ${fadeInOut};
  ${placeBelow};
  ${props => props.helperTextStyle};
`;

const UnderlineFocus = styled.div`
  position: absolute;
  bottom: 0px;
  border-top: 1px solid;
  border-top-color: ${props => (props.error ? error : defaultTextColor)};
  width: 0%;
  transition: width 200ms;
  ${props => props.focus && !props.disabled && 'width: 100%'};
  ${props => props.underlineFocusStyle};
`;

/*
 * Styles that will be shared between textfield and text area
 */
const inputStyles = `
  position: relative;
  border: none;
  outline: none;
  cursor: inherit;
  background-color: inherit;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
`;

/*
 * Since these styles depend on props, they can't live in the template literal
 * above
 */
// const Input = styled.input`
//   ${inputStyles};
// `.extend`
//   color: #000000;
//   padding-left: 0;
//   ${props => props.inputStyle};
// `;

const TextField = styled(TextFieldComponent)`
  width: ${props => (props.fullWidth ? '100%' : '167px')};
  font-size: 14px;
  line-height: 16px;
  position: relative;
  background-color: transparent;
  border-bottom: ${props => (props.hasBorder ? 'none' : '0.5px')};
  border-bottom-style: ${props => (props.disabled ? 'dotted' : 'solid')};
  border-bottom-color: ${props => (props.error ? error : hintTextColor)};
`;

export default TextField;
