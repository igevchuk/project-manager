// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import * as React from 'react'
import styled from 'styled-components'
import IconInput from '@atomic/molecules/IconInput/IconInput';
import Icon from '@atomic/atoms/Icon/Icon';
import { contextWrapper } from './../../../app_modules/project-manager/ProjectManagerContext'

const StyledSearch = styled.div`
  &&& .ui.icon.input {
    height: 48px;
    line-height: 48px;
    input {
      border-radius: 0;
    }
  }
`

interface ISearchProps {
  placeholder?: string,
  handleSearch: (e: any, key: string) => void
}

const Search: React.SFC<ISearchProps> = ({...props}) => {
  return (
    <StyledSearch>
      <IconInput 
        icon={<Icon name='search' />} 
        fluid={true} 
        onChange={({ target }) => props.handleSearch(target.value, 'search')}
        {...props} 
      />
    </StyledSearch>
  )
}

export default contextWrapper(Search)