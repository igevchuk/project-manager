import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledButtonGroup = styled(Button.Group)``

const ButtonGroup = ({ children, ...props }) => (
  <StyledButtonGroup {...props}>{ children }</StyledButtonGroup>
)

export default ButtonGroup