import * as React from 'react'
import { Table } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

const styles = css`
  text-align: left;
  padding: 0.75em;
`

const Th = styled(Table.HeaderCell)`${styles}`
// const Td = styled(Table.TableCell)`${styles}`

interface ITableProps {
  heading?: boolean,
  children: any,
}

const TableCell: React.SFC<ITableProps> = ({ heading, children, ...props }) => {
  return React.createElement(heading ? Th : Th, props, children)
}

export default TableCell
