import * as React from 'react'
import styled, { css } from 'styled-components'
import * as theme from 'styled-theme'

const fontSize = ({ level }) => level === 1 ? '36px' : `${0.75 + (1 * (1 / level))}rem`

const styles = css`
  font-weight: 300;
  font-size: ${fontSize};
  line-height: 40px;
  margin: 0;
  margin-top: 0.85714em;
  margin-bottom: 21px;
  color: #212121;
  letter-spacing: normal;
`

interface IHeadingProps {
  level: number,
  children: any,
  palette?: string,
  reverse?: boolean,
}

const Heading = styled(({
  level, children, theme, palette, reverse, ...props
}) => React.createElement(`h${level}`, props, children))`${styles}`

export default Heading
