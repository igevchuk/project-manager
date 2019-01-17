import React from "react";
import styled from "styled-components";

import { Portal } from "./Portal";
import { Icon } from "@images/svg-icons/icons";

const MARGIN = 7;
const FONT_SIZE = 10;
const MIN_HEIGHT = 22;

export const TooltipPortal = styled(Portal)`
  && {
    box-sizing: border-box;
    background: rgba(97, 97, 97, 0.9);
    border-radius: 2px;
    left: ${props => props.left || 0}px;
    top: ${props => props.top || 0}px;
    width: ${props => props.width + 10}px;
    height: ${props => props.height}px;
    min-height: ${MIN_HEIGHT}px;
    color: white;
    font-size: ${FONT_SIZE}px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }
`;

export const TooltipLink = styled.span.attrs({
  children: props => props.children
})`
  display: inline-block;
`;
export const TooltipContents = styled.div`
  position: relative;
  width: auto;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

export const TooltipIcon = Icon.extend`
  fill: rgba(0, 0, 0, 0.54);
`;

export class Tooltip extends React.Component {
  state = {
    portalContentsHeight: 0,
    portalContentsWidth: 0,
    linkBottom: 0,
    linkLeft: 0,
    linkWidth: 0,
    open: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.getTooltipLinkPosition);
    window.addEventListener("resize", this.getTooltipLinkPosition);
    window.addEventListener("resize", this.calculatePortalContents);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.getTooltipLinkPosition);
    window.removeEventListener("resize", this.getTooltipLinkPosition);
    window.removeEventListener("resize", this.calculatePortalContents);
  }

  getTooltipLink = el => {
    if (this.tooltipLink) return;
    this.tooltipLink = el;
    this.getTooltipLinkPosition();
  };

  getTooltipContents = el => {
    if (this.portalContents) return;
    this.portalContents = el;
    this.calculatePortalContents();
  };

  getTooltipLinkPosition = () => {
    if (!this.tooltipLink) return;
    const { pageYOffset, pageXOffset } = window;
    const { left, width, bottom } = this.tooltipLink.getBoundingClientRect();
    this.setState({
      linkBottom: bottom + pageYOffset,
      linkLeft: left + pageXOffset,
      linkWidth: width
    });
  };

  calculatePortalContents = () => {
    if (!this.portalContents) return;
    const { height, width } = this.portalContents.getBoundingClientRect();
    this.setState({
      portalContentsHeight: height,
      portalContentsWidth: width
    });
  };

  showTooltip = () => {
    this.setState({ open: true });
    window.addEventListener("scroll", this.hideTooltip);
  };

  hideTooltip = () => {
    this.setState({ open: false });
    window.removeEventListener("scroll", this.hideTooltip);
  };

  handleMouseEnter = () => {
    this.showTooltip();
  };

  handleMouseLeave = () => {
    this.hideTooltip();
  };

  render() {
    const { link: Link } = this.props;
    const {
      open,
      portalContentsHeight,
      portalContentsWidth,
      linkBottom,
      linkLeft,
      linkWidth,
    } = this.state;
    // const left = linkLeft + (linkWidth / 2 - portalContentsWidth / 2);
    const left = linkLeft;

    const top = linkBottom + MARGIN;
    const customIconPassedIn = Boolean(Link) && typeof Link !== "string";
    return (
      <React.Fragment>
        <TooltipLink
          tabIndex="0"
          onFocus={this.showTooltip}
          onBlur={this.hideTooltip}
          innerRef={this.getTooltipLink}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {customIconPassedIn ? (
            <Link />
          ) : (
            <Icon icon={Link || "info_outline"} />
          )}
        </TooltipLink>
        <TooltipPortal
          open={open}
          top={top}
          left={left}
          height={portalContentsHeight}
          width={portalContentsWidth}
          renderContents={() => (
            <TooltipContents
              key="contents"
              contentWidth={this.props.contentWidth}
              innerRef={this.getTooltipContents}
              childStringLength={
                typeof this.props.children === "string"
                  ? this.props.children.length
                  : null
              }
            >
              {this.props.children}
            </TooltipContents>
          )}
        />
      </React.Fragment>
    );
  }
}
