import * as React from 'react'
import styled from 'styled-components'
import { Modal as ModalBase } from 'semantic-ui-react'
import Button from '@atomic/atoms/Button/Button'
import FilterMenu from './../menus/FilterMenu'
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

const FilterModal = ({ 
  children, 
  items, 
  filter, 
  filters,
  handleFilter, 
  onApply, 
  onClose, 
  ...props
}) => {

  const [ selectedItems, setSelectedItems ] = React.useState(
    Object.keys(items).reduce((accum, current) => {
      accum[current] = [...filters[filter]]
      return accum
    }, {})
  )

  const [search, setSearch] = React.useState('')
  const [searchResult, setSearchResult] = React.useState([...items[filter]])

  const handleApply = () => {
    onApply()
    resetSearch()
    handleFilter(filter, selectedItems[filter])
  }

  const handleCancel = () => {
    handleFilter(filter, [])
    onClose()
    setSelectedItems({
      ...selectedItems,
      [filter]: []
    })
    resetSearch()
  }

  const handleSearch = (search) => {
    const re = new RegExp(search, 'gi')
    setSearch(search)
    setSearchResult(items[filter].filter(item => !!~item.label.search(re)))
  } 

  const handleItemClick = (id) => {
    const nextValues = !!selectedItems[filter].find(selected => selected === id) 
      ? selectedItems[filter].filter(selected => selected !== id) 
      : [...selectedItems[filter], id]

    setSelectedItems({
      ...selectedItems,
      [filter]: nextValues
    })
  }

  const resetSearch = () => {
    setSearch('')
    setSearchResult(items[filter])
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

      <FilterMenu
        checked={selectedItems[filter]}
        items={searchResult} 
        filter={filter}
        multiSelect={true}
        handleItemClick={handleItemClick}
      />

        <Actions>
          <Button transparent={true} onClick={handleCancel}>CLEAR</Button>
          <Button transparent={true} text='green' onClick={handleApply}>APPLY</Button>
        </Actions>
    </Modal>
  )
}

export default contextWrapper(FilterModal)