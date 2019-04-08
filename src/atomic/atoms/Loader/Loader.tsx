import * as React from 'react'
import styled from 'styled-components'
import { Loader as LoaderBase } from 'semantic-ui-react'

const StyledLoader = styled(LoaderBase)``

const Loader = ({...props}) => <StyledLoader active={true} inline='centered' {...props} />

export default Loader