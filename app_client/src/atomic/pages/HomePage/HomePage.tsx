import * as React from 'react'

import { Grid } from 'semantic-ui-react'
import PageTemplate from '@atomic/templates/PageTemplate/PageTemplate'
import Sidebar from '@atomic/organisms/Sidebar/Sidebar'
import Heading from '@atomic/atoms/Heading/Heading'
import Subheading from '@atomic/atoms/Subheading'
import Search from '@atomic/organisms/Search/Search'
import Block from '@atomic/atoms/Block/Block';
import Button from '@atomic/atoms/Button/Button';
import ButtonGroup from '@atomic/molecules/ButtonGroup/ButtonGroup'
import Checkbox from '@atomic/atoms/Checkbox/Checkbox'
import Icon from '@atomic/atoms/Icon/Icon'
import Label from '@atomic/atoms/Label/Label'
import LabelGroup from '@atomic/molecules/LabelGroup/LabelGroup'
import Table from '@atomic/molecules/Table/Table'
import TableRow from '@atomic/atoms/TableRow/TableRow'
import TableCell from '@atomic/atoms/TableCell/TableCell'
import Switcher from '@atomic/molecules/Switcher/Switcher';

import { Provider, contextWrapper } from './../../../app_modules/project-manager/ProjectManagerContext'
import contractReducer, { initialState } from './../../../app_modules/project-manager/redux/reducer'
import { IState, contract } from './../../../app_modules/project-manager/redux/state'
import * as actions from './../../../app_modules/project-manager/redux/actions'

interface IHomePageProps {
  contracts: contract[],
  error: string,
  isLoading: boolean
}

const HomePage: React.SFC<IHomePageProps> = (props) => {
  const [contractState, contractDispatch] = React.useReducer(contractReducer, {
    ...initialState,
    contracts: props.contracts,
    error: props.error,
    isLoading: props.isLoading
  });

  const { contracts, error, isLoading } = props

  console.log(111, props)

  return (
    <Provider value={{ ...props }}>
      <PageTemplate sidebar={true}>
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
            <LabelGroup>
              <Label>Assigned to</Label>

              <Label>Doc. Type</Label>

              <Label>Counterparty</Label>
            </LabelGroup>
          </Block>

          <Block palette='grayscale'>
            <Table>
              <TableRow palette='grayscale'>
                <TableCell heading={true}>&nbsp;</TableCell>
                <TableCell heading={true}>Req. ID</TableCell>
                <TableCell heading={true}>Conuterparty</TableCell>
                <TableCell heading={true}>Prod. Type</TableCell>
                <TableCell heading={true}>Date Submitted</TableCell>
                <TableCell heading={true}>Status</TableCell>
                <TableCell heading={true}>Assigned To</TableCell>
                <TableCell heading={true}>
                  <Icon link={true} name='ellipsis vertical' />
                </TableCell>
              </TableRow>
              {
                contracts.map(contract => (
                  <TableRow palette='grayscale' selected={true}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{ contract.id }</TableCell>
                    <TableCell>{ contract.counterparty_name }</TableCell>
                    <TableCell>{ contract.product_type }</TableCell>
                    <TableCell>{ contract.created }</TableCell>
                    <TableCell>{ contract.document_request_id }</TableCell>
                    <TableCell>{ contract.assigned_negotiator }</TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                ))
              }
            </Table>
          </Block>
        </Block>
      {/* </Grid.Column> */}
      
    </PageTemplate>
    </Provider>
  )
}

export default contextWrapper(HomePage)