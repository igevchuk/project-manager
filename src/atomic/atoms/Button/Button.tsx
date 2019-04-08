import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledButton = styled(Button)<{transparent?: boolean}>`
  &&& {
    background: ${p => p.transparent && 'none'};
  }
`

export default ({children, ...props}) => (
  <StyledButton {...props}> { children }</StyledButton>
)
