import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledButton = styled(Button)``

export default ({children, ...props}) => (
  <StyledButton> { children }</StyledButton>
)
