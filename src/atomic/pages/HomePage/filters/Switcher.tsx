import * as React from 'react'
import styled from 'styled-components'
import Switcher from 'src/atomic/molecules/Switcher/Switcher'
import Button from 'src/atomic/atoms/Button/Button'
import { contextWrapper } from 'src/app_modules/project-manager/ProjectManagerContext'

const StyledSwitcher = styled(Switcher)`
`

export default contextWrapper(({ handleFilter, allResults, contracts, ...props }) => {
  const [ activeFilter, setActiveFilter ] = React.useState('')

  const handleClick = (value) => {
    setActiveFilter(value)
    handleFilter('assigned_negotiator__isnull', value)
  }

  const getFilterLabel = (assigned?: boolean): string => {
    const results = allResults || []
    switch(assigned) {
      case true: 
        return `Assigned (${results.filter(item => !!item.assigned_negotiator).length})`
      case false:
        return `Unassigned (${results.filter(item => item.assigned_negotiator === null).length})`
      default:
        return `All (${results.length})`
    }
  }

  const isActive = (value) => activeFilter === value
  
  return (
    <StyledSwitcher>
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
    </StyledSwitcher>
  )
})