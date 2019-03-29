import * as React from 'react'
import styled from 'styled-components'
import Icon from '@atomic/atoms/Icon/Icon'
import Input from '@atomic/atoms/Input/Input'

interface IIconInputProps {
  icon: string | React.ReactNode,
  fluid: boolean
}

const IconInput: React.SFC<IIconInputProps> = ({ icon, ...props }) => (
  <Input icon={icon} {...props} />
)

export default IconInput