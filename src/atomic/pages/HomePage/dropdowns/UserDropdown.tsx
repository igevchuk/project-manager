import * as React from 'react'
import styled from 'styled-components'
import Dropdown, { DropdownMenu } from 'src/atomic/organisms/Dropdown/Dropdown'
import MenuItem from 'src/atomic/atoms/MenuItem/MenuItem'

const StyledDropdown = styled(Dropdown)`
  &&& {
    min-width: 172px;
    padding-bottom: 7px;
    margin-top: 7px;
    border-bottom: 2px solid #9E9E9E;
    font-family: inherit;
    & .text {
      color: ${p => p.unassigned && '#C62828'}
    }
    & .unassigned {
      color: #C62828;
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

const UserDropdown = ({contract, users, onChange, getFullName, ...props}) => {
  const assignableUsers = users.filter(user => user.id !== contract.assigned_negotiator)
  const unassigned = !contract.assigned_negotiator

  const renderDropdown = () => {
    return !unassigned || assignableUsers.length 
  }

  if(!renderDropdown()) {
    return null
  }


  return (
    <StyledDropdown unassigned={unassigned} {...props}>
      <DropdownMenu>
        { contract.assigned_negotiator && (
          <MenuItem key='unassign' onClick={() => onChange(contract.id, contract.assigned_negotiator, true)}>
           <span className='unassigned'>Unassign</span>
          </MenuItem>)
        }
        {
          users
            .filter(user => user.id !== contract.assigned_negotiator)
            .map(user => (
              <MenuItem key={user.id} onClick={() => onChange(contract.id, user.id)}>
                { getFullName(user) }
              </MenuItem>
            ))
        }
      </DropdownMenu>
    </StyledDropdown> 
  )
}

export default UserDropdown