// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import * as React from 'react'
import styled from 'styled-components'
import Heading from '@atomic/atoms/Heading/Heading'
import Search from '@atomic/organisms/Search/Search'

const StyledSidebar = styled.div`
  position: relative;
  border: 1px solid #E0E0E0;
  overflow: hidden;
`

const Block = ({ children, ...props}) => <div {...props}>{ children }</div>

const SidebarBlock = styled(Block)`
  padding: 12px 24px;
  background-color: ${p => p.feature ? '#F5F5F5' : '#FFFFFF'};
  border-top: 1px solid #E0E0E0;
`

const SidebarHeader = styled.div``

const SidebarSearch = styled.div`
  background-color: #F5F5F5;
  border-top: 1px solid #E0E0E0;;
`

const SidebarContent = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const SidebarFooter = styled(SidebarBlock)`
  position: absolute;
  /* min-height: 60px; */
  bottom: 0;
  margin-top: 60px;
`


const Sidebar: React.SFC<{}> = ({...props}) => {
  return (
    <StyledSidebar {...props}>
      <SidebarBlock>
        <Heading level={4} palette='primary'>Reviewer Workload</Heading>
      </SidebarBlock>

      <SidebarBlock feature={true}>
        <Search />
      </SidebarBlock>

      <SidebarBlock>
        Content
      </SidebarBlock>

      <SidebarFooter feature={true}>
        Footer
      </SidebarFooter>
       
    </StyledSidebar>
  )
}

export default Sidebar