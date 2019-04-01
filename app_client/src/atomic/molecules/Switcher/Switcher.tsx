import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledSwitcher = styled(Button.Group)``

const Switcher = ({ children, ...props }) => (
  <StyledSwitcher {...props}>{ children }</StyledSwitcher>
)

export default Switcher