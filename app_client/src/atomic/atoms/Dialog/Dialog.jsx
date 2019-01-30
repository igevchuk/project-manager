// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Portal } from '../Portal';

/*
 * The dialog is controlled by this.props.open, *but* the dialog also closes when
 * the user clicks out of it. Because of that, the dialog's open/shut status is
 * actually controlled in the DialogComponent's state
 */

class DialogComponent extends React.Component {
  static defaultProps = {
    open: false,
    size: 'md'
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.keyCode === 27 && !!this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Portal
        open={this.props.open}
        renderContents={() => (
          <div
            className={`${this.props.className} dialog`}
            onClick={this.props.onClose}
            onKeyDown={this.handleKeyDown}
          >
            <div className="dialog-surface" onClick={e => e.stopPropagation()}>
              {this.props.children}
            </div>
          </div>
        )}
      />
    );
  }
}

const size = css`
  ${props => props.size === "sm" && `width: 300px;`};
  ${props => props.size === "md" && `width: 560px;`};
  ${props => props.size === "lg" && `width: 900px;`};
`;

DialogComponent.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  size: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
};

export default styled(DialogComponent)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  & > .dialog-surface {
    width: 560px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    background-color: #fff;
    ${size};
  }
`;
