import * as React from 'react'
import styled from 'styled-components'
import Doughnut from '@atomic/molecules/Doughnut/Doughnut'
import Heading from '@atomic/atoms/Heading/Heading'
import Search from '@atomic/organisms/Search/Search'
import { contextWrapper } from './../../../app_modules/project-manager/ProjectManagerContext'

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

interface ISidebarProps {
  content?: any
}

const Sidebar: React.SFC<ISidebarProps> = ({ content, ...props }) => {
  return (
    <StyledSidebar {...props}>
      <SidebarBlock>
        <Heading level={4} palette='primary'>Reviewer Workload</Heading>
      </SidebarBlock>

      <SidebarBlock feature={true}>
        {/* <Search handleSearch={(e) => console.log(e)} /> */}
      </SidebarBlock>

      <SidebarBlock>
        { content && content }
      </SidebarBlock>

      <SidebarFooter feature={true}>
        Footer
      </SidebarFooter>
       
    </StyledSidebar>
  )
}

// export default contextWrapper(Sidebar)
export default Sidebar
