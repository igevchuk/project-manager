import styled from 'styled-components'
import { Table } from 'semantic-ui-react'
import * as theme from 'styled-theme'

const backgroundColor = ({ filled }) => theme.palette('grayscale', filled ? 6 : 0, true)
const backgroundColorSelected = () => theme.palette('grayscale', 7, true)
const hoverBackgroundColor = () => theme.palette('background', 6, true)

const TableRow = styled(Table.Row)`
  background-color: ${p => p.selected && backgroundColorSelected};
  &:hover {
    background-color: ${hoverBackgroundColor};
  }
`

export default TableRow
