import React from "react";
import styled from "styled-components";
import LoadingIcon from '@images/svg-icons/Loading';

// const Loading = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   padding-top: 10px;
//   padding-bottom: 10px;
// `;

export default props => (
  <div className="loading" ref={props.innerRef}>
    <LoadingIcon fill="rgb(225, 225, 225)" />
  </div>
);
