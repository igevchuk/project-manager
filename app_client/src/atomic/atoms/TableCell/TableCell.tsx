import * as React from 'react'
import { Table } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

const styles = css`
  text-align: left;
  padding: 0.75em;
`

const Th = styled(Table.HeaderCell)`
  font-weight: bold;
  text-transform: uppercase;
  ${styles}
`

const Td = styled(Table.Cell)`${styles}`

interface ITableCellProps {
  heading?: boolean,
  children: any,
}

const TableCell: React.SFC<ITableCellProps> = ({ heading, children, ...props }) => {
  return React.createElement(heading ? Th : Td, props, children)
}

export default TableCell
