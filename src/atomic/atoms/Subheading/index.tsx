import * as React from 'react'
import styled, { css } from 'styled-components'
import * as theme from 'styled-theme'

const fontSize = ({ level }) => `${0.75 + (1 * (1 / level))}rem`

const styles = css`
  font-family: ${theme.font('primary')};
  font-weight: 500;
  /* font-size: ${fontSize}; */
  font-size: 1rem;
  margin: 0;
  margin-top: 0.85714em;
  margin-bottom: 0.57142em;
  /* color: ${theme.palette({ grayscale: 0 }, 1)}; */
`

interface IHeadingProps {
  // level: number,
  children: any,
}

const Subheading = styled(({
  children, theme, ...props
}) => React.createElement(`div`, props, children))`${styles}`

export default Subheading
