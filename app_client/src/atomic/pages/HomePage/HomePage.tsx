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
import Switcher from '@atomic/molecules/Switcher/Switcher';

const HomePage: React.SFC<{}> = () => {
  return (
    <PageTemplate
      sidebar={true}
    >
      <Heading level={1} palette='primary'>
        Assing Requests
        <Subheading palette='primary'>
          Use this page to assign documents requests for review.
        </Subheading>
      </Heading>

      {/* <Grid.Column width={12}> */}
        <Block palette='primary'>
          <Switcher>
            <Button>All</Button>

            <Button>Unassigned</Button>

            <Button>Assigned</Button>
          </Switcher>

          <Block palette='primary'>
            <Search placeholder='Search' />
          </Block>

          <Block palette='primary'>
            <Button basic={true}>Assigned to</Button>

            <Button basic={true}>Doc. Type</Button>

            <Button basic={true}>Counterparty</Button>
          </Block>

          <Block palette='grayscale'>
            <Table>
              <TableRow palette='grayscale'>
                <TableCell heading={true}>Req. ID</TableCell>
                <TableCell heading={true}>Conuterparty</TableCell>
                <TableCell heading={true}>Prod. Type</TableCell>
                <TableCell heading={true}>Date Submitted</TableCell>
                <TableCell heading={true}>Status</TableCell>
                <TableCell heading={true}>Assigned To</TableCell>
                <TableCell heading={true}>&nbsp;</TableCell>
              </TableRow>

              <TableRow palette='grayscale' selected={true}>
                <TableCell>Req. ID</TableCell>
                <TableCell>Conuterparty</TableCell>
                <TableCell>Prod. Type</TableCell>
                <TableCell>Date Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </Table>
          </Block>
        </Block>
      {/* </Grid.Column> */}
      
    </PageTemplate>
  )
}

export default HomePage