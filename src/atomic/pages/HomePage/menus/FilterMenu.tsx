import * as React from 'react'
import styled from 'styled-components'
import Checkbox from '@atomic/atoms/Checkbox/Checkbox'
import Menu from '@atomic/organisms/Menu/Menu'
import MenuItem from '@atomic/atoms/MenuItem/MenuItem'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'

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

const FilterMenu = ({ checked, items, filter, filters, multiSelect, handleItemClick, ...props}) => {
  const isChecked = (id) => !!checked.find(item => item === id)
  
  return (
    <StyledMenu text={true} vertical={true} {...props}>
      {
        items.map(item => (
          <MenuItem key={item.id} onClick={() => multiSelect ? false : handleItemClick(item.id)}>
            {
              multiSelect && (
                <Checkbox checked={isChecked(item.id)} onChange={() => handleItemClick(item.id)} />
              )
            }
            { item.label }
          </MenuItem>
        ))
      }
    </StyledMenu>
  )
}

export default contextWrapper(FilterMenu)