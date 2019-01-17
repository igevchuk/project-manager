import React from "react";
import styled from "styled-components";

import TextField from "./../TextField";
import { SearchIcon } from "@images/svg-icons/Search";

const SearchComponent =  ({ onSearch, className, hintText, fullWidth, hasBorder, ...props }) => (
  <div className={`search-container ${className}`} {...props}>
    <div className={`search-icon-container`}>
      <SearchIcon fill="#424242" />
    </div>

    <TextField
      type="search"
      hintText={hintText || "Search..."}
      fullWidth={fullWidth}
      hasBorder={hasBorder}
      onChange={event => onSearch(event.target.value)}
    />
  </div>
);

export default styled(SearchComponent)`
  width: 300px;
  margin: auto;
  display: inline-flex;
  box-sizing: border-box;
  position: relative;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  border-bottom: ${props => props.hasBorder ? '1px solid rgba(0, 0, 0, 0.12)' : 'none'};
  
  ${SearchIcon} {
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  ${TextField} {
    margin-right: 1em;
    border: none;
  }
`;

