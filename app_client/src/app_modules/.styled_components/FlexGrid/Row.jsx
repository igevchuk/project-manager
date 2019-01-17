import React from "react";
import styled from "styled-components";

const RowComponent = props => <div className={props.className}>{props.children}</div>;

export const Row = styled(RowComponent)`
  position: relative;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
`;

export function withRowState(WrappedComponent) {
  const ComponentWithRowState = props => (
    <Row>{rowState => <WrappedComponent {...props} rowState={rowState} />}</Row>
  );
  const name = WrappedComponent.displayName || WrappedComponent.name;
  ComponentWithRowState.displayName = `withRowState(${name})`;
  return ComponentWithRowState;
}
