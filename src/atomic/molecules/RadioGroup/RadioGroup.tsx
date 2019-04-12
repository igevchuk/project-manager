import * as React from 'react'
import styled from 'styled-components'

const StyledRadioGroup = styled('div')<{inline?: boolean}>`
  display: flex;
  flex-direction: ${p => p.inline ? 'row' : 'column'};
  align-items: center;
  & .field {
    padding: 0 1em 0 0;
  }
`

const RadioGroup = ({children, ...props}) => (
  <StyledRadioGroup {...props}>
    { children }
  </StyledRadioGroup>
)

export default RadioGroup
