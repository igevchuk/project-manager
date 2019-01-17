import React from 'react';
import { Search } from 'semantic-ui-react';
import styled from 'styled-components';

const SearchComponent = ({ loading, onSearchChange, value, ...props }) => (
  <Search
    {...props}
    loading={loading}
    onSearchChange={onSearchChange}
    placeholder={props.placeholder || 'Search'}
    value={value}
  />
);

export default styled(SearchComponent)`
  .ui.icon.input {
    padding-left: 2.67143em;
    input {
      padding-left: 0;
      border-radius: 0;
      border-width: 0 0 1px 0;
    }
    .icon.search {
      width: 2.67143em;
      left: 0;
      right: auto;
    }
  }
`;