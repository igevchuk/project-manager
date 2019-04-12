// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import * as React from 'react'
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react';
import { Provider, contextWrapper } from 'src/app_modules/project-manager/ProjectManagerContext'

const Wrapper = styled.div`
  width: 1295px;
  margin: 0 auto;
  padding-top: 3.75rem;
  min-height: 100vh;
  @media screen and (max-width: 640px) {
    padding-top: 3.25rem;
  }
`

const Header = styled.header``

const Content = styled(Grid.Column)``

interface IPageTemplateProps {
  children: any,
  header?: boolean,
  sidebar?: React.ReactNode
}

const PageTemplate: React.SFC<IPageTemplateProps> = ({
  children, header, sidebar, ...props
}) => {
  return (
    <Wrapper {...props}>
      { header && <Header>{ header }</Header> }
      <Grid>
        <Content width={11}>{children}</Content>
        { sidebar && (
          <Grid.Column width={5}>
            { sidebar }
          </Grid.Column>
        ) }
      </Grid>
    </Wrapper>
  )
}

export default contextWrapper(PageTemplate)
