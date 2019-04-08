import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledSwitcher = styled(Button.Group)`
  background: white;
  border: 1px solid #CFD8DC;
  border-radius: 3px;
  && .ui.button {
    color: #616161;
    background-color: #ffffff;
    &:hover, &.active {
      margin: -1px 0;
      background-color: #1A237E;
      color: #ffffff;
    }
  }
  .divider {
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline-block;
    border-right: 1px solid #eeeeee;
  }
`

const Switcher = ({ children, ...props }) => {
  return (
    <StyledSwitcher {...props}>{ children }</StyledSwitcher>
  )
}

export default Switcher