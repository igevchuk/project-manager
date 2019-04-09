import * as React from 'react'
import styled from 'styled-components'
import { Message as MessageBase } from 'semantic-ui-react'

const Message = styled(MessageBase)``

export default ({ children, ...props }) => <Message {...props}>{ children }</Message>