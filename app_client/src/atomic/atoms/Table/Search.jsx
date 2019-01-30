import React, { PureComponent } from "react";
import styled from "styled-components";

import TextField from "../TextField";
import { SearchIcon } from "@images/svg-icons/Search";

const SearchComponent = styled.div`
  width: 100%;
  margin: auto;
  display: inline-flex;
  background-color: white;
  box-sizing: border-box;
  position: relative;

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

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasBeenFocused: false
    };
  }

  handleClick = () => {
    this.setState(prevState => {
      if (!prevState.hasBeenFocused) {
        this.setState({
          hasBeenFocused: true
        });
      }
    });
  };

  render() {
    const { onSearch, className } = this.props;
    const { hasBeenFocused } = this.state;
    const inputStyle = {
      visibility: hasBeenFocused ? "visible" : "hidden"
    };
    const underlineFocusStyle = {
      borderWidth: hasBeenFocused ? "1px" : "0"
    };
    const hintTextStyle = {
      visibility: hasBeenFocused ? "visible" : "hidden",
      fontSize: "12px"
    };

    return (
      <SearchComponent className={`search-container ${className}`}>
        <TextField
          type="search"
          hintText={"Search..."}
          hasBeenFocused={hasBeenFocused}
          fullWidth
          hasBorder={false}
          onChange={onSearch}
          inputStyle={inputStyle}
          hintTextStyle={hintTextStyle}
          underlineFocusStyle={underlineFocusStyle}
        />

        <div className={`search-icon-container`}>
          <SearchIcon fill="#424242" onClick={() => this.handleClick()} />
        </div>
      </SearchComponent>
    );
  }
}

export default Search;
