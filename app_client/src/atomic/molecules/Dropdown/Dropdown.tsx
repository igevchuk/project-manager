import * as React from 'react'
import styled from 'styled-components'
import { Dropdown as DropdownBase } from 'semantic-ui-react'

const StyledDropdown = styled(DropdownBase)``

const Dropdown = ({ children, ...props }) => (
  <StyledDropdown {...props}>{ children }</StyledDropdown>
)

export default Dropdown
