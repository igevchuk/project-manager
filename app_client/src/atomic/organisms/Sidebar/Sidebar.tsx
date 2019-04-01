// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import * as React from 'react'
import styled from 'styled-components'

const StyledSidebar = styled.div``

const Sidebar: React.SFC<{}> = ({...props}) => {
  return (
    <StyledSidebar {...props}>Sidebar</StyledSidebar>
  )
}

export default Sidebar