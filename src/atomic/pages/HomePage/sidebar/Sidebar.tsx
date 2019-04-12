import * as React from 'react'
import styled from 'styled-components'
import Doughnut from 'src/atomic/molecules/Doughnut/Doughnut'
import Heading from 'src/atomic/atoms/Heading/Heading'
import AverageWorkload from './AverageWorkload'
import Workload from './Workload'

const StyledSidebar = styled.div`
  position: relative;
  border: 1px solid #E0E0E0;
  overflow: hidden;
`

const SidebarBlock = styled('div')<{feature?: boolean}>`
  padding: 12px 24px;
  background-color: ${p => p.feature ? '#F5F5F5' : '#FFFFFF'};
  border-top: 1px solid #E0E0E0;
  && ${Heading} {
    font-weight: bold;
  }
`
const SidebarSearch = styled.div`
  background-color: #F5F5F5;
  border-top: 1px solid #E0E0E0;;
`
const SidebarContent = styled.div`
  /* max-height: 400px; */
  overflow-y: auto;
`
const SidebarFooter = styled(SidebarBlock)`
  /* position: absolute; */
  min-height: 60px;
  bottom: 0;
  /* margin-top: 60px; */
`

const Sidebar: React.SFC = ({ ...props }) => {
  return (
    <StyledSidebar {...props}>
      
      <SidebarBlock>
        <Heading level={4} palette='primary'>Reviewer Workload</Heading>
      </SidebarBlock>

      <Workload />

      <SidebarFooter feature={true}>
        <AverageWorkload />
      </SidebarFooter>
    </StyledSidebar>
  )
}

export default Sidebar
