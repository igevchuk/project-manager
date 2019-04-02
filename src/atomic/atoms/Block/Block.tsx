import * as React from 'react'
import styled from 'styled-components'
import * as theme from 'styled-theme'

const StyledBlock = styled.div`
  font-family: ${theme.font('primary')};
  color: ${theme.palette({ grayscale: 0 }, 1)};
`
interface IBlockProps {
  children: any,
  palette?: string
}

const Block: React.SFC<IBlockProps> = ({ children, ...props }) => (
  <StyledBlock {...props}>{ children }</StyledBlock>
)

export default Block
