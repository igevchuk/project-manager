import React from "react";
import styled from "styled-components";

const Panel = styled.div`
  margin-bottom: 20px;
  border-radius: 2px;
  border: 0;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.12), 0 1px 6px 0 rgba(0,0,0,0.12);
  background-color: #FFFFFF;
  width: ${props => props.width || '450px'};
`;

export default function({ ...props }) {
  return (
    <Panel {...props}>
      {props.children}
    </Panel>
  );
}
