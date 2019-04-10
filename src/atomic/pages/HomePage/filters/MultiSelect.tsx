import * as React from 'react'
import styled from 'styled-components'
import Icon from '@atomic/atoms/Icon/Icon'
import IconLabel from '@atomic/molecules/IconLabel/IconLabel'
import LabelGroup from '@atomic/molecules/LabelGroup/LabelGroup'
import { Cancel } from '@material-ui/icons'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'

const StyledLabelGroup = styled(LabelGroup)`
  display: flex;
  justify-content: space-between;
`

const StyledIconLabel = styled(IconLabel)`
  opacity: ${p => p.disabled && 0.5};
  pointer-events: ${p => p.disabled && 'none'};
  position: relative;
  && {
    border: ${p => p.noBorder && 'none'};
    background: ${p => p.noBorder && 'none'};
  }
  &.active {
    background: #FFFFFF;
  }
  & svg {
    margin-left: ${p => p.iconPosition === 'left' && '6px'};
    margin-right: ${p => p.iconPosition === 'right' && '6px'};
  }
`

const MultiSelect = ({ filters, onClick, onDelete, applyBulkFilters, handleFilter, ...props}) => {
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

  const clearAll = () => {
    const resetData = activeFilters.reduce((accum, curr) => {
      accum[curr] = []
      return accum
    }, {})
    
    applyBulkFilters(resetData)
    setActiveFilters([])
  }

  const renderLabel = (value, label) => {
    
    return (
      <StyledIconLabel onClick={() => handleClick(value)} active={isActive(value)} disabled={isDisabled(value)} iconPosition='left'>
        { label } { isActive(value) && <Cancel onClick={(e) => handleDelete(e, value)} /> }
      </StyledIconLabel>
    )
  }

  return (
    <StyledLabelGroup>
      <div>
        { renderLabel('assigned_negotiator', 'Assigned to') }
        { renderLabel('product_type', 'Doc. Type') }
        { renderLabel('counterparty_name', 'Counterparty') }
      </div>
      {
        activeFilters.length > 0 && (
          <div>
            <StyledIconLabel active={true} iconPosition='right' noBorder={true}>
              <Cancel onClick={clearAll} /> Clear All
            </StyledIconLabel>
          </div>
        )
      }
    </StyledLabelGroup>
  )
}

export default contextWrapper(MultiSelect)