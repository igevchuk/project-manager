import * as React from 'react'
import styled from 'styled-components'
import { Modal as ModalBase } from 'semantic-ui-react'

const StyledModal = styled(ModalBase)``

const Modal = ({ children, ...props }) => {
  return (
    <StyledModal {...props}>{ children }</StyledModal>
  )
}

export default Modal