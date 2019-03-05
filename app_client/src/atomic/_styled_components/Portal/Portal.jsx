// @flow
import React, { Component } from "react";
import { createPortal } from "react-dom";

import { Overlay } from "./Overlay";
import { Shift } from "./Shift";

let portal;

export class Portal extends Component {
  static defaultProps = {
    shift: false,
    attachment: "left"
  };

  state = {
    portalMounted: false,
    open: false,
    overflowY: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // if (nextProps.open && !prevState.open) {
    //   // if user has set a body style grabbing it here
    //   // so we don't override what they were using
    //   const overflowStyle = document.body.style.overflowY;
    //   document.body.style.overflowY = "hidden";
    //   return { open: nextProps.open, overflowY: overflowStyle };
    // } else if (!nextProps.open && prevState.open) {
    //   document.body.style.overflowY = prevState.overflowY;
    //   return { open: nextProps.open };
    // }

    return null;
  }

  componentDidMount() {
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "smc-portal";
      portal.className = "smc-portal";
      document.body.appendChild(portal);
    }

    this.elasd = document.createElement("div");
    this.elasd.className = "smc-portal-instance";
    portal.appendChild(this.elasd);
    // Triggering a re-render is purposeful because of the nature
    // of portals. The first render and componentDidMount will happen
    // at the same time. this.el can be undefined at render. So
    // we call this.setState in componentDidMount after this.el has
    // been defined and the dom node has been inserted.
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      portalMounted: true
    });
  }

  componentWillUnmount() {
    if (portal) portal.removeChild(this.elasd);
  }

  render() {
    if (!this.state.portalMounted) return null;
    const { shift } = this.props;
    const PortalContainer = shift ? Shift : Overlay;

    return createPortal(
      <PortalContainer
        className={this.props.className}
        direction={this.props.attachment}
        open={this.props.open}
        onClick={shift ? this.props.onRequestClose : undefined}
      >
        {this.props.renderContents()}
      </PortalContainer>,
      this.elasd
    );
  }
}
