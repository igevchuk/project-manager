import * as React from 'react'
import styled from 'styled-components'
import { Label, Icon } from 'semantic-ui-react'

const StyledIconLabel = styled(Label)`
  && {
    display: inline-flex;
    align-items: center;
    height: 32px;
    font-family: Roboto;
    background: #FAFAFA;
    border-color: #D8D8D8;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    &&.active {
      color: #1A237E;
      border-color: #1A237E;
      background-color: #FAFAFA;
    }
    & .icon {
      width: 18px;
      height: 18px;
      line-height: 18px;
      color: #FFFFFF;
      border-radius: 50%;
      background-color: #1A237E;
    }
  }
`
const Iconlabel = ({ children, ...props}) => <StyledIconLabel {...props}>{ children }</StyledIconLabel>

export default Iconlabel