import * as React from 'react'
import styled from 'styled-components'
import Checkbox from 'src/atomic/atoms/Checkbox/Checkbox'
import Menu from 'src/atomic/organisms/Menu/Menu'
import MenuItem from 'src/atomic/atoms/MenuItem/MenuItem'
import { contextWrapper } from 'src/app_modules/project-manager/ProjectManagerContext'

const StyledMenu = styled(Menu)`
  &&& {
    width: 100%;
    &.ui.vertical.text.menu {
      margin: 0;
      & .item {
        padding: 1em 1.5em;
        margin: 0;
        border-top: 1px solid #F5F5F5;
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

const FilterMenu = ({ checked, items, filter, filters, multiSelect, handleItemClick, ...props}) => {
  const isChecked = (id) => !!checked.find(item => item === id)
  
  return (
    <StyledMenu text={true} vertical={true} {...props}>
      {
        items.map(item => (
          <MenuItem key={item.id} link={true} onClick={() => multiSelect ? false : handleItemClick(item.id)}>
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