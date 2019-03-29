import * as React from 'react'

import { Grid } from 'semantic-ui-react'
import PageTemplate from '@atomic/templates/PageTemplate/PageTemplate'
import Sidebar from '@atomic/organisms/Sidebar/Sidebar'
import Heading from '@atomic/atoms/Heading'
import Subheading from '@atomic/atoms/Subheading'
import Search from '@atomic/organisms/Search/Search'
import Block from '@atomic/atoms/Block/Block';
import Button from '@atomic/atoms/Button/Button';
import ButtonGroup from '@atomic/molecules/ButtonGroup/ButtonGroup';
import Table from '@atomic/molecules/Table/Table'
import TableRow from '@atomic/atoms/TableRow/TableRow'
import TableCell from '@atomic/atoms/TableCell/TableCell'

const HomePage: React.SFC<{}> = () => {
  return (
    <PageTemplate
    >
      <Heading level={1} palette='primary'>
        Assing Requests
        <Subheading palette='primary'>
          Use this page to assign documents requests for review.
        </Subheading>
      </Heading>

      <Grid.Column width={12}>
        <Block palette='primary'>
          <ButtonGroup>
            <Button>All</Button>

            <Button>Unassigned</Button>

            <Button>Assigned</Button>
          </ButtonGroup>

          <Block palette='primary'>
            <Search placeholder='Search' />
          </Block>

          <Block palette='primary'>
            <Button basic={true}>Assigned to</Button>

            <Button basic={true}>Doc. Type</Button>

            <Button basic={true}>Counterparty</Button>
          </Block>

          <Block palette='primary'>
            <Table>
              <TableRow>
                <TableCell heading={true}>1</TableCell>
                <TableCell heading={true}>2</TableCell>
                <TableCell heading={true}>3</TableCell>
              </TableRow>
            </Table>
          </Block>
        </Block>
      </Grid.Column>
      <Sidebar width={4}>Sidebar</Sidebar>
    </PageTemplate>
  )
}

export default HomePage