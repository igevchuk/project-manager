import * as React from 'react'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'

const StyledMenuItem = styled(Menu.Item)`
  font-family: 'Roboto', 'Helvetica', sans-serif;
`

const MenuItem = ({ children, ...props }) => (
  <StyledMenuItem {...props}>{ children }</StyledMenuItem>
)

export default MenuItem
