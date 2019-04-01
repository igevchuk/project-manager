// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import * as React from 'react'
import styled from 'styled-components'
import { Container, Grid } from 'semantic-ui-react';
import { Provider, contextWrapper } from './../../../app_modules/project-manager/ProjectManagerContext'

const Wrapper = styled(Container)`
  padding-top: 3.75rem;
  min-height: 100vh;
  @media screen and (max-width: 640px) {
    padding-top: 3.25rem;
  }
`

const Header = styled.header``

const Content = styled(Grid.Column)``

const Sidebar = styled(Grid.Column)``

interface IPageTemplateProps {
  children: any,
  header?: boolean,
  sidebar?: boolean
}

const PageTemplate: React.SFC<IPageTemplateProps> = ({
  children, header, sidebar, ...props
}) => {
  return (
    <Wrapper {...props}>
      { header && <Header>{ header }</Header> }
      <Grid>
        <Content width={12}>{children}</Content>
        { sidebar && (
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>
        ) }
      </Grid>
    </Wrapper>
  )
}

export default contextWrapper(PageTemplate)
