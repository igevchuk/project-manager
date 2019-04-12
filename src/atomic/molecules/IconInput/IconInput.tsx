import * as React from 'react'
import styled from 'styled-components'
import Icon from 'src/atomic/atoms/Icon/Icon'
import Input from 'src/atomic/atoms/Input/Input'

const StyledIconInput = styled(Input)``

interface IIconInputProps {
  icon: string | React.ReactNode,
  fluid: boolean,
  onChange: (e) => void
}

const IconInput: React.SFC<IIconInputProps> = ({ icon, ...props }) => (
  <StyledIconInput icon={icon} {...props} />
)

export default IconInput