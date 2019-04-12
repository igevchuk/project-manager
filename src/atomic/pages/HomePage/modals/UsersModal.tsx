import * as React from 'react'
import styled from 'styled-components'
import { Modal as ModalBase } from 'semantic-ui-react'
import Button from 'src/atomic/atoms/Button/Button'
import FilterMenu from './../menus/FilterMenu'
import Modal from 'src/atomic/organisms/Modal/Modal'
import Search from 'src/atomic/organisms/Search/Search'
import { contextWrapper } from 'src/app_modules/project-manager/ProjectManagerContext'

const UsersSearch = styled(Search)`
  &&& {
    background: red;
    .ui.input {
      height: 36px;
      line-height: 36px;
      & > input {
        border: none;
      }
    }
  }
`

const Header = styled(ModalBase.Header)`
  & {
    height: auto;
  }
`

const UsersModal = ({ children, selectedContracts, users, handleUpdate, onClose, ...props}) => {
  const [ selectedUsers, setSelectedUsers ] = React.useState([])

  const handleApply = () => {
    const data = { assigned_negotiator: selectedUsers, contracts: selectedContracts }
    
    handleUpdate(data)
    onClose()
    setSelectedUsers([])
  }

  const handleClose = () => {
    onClose()
    setSelectedUsers([])
  }

  const handleItemClick = (id) => {
    const nextValues = !!selectedUsers.find(selected => selected === id) 
      ? selectedUsers.filter(selected => selected !== id) 
      : [...selectedUsers, id]

    setSelectedUsers(nextValues)
  }

  const items = users.map(user => ({
    id: user.id,
    label: props.getFullName(user)
  }));

  return (
    <Modal size='mini' {...props} onClose={() => setSelectedUsers([])}>
      <Header>
        <UsersSearch iconPosition='left' placeholder='Search' handleSearch={() => console.log(1452)} />
      </Header>
        <ModalBase.Content>
          <ModalBase.Description>
            <FilterMenu
              items={items} 
              handleItemClick={handleItemClick}
            />
          </ModalBase.Description>
        </ModalBase.Content>
        <ModalBase.Actions>
          <Button color='red' onClick={handleClose}>Cancel</Button>
          <Button color='green' onClick={handleApply}>Apply</Button>
        </ModalBase.Actions>
    </Modal>
  )
}

export default contextWrapper(UsersModal)