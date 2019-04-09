import * as React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'

const StyledButton = styled(Button)`
  &&& {
    height: 16px;	
    color: #1A237E;	
    font-size: 14px;	
    font-weight: 500;	
    line-height: 16px;
    background: transparent;
    font-family: Roboto;
  }
`

const IconButton = ({ icon, children, ...props}) => (
  <StyledButton icon={true} {...props}>
    <Icon name={icon} />
    { children }
  </StyledButton>
)

export default IconButton