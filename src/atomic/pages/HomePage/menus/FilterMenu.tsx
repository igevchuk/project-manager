import * as React from 'react'
import styled from 'styled-components'
import Checkbox from '@atomic/atoms/Checkbox/Checkbox'
import Menu from '@atomic/organisms/Menu/Menu'
import MenuItem from '@atomic/atoms/MenuItem/MenuItem'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'

const FilterMenu = ({ checked, items, filters, multiSelect, handleItemClick, ...props}) => {
  const isChecked = (id) => !!checked.find(item => item === id)
  console.log(3535, checked)
  return (
    <Menu text={true} vertical={true} {...props}>
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
    </Menu>
  )
}

export default contextWrapper(FilterMenu)