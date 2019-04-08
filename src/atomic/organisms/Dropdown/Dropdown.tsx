import * as React from 'react'
import styled from 'styled-components'
import { Dropdown as DropdownBase } from 'semantic-ui-react'

const StyledDropdown = styled(DropdownBase)``
const StyledDropdownMenu = styled(DropdownBase.Menu)``

const Dropdown = ({ children, ...props }) => (
  <StyledDropdown {...props}>{ children }</StyledDropdown>
)

export const DropdownMenu = ({ children, ...props }) => (
  <StyledDropdownMenu {...props}>{ children }</StyledDropdownMenu>
)

export default Dropdown
