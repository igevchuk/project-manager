import React, { Component } from "react";
import propTypes from "prop-types";

class EscapeOutside extends Component {
  constructor() {
    super();

    this.onEscape = this.onEscape.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getRef = this.getRef.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onEscape);
    document.addEventListener("click", this.onClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscape);
    document.removeEventListener("click", this.onClick, true);
  }

  // close on ESC keydown
  onEscape(e) {
    if (e.keyCode === 27) {
      this.props.onEscapeOutside();
    }
  }

  // close when click outside of component
  onClick(e) {
    if (!this.ref.contains(e.target)) {
      this.props.onEscapeOutside();
    }
  }

  getRef(ref) {
    this.ref = ref;
  }

  render() {
    const props = { ...this.props };
    delete props.onEscapeOutside;
    delete props.children;

    return (
      <div className="escape-outside" {...props} ref={this.getRef}>
        {this.props.children}
      </div>
    );
  }
}

EscapeOutside.propTypes = {
  children: propTypes.element.isRequired,
  onEscapeOutside: propTypes.func.isRequired
};

export default EscapeOutside;
