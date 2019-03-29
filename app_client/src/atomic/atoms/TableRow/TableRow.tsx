import styled from 'styled-components'
import { Table } from 'semantic-ui-react'
import * as theme from 'styled-theme'

const backgroundColor = ({ filled }) => theme.palette('grayscale', filled ? 1 : 0, true)

const TableRow = styled(Table.Row)`
  background-color: ${backgroundColor};
`

export default TableRow
