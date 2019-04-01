// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import * as React from 'react'
import styled from 'styled-components'
import IconInput from '@atomic/molecules/IconInput/IconInput';
import Icon from '@atomic/atoms/Icon/Icon';

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
  placeholder?: string
}

const Search: React.SFC<ISearchProps> = ({...props}) => (
  <StyledSearch>
    <IconInput icon={<Icon name='search' />} fluid={true} {...props} />
  </StyledSearch>
)

export default Search