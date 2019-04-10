import * as React from 'react'
import { Table } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

const styles = css`
  text-align: left;
  padding: .78571429em .78571429em;
`

const Th = styled(Table.HeaderCell)`
  text-transform: uppercase;
  color: #616161;	
  font-size: 12px;	
  font-weight: 500;
  cursor: ${p => !!p.onClick && 'pointer' };
  ${styles}
`

const Td = styled(Table.Cell)`
  &&& {
    color: #010101;	
    ${styles}
  }
`

interface ITableCellProps {
  heading?: boolean,
  children: any,
  sorted?: boolean,
  onClick?: (value?: any) => void
}

const TableCell: React.SFC<ITableCellProps> = ({ heading, children, ...props }) => {
  return React.createElement(heading ? Th : Td, props, children)
}

export default TableCell
