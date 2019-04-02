import * as React from 'react'
import styled from 'styled-components'
import { Table as TableBase } from 'semantic-ui-react'
import * as theme from 'styled-theme'

// import { Caption } from 'components'

const StyledTable = styled(TableBase)`
  && {
    font-family: ${theme.font('primary')};
    /* border: 1px solid ${theme.palette('grayscale', 5, true)};
     */
    border: 1px solid #e0e0e0;
    border-radius: 0;
    color: ${theme.palette('grayscale', 0)};
  }
`
interface ITableProps {
  caption?: string,
  head?: React.ReactNodeArray,
  children: any,
}

const Table: React.SFC<ITableProps> = ({
  caption, head, children, ...props
}) => (
  <StyledTable {...props}>
    {/* {caption && <Caption reverse={reverse}>{caption}</Caption>} */}
    {/* {head && <thead>{head}</thead>} */}
    <tbody>{children}</tbody>
  </StyledTable>
)

export default Table
