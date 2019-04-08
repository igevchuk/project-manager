import * as React from 'react'
import Icon from '@atomic/atoms/Icon/Icon'
import IconLabel from '@atomic/molecules/IconLabel/IconLabel'
import LabelGroup from '@atomic/molecules/LabelGroup/LabelGroup'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'

const MultiSelect = ({ filters, onClick, onDelete, handleFilter, ...props}) => {
  const [ activeFilters, setActiveFilters ] = React.useState([])
  const isActive = (key) => !!filters && filters[key] && filters[key].length > 0

  const handleClick = (value: string | number): void => {
    const nextValues = !!activeFilters.find(active => active === value) 
      ? [...activeFilters]
      : [...activeFilters, value]

    setActiveFilters(nextValues)
    onClick(value)
  }

  const handleDelete = (e, value) => {
    e.stopPropagation()
    setActiveFilters([...activeFilters.filter(active => active !== value)])
    handleFilter(value, [])
  }

  return (
    <LabelGroup>
      <IconLabel onClick={() => handleClick('assigned_negotiator')}>
        Assigned to { isActive('assigned_negotiator') && <Icon name='delete' onClick={(e) => handleDelete(e, 'assigned_negotiator')} /> }
      </IconLabel>

      <IconLabel onClick={() => handleClick('product_type')}>
        Doc. Type { isActive('product_type') && <Icon name='delete' onClick={(e) => handleDelete(e, 'product_type')} /> }
      </IconLabel>

      <IconLabel onClick={() => handleClick('counterparty_name')}>
        Counterparty { isActive('counterparty_name') && <Icon name='delete' onClick={(e) => handleDelete(e, 'counterparty')} /> }
      </IconLabel>
    </LabelGroup>
  )
}

export default contextWrapper(MultiSelect)