import * as React from 'react'
import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

const StyledMenuItem = styled(Dropdown.Item)``

const MenuItem = ({ children, ...props }) => (
  <StyledMenuItem {...props}>{ children }</StyledMenuItem>
)

export default MenuItem
