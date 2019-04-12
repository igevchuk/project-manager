import * as React from 'react'
import styled from 'styled-components';

const StyledRadioField = styled.div`
  label {
    color: #010101;	
    font-size: 12px;	
    font-weight: 500;	
    line-height: 16px;
  }
  & .radio {
    margin-right: 5px;
  }
`

const RadioField = ({render, ...props}) => (
  <StyledRadioField {...props} className='field'>{ render() }</StyledRadioField>
)

export default RadioField
