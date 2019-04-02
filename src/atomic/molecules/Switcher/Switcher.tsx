import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledSwitcher = styled(Button.Group)`
  padding-top: 5px;
  padding-bottom: 5px;
  background: white;
  border: 1px solid #CFD8DC;
  border-radius: 3px;
  && .ui.button {
    padding-top: 0;
    padding-bottom: 0;
    height: 20px;
    color: #616161;
    background-color: #ffffff;
    border-right: 1px solid #eeeeee;
    &:hover {
      background-color: #1A237E;
      color: #ffffff;
    }
    &:last-child {
      border-right: none;
    }
  }
`

const Switcher = ({ children, ...props }) => {
  return (
    <StyledSwitcher {...props}>{ children }</StyledSwitcher>
  )
}

export default Switcher