import * as React from 'react'
import { Table } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

const styles = css`
  font-family: Roboto;
  text-align: left;
  padding: .78571429em .78571429em;
`

const Th = styled(Table.HeaderCell)`
  text-transform: uppercase;
  color: #616161;	
  font-size: 12px;	
  ${styles}
`

const Td = styled(Table.Cell)`
  color: #010101;	  
  ${styles}
`

interface ITableCellProps {
  heading?: boolean,
  children: any,
}

const TableCell: React.SFC<ITableCellProps> = ({ heading, children, ...props }) => {
  return React.createElement(heading ? Th : Td, props, children)
}

export default TableCell
