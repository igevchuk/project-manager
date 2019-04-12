import * as React from 'react'
import styled from 'styled-components'
import AverageWorkload from './AverageWorkload'
import Doughnut from 'src/atomic/molecules/Doughnut/Doughnut'
import Heading from 'src/atomic/atoms/Heading/Heading'
import Workload from './Workload'

const StyledSidebar = styled.div`
  position: relative;
  overflow: hidden;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
`

const SidebarBlock = styled.div`
  padding: 12px 24px;
  & h4 {
    color: #212121;
    font-size: 18px;
    font-weight: normal;
    line-height: 23px;
  }
  & h6 {
    color: #010101;
  }
`

const SidebarFooter = styled(SidebarBlock)`
  min-height: 60px;
  background: #F5F5F5;
  border-top: 1px solid #E0E0E0;
`

const Sidebar: React.SFC = ({ ...props }) => {
  return (
    <StyledSidebar {...props}>
      <SidebarBlock>
        <Heading level={4} palette='primary'>Negotiator Workload</Heading>
      </SidebarBlock>

      <Workload />

      <SidebarFooter>
        <AverageWorkload />
      </SidebarFooter>
    </StyledSidebar>
  )
}

export default Sidebar
