import * as React from 'react'
import styled from 'styled-components'
import IconInput from '@atomic/molecules/IconInput/IconInput';
import Icon from '@atomic/atoms/Icon/Icon';
import { contextWrapper } from './../../../app_modules/project-manager/ProjectManagerContext'

const StyledSearch = styled('div')<{noBorder?: boolean, size?: string}>`
  &&& .ui.icon.input {
    height: ${p => p.size === 'large' ? '48px' : '36px'};
    line-height: ${p => p.size === 'large' ? '48px' : '36px'};
    input {
      font-size: 14px;
      border-radius: 0;
      border: ${p => p.noBorder && 'none'};
    }
    i {
      font-size: 14px;
    }
  }
`

interface ISearchProps {
  children?: React.ReactNode,
  noBorder?: boolean,
  icon?: React.ReactNode,
  iconPosition?: string,
  fluid?: boolean,
  placeholder?: string,
  size?: string,
  handleSearch: (e: any, key?: string, search?: boolean) => void
}

const Search: React.SFC<ISearchProps> = ({ handleSearch, ...props }) => {
  return (
    <StyledSearch className='search' {...props}>
      <IconInput 
        icon={<Icon name='search' />} 
        fluid={true} 
        placeholder={ props.placeholder || 'Search' }
        onChange={({ target }) => handleSearch(target.value, 'search', true)}
        {...props} 
      />
    </StyledSearch>
  )
}

// export default contextWrapper(Search)
export default Search