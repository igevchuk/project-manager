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

const FilterModal = ({ 
  children, 
  items, 
  filter, 
  handleFilter, 
  onApply, 
  onClose, 
  ...props
}) => {

  const [ selectedItems, setSelectedItems ] = React.useState(
    Object.keys(items).reduce((accum, current) => {
      accum[current] = []
      return accum
    }, {})
  )

  // React.useEffect(() => {
  //   React.useState(
  //     Object.keys(items).reduce((accum, current) => {
  //       accum[current] = []
  //       return accum
  //     }, {})
  // }, [items])

  console.log(45, selectedItems)

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
        <ModalBase.Content>
          <ModalBase.Description>
            <FilterMenu
              checked={selectedItems[filter]}
              items={searchResult} 
              multiSelect={true}
              handleItemClick={handleItemClick}
            />
          </ModalBase.Description>
        </ModalBase.Content>
        <ModalBase.Actions>
          <Button transparent={true} onClick={handleCancel}>Cancel</Button>
          <Button transparent={true} onClick={handleApply}>Apply</Button>
        </ModalBase.Actions>
    </Modal>
  )
}

export default contextWrapper(FilterModal)