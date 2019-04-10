import * as React from 'react'
import styled from 'styled-components'
import { Modal as ModalBase } from 'semantic-ui-react'
import Button from '@atomic/atoms/Button/Button'
import FilterMenu from './../menus/FilterMenu'
import Menu from '@atomic/organisms/Menu/Menu'
import MenuItem from '@atomic/atoms/MenuItem/MenuItem'
import Modal from '@atomic/organisms/Modal/Modal'
import Search from '@atomic/organisms/Search/Search'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'

const Header = styled(ModalBase.Header)`
  &&& {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 0.6em;
    height: 45px;
  }
`

const StyledMenu = styled(Menu)`
  &&& {
    width: 100%;
    &.ui.vertical.text.menu {
      margin: 0;
      & .item {
        padding: 1em 1.5em;
        margin: 0;
        border-top: 1px solid #F5F5F5;
        &.active {
          background: #E8EAF6;
        }
        &:first-child {
          border-top: none;
        }
      }
    }
    svg {
      margin-right: 5px;
    }
  }
`

const Actions = styled(ModalBase.Actions)`
  &&& {
    padding-top: 5px;
    padding-bottom: 5px;
    height: 45px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const BulkAssignModal = ({ 
  children, 
  items, 
  selectedContracts,
  handleUpdate,
  onClose, 
  ...props
}) => {
  const [search, setSearch] = React.useState('')
  const [searchResult, setSearchResult] = React.useState([...items])
  const [ selected, setSelected ] = React.useState(null)

  const handleClose = () => {
    onClose()
    resetSearch()
  }

  const handleSearch = (search) => {
    const re = new RegExp(search, 'gi')
    setSearch(search)
    setSearchResult(items.filter(item => !!~item.label.search(re)))
  } 

  const handleItemClick = (id) => {
    setSelected(id)
  }

  const handleApply = () => {
    handleUpdate({ assigned_negotiator: selected, contracts: selectedContracts})
    handleClose()
  }

  const handleCancel = () => {
    setSelected(null)
    handleClose()
  }

  const resetSearch = () => {
    setSearch('')
    setSearchResult(items)
  }

  return (
    <Modal size='mini' {...props} onClose={onClose}>
      <Header>
        <Search 
          iconPosition='left' 
          placeholder='Search' 
          noBorder={true}
          size='small'
          handleSearch={handleSearch} 
        />
      </Header>
      <StyledMenu text={true} vertical={true}>
        {
          searchResult.map(item => (
            <MenuItem 
              active={item.id === selected}
              key={item.id} 
              link={true} 
              onClick={() => handleItemClick(item.id)}
            >
              { item.label }
            </MenuItem>
          ))
        }
      </StyledMenu>

      <Actions>
        <Button transparent={true} onClick={() => handleCancel()}>CLEAR</Button>
        <Button transparent={true} text='green' onClick={() => handleApply()}>APPLY</Button>
      </Actions>
    </Modal>
  )
}

export default contextWrapper(BulkAssignModal)