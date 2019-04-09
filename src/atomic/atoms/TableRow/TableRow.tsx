import styled from 'styled-components'
import { Table } from 'semantic-ui-react'
import * as theme from 'styled-theme'

const backgroundColor = ({ filled }) => theme.palette('grayscale', filled ? 6 : 0, true)
const backgroundColorSelected = () => theme.palette('grayscale', 7, true)
const hoverBackgroundColor = () => theme.palette('background', 6, true)

interface ITableRowProps {
  heading?: boolean,
  selected?: boolean
}

const TableRow = styled(Table.Row)<ITableRowProps>`
  background-color: ${p => p.heading && '#EEEEEE'};
  &:hover {
    background-color: ${hoverBackgroundColor};
  }
`

export default TableRow
