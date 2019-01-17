import React from "react";
import styled from "styled-components";
import Waypoint from "react-waypoint";
import { LoadingIcon } from "@images/svg-icons/Loading";

const FooterComponent = ({ className, onPaginate, innerRef }) => {
  return (
    <div className={`table-footer ${className}`}>
      <Waypoint onEnter={onPaginate} key="footer">
        <div ref={innerRef}>
          <LoadingIcon fill="rgb(225, 225, 225)" />
        </div>
      </Waypoint>
    </div>
  );
};

const Footer = styled(FooterComponent)`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  padding-right: 14px;
`;

export default Footer;
