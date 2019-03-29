import * as React from 'react'
import styled from 'styled-components'
import { Icon as IconBase } from 'semantic-ui-react'

const StyledIcon = styled(IconBase)``

const Icon = ({ ...props }) => <StyledIcon {...props} /> 

export default Icon 
  
