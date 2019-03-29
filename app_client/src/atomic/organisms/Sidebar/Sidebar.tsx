// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import * as React from 'react'
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

const StyledSidebar = styled(Grid.Column)``

interface ISidebarProps {
  width?: number
  children: React.ReactNode,
}

const Sidebar: React.SFC<ISidebarProps> = ({
  children, width, ...props
}) => {
  return (
    <StyledSidebar width={width}>{ children }</StyledSidebar>
  )
}

export default Sidebar