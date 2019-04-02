import * as React from 'react'
import styled from 'styled-components'
import { Input as InputBase } from 'semantic-ui-react'

const StyledInput = styled(InputBase)`
  && input:focus {
    border: 1px solid #1A237E;
  }
`

interface IInputProps {
  icon?: string | React.ReactNode,
}

const Input: React.SFC<IInputProps> = ({ ...props }) => <StyledInput {...props} />

export default Input