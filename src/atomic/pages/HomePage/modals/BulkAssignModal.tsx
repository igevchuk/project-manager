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
    height: 45px;
  }
`

const StyledMenu = styled(Menu)`
  &&& {
    width: 100%;
    &.ui.vertical.text.menu .item {
      padding-left: 1.5rem;
    }
    svg {
      margin-right: 5px;
    }
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
    handleUpdate({ assigned_negotiator: id, contracts: selectedContracts})
    onClose()
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
          items.map(item => (
            <MenuItem 
              key={item.id} 
              link={true} 
              onClick={() => handleItemClick(item.id)}
            >
              { `${item.first_name} ${item.last_name}` }
            </MenuItem>
          ))
        }
      </StyledMenu>
    </Modal>
  )
}

export default contextWrapper(BulkAssignModal)