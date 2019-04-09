import * as React from 'react'
import styled from 'styled-components'
import Icon from '@atomic/atoms/Icon/Icon'
import IconLabel from '@atomic/molecules/IconLabel/IconLabel'
import LabelGroup from '@atomic/molecules/LabelGroup/LabelGroup'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'

const Delete = styled(Icon)`
  &&&& {
    font-size: 12px;
    opacity: 1;
  }
`

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

  const isDisabled = (value) => {
    const items = value === 'assigned_negotiator' ? [...props.users] : (
      value === 'product_type' ? [...props.templates] : [...props.counterparties]
    )

    return items.length === 0
  }

  const renderLabel = (value, label) => {
    
    return (
      <IconLabel onClick={() => handleClick(value)} active={isActive(value)} disabled={isDisabled(value)}>
      { label } { isActive(value) && <Delete name='delete' onClick={(e) => handleDelete(e, value)} /> }
      </IconLabel>
    )
  }

  return (
    <LabelGroup>
      { renderLabel('assigned_negotiator', 'Assigned to') }
      { renderLabel('product_type', 'Doc. Type') }
      { renderLabel('counterparty_name', 'Counterparty') }
    </LabelGroup>
  )
}

export default contextWrapper(MultiSelect)