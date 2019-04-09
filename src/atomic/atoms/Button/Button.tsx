import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledButton = styled(Button)<{transparent?: boolean, text?: string}>`
  &&& {
    font-family: 'Roboto', 'Helvetica', sans-serif;
    font-weight: normal;
    color: ${p => p.text === 'green' && '#2E7D32'};
    background: ${p => p.transparent && 'none'};
  }
`

export default ({children, ...props}) => (
  <StyledButton {...props}> { children }</StyledButton>
)
