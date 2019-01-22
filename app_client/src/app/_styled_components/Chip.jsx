import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";
import classnames from "classnames";

const StyledChip = styled(Chip)`
  && {
    margin: 15px;
    height: 36px;
    font-size: 14px;
    color: ${props => props.theme.brandGray};
    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:focus {
      background-color: rgb(66, 66, 66);
      color: rgba(255, 255, 255, 0.88);
    }
  }
`;

function ChipComponent(props) {
  return (
    <StyledChip
      label={props.label}
      className={classnames("chip", props.className)}
      component={props.component || "a"}
      clickable={props.clickable}
    />
  );
}

ChipComponent.propTypes = {
  label: PropTypes.element
};

export default ChipComponent;
