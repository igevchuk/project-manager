import * as React from 'react'
import styled from 'styled-components'
import { Label, Icon } from 'semantic-ui-react'

const StyledIconLabel = styled(Label)`
  && {
    display: inline-flex;
    align-items: center;
    height: 32px;
    background: #FAFAFA;
    border: 1px solid #D8D8D8;
    border-radius: 4px;
    cursor: pointer;
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