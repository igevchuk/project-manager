import * as React from 'react'
import Switcher from '@atomic/molecules/Switcher/Switcher'
import Button from '@atomic/atoms/Button/Button'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'


export default contextWrapper(({ handleFilter, contracts, ...props }) => {
  const [ activeFilter, setActiveFilter ] = React.useState('')

  const handleClick = (value) => {
    setActiveFilter(value)
    handleFilter('assigned_negotiator__isnull', value)
  }

  const getFilterLabel = (assigned?: boolean): string => {
    switch(assigned) {
      case true: 
        return `Assigned (${contracts.filter(contract => !!contract.assigned_negotiator).length})`
      case false:
        return `Unassigned (${contracts.filter(contract => contract.assigned_negotiator === null).length})`
      default:
        return `All (${contracts.length})`
    }
  }

  const isActive = (value) => activeFilter === value
  
  return (
    <Switcher>
      <Button active={isActive('')} onClick={() => handleClick('')}>
        { getFilterLabel() }
      </Button>
      <span className='divider' />
      <Button active={isActive('true')} onClick={() => handleClick('true')}>
        { getFilterLabel(false) }
      </Button>
      <span className='divider' />
      <Button active={isActive('false')} onClick={() => handleClick('false')}>
        { getFilterLabel(true) }
      </Button>
    </Switcher>
  )
})