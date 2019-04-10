import * as React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'

const StyledButton = styled(Button)`
  &&& {
    display: inline-flex;
    align-items: center;
    color: #1A237E;	
    font-size: 14px;	
    font-weight: 500;	
    background: transparent;
    font-family: Roboto;
    margin-right: 22px;
    max-height: 40px;
    & .icon {
      opacity: 1;
      font-size: 15px;
    }
    &:last-child {
      margin-top: 4px;
      margin-right: 0;
    }
    & svg {
      font-size: 22px;
    }
  }
`

const BulkActionButton = ({ children, ...props }) => (
  <StyledButton {...props}>
    { children }
  </StyledButton>
)

export default BulkActionButton