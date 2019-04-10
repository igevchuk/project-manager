import * as React from 'react'
import styled from 'styled-components'
import Dropdown, { DropdownMenu } from '@atomic/organisms/Dropdown/Dropdown'
import MenuItem from '@atomic/atoms/MenuItem/MenuItem'

const StyledDropdown = styled(Dropdown)`
  &&& {
    min-width: 172px;
    padding-bottom: 7px;
    margin-top: 7px;
    border-bottom: 2px solid #9E9E9E;
    font-family: inherit;
    & .text {
      color: ${p => p.red && '#C62828'}
    }
    & .menu {
      min-width: 172px;
      margin-top: 2px;
      border-radius: 0;
    }
    & .dropdown.icon {
      position: absolute;
      right: 0;
      line-height: 19px;
      color: #9E9E9E;
    }
  }
`

const UserDropdown = ({contract, users, onChange, getFullName, ...props}) => (
  <StyledDropdown {...props}>
    <DropdownMenu>
      {
        users
          // .filter(user => user.id !== contract.assigned_negotiator)
          .map(user => (
            <MenuItem key={user.id} onClick={() => onChange(contract.id, user.id)}>
              { getFullName(user) }
            </MenuItem>
          ))
      }
    </DropdownMenu>
  </StyledDropdown> 
)

export default UserDropdown