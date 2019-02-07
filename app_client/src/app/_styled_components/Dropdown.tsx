import * as React from 'react';
import { Dropdown as DropdownBase } from 'semantic-ui-react';
import styled, { css } from 'styled-components';

export default styled(DropdownBase)`
  &&& div[role='alert'] {
    display: none;
  }
`;

