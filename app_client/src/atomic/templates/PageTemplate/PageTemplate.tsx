// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import * as React from 'react'
import styled from 'styled-components'
import { size } from 'styled-theme'
import { Container, Grid } from 'semantic-ui-react';

const Wrapper = styled(Container)`
  padding-top: 3.75rem;
  min-height: 100vh;
  @media screen and (max-width: 640px) {
    padding-top: 3.25rem;
  }
`

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`

const Content = styled(Grid)`
`

const Footer = styled.footer`
  margin-top: auto;
`

interface IPageTemplateProps {
  // header: PropTypes.node.isRequired,
  children: any,
}

const PageTemplate: React.SFC<IPageTemplateProps> = ({
  children, ...props
}) => {
  return (
    <Wrapper {...props}>
      <Content>{children}</Content>
    </Wrapper>
  )
}

export default PageTemplate
