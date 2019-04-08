import * as React from 'react'
import styled from 'styled-components'
import { Menu as MenuBase } from 'semantic-ui-react'

const StyledMenu = styled(MenuBase)``

const Menu = ({ children, ...props }) => (
  <StyledMenu {...props}>{ children }</StyledMenu>
)

export default Menu
