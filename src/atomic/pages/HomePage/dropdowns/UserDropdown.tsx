import * as React from 'react'
import styled from 'styled-components'
import Dropdown, { DropdownMenu } from '@atomic/organisms/Dropdown/Dropdown'
import MenuItem from '@atomic/atoms/MenuItem/MenuItem'

const UserDropdown = ({users, onChange, getFullName, ...props}) => (
  <Dropdown {...props}>
    <DropdownMenu>
      {
        users.map(user => (
          <MenuItem key={user.id} onClick={() => onChange(user.id)}>
            { getFullName(user) }
          </MenuItem>
        ))
      }
    </DropdownMenu>
  </Dropdown> 
)

export default UserDropdown