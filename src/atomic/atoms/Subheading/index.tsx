import * as React from 'react'
import styled, { css } from 'styled-components'
import * as theme from 'styled-theme'

const styles = css`
  font-weight: normal;
  font-size: 1rem;
  line-height: 20px;
  margin-top: 8px;
  color: ${theme.palette({ grayscale: 1 }, 1)};
`

interface IHeadingProps {
  children: any,
}

const Subheading = styled(({
  children, theme, ...props
}) => React.createElement(`div`, props, children))`${styles}`

export default Subheading
