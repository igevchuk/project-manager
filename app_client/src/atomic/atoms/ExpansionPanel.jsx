import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const ExpansionPanelComponent = styled(ExpansionPanel)`
  && {
    z-index: 20;
    & .expansion-panel_body {
      padding: 24px 32px;
      background: #EEEEEE;
    }
  }
`;

export default props => {
  return (
    <ExpansionPanelComponent
      expanded={props.expanded}
      className={classnames("expansion-panel", props.className)}
    >
      <ExpansionPanelDetails className="expansion-panel_body">
        {props.children}
      </ExpansionPanelDetails>
    </ExpansionPanelComponent>
  );
};
