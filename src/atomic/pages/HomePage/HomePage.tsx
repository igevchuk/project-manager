import * as React from 'react'
import styled from 'styled-components';

import { Grid, ItemDescription } from 'semantic-ui-react'
import Workload from './charts/Workload'
import PageTemplate from '@atomic/templates/PageTemplate/PageTemplate'
import Sidebar from '@atomic/organisms/Sidebar/Sidebar'
import Heading from '@atomic/atoms/Heading/Heading'
import Subheading from '@atomic/atoms/Subheading'
import Search from '@atomic/organisms/Search/Search'
import Button from '@atomic/atoms/Button/Button';
import ButtonGroup from '@atomic/molecules/ButtonGroup/ButtonGroup'
import Checkbox from '@atomic/atoms/Checkbox/Checkbox'
import Dropdown, { DropdownMenu } from '@atomic/organisms/Dropdown/Dropdown'
import UserDropdown from './dropdowns/UserDropdown'
import Icon from '@atomic/atoms/Icon/Icon'
import LabelGroup from '@atomic/molecules/LabelGroup/LabelGroup'
import Loader from '@atomic/atoms/Loader/Loader'
import Metadata from '@atomic/atoms/Metadata/Metadata'
import IconLabel from '@atomic/molecules/IconLabel/IconLabel'
import MenuItem from '@atomic/atoms/MenuItem/MenuItem'
import Table from '@atomic/molecules/Table/Table'
import TableRow from '@atomic/atoms/TableRow/TableRow'
import TableCell from '@atomic/atoms/TableCell/TableCell'
import MultiSelect from './filters/MultiSelect'
import Switcher from './filters/Switcher';

import { Provider, contextWrapper } from './../../../app_modules/project-manager/ProjectManagerContext'
import contractReducer, { initialState } from './../../../app_modules/project-manager/redux/reducer'
import { IState, contract, user, workload as workloadModel } from './../../../app_modules/project-manager/redux/state'
import * as actions from './../../../app_modules/project-manager/redux/actions'
import { object } from 'prop-types';
import FilterMenu from './menus/FilterMenu';
import UsersModal from './modals/UsersModal';
import FilterModal from './modals/FilterModal';
import BulkAssignModal from './modals/BulkAssignModal';

const Block = styled.div`
  display: block;
  margin-bottom: 16px;
`

const Flex = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
`

interface IHomePageProps {
  contracts: contract[],
  counterparties: string[],
  error: string,
  isLoading: boolean,
  templates: any[],
  users: user[],
  workload: workloadModel,
  handleFilter: (key: string, value: string | number | any[]) => void,
  handleUpdate: (value: {}) => void,
}

const HomePage: React.SFC<IHomePageProps> = (props) => {
  const [contractState, contractDispatch] = React.useReducer(contractReducer, {
    ...initialState,
    contracts: props.contracts,
    error: props.error,
    // isLoading: props.isLoading
  });

  const [openBulkAssign, setOpenBulkAssign] = React.useState(false)
  const [openUserMenu, setOpenUserMenu] = React.useState(false)
  const [openFilters, setOpenFilters] = React.useState('')
  const [selectedContracts, setSelectedContracts] = React.useState([])
  const [selectedUsers, setSelectedUsers] = React.useState([])
  const [selectedColumns, setSelectedColumns] = React.useState([])
  // const [ filterItems, setFilterItems ] = React.useState(null)

  const { 
    contracts, 
    counterparties,
    error, 
    isLoading, 
    templates,
    users,
    workload,
    handleFilter, 
    handleUpdate
  } = props


  const handleSearch = (value) => {
    handleFilter('search', value)
  }

  const handleSelectContracts = (id) => {
    const nextValues = !!selectedContracts.find(selected => selected === id) 
        ? selectedContracts.filter(selected => selected !== id) 
        : [...selectedContracts, id]

    setSelectedContracts(nextValues)
  }

  const handleSelectColumns = column => {
    if(isChecked(column, selectedColumns)) {
      setSelectedColumns([...selectedColumns.filter(value => value === column)])
    } else {
      setSelectedColumns([...selectedColumns, column])
    }
  }

  const handleApplyFilters = (name, values) => {
    handleFilter(name, values)
  }

  const handleAssignUser = userId => {
    const data = { assigned_negotiator: userId, contracts: selectedContracts }
    handleUpdate(data)
  }

  const handleSelectUsers = userId => {
    if(isChecked(userId, selectedUsers)) {
      setSelectedUsers([...selectedUsers.filter(value => value === userId)])
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const isChecked = (id, values) => !!values.find(
    value => typeof value === 'object' ? value.id === id : value === id
  )

  const getFullName = ({first_name, last_name}) => `${first_name} ${last_name}`

  const getNegotiator = id => users.find(user => user.id === id)

  const getNegotiatorLabel = ({ assigned_negotiator }) => {
    if(assigned_negotiator) {
      const negotiator = getNegotiator(assigned_negotiator)
      return !!negotiator ? getFullName(negotiator) : 'Unassigned'
    }
    return 'Unassigned'
  }

  const handleOpenFilters = (name: string): void => {
    setOpenFilters(name)
  }

  const filterItems = {
    assigned_negotiator: users.map(user => ({ id: user.id, label: getFullName(user)})),
    counterparty_name: counterparties.map((counterparty, index) => ({ id: index, label: counterparty})),
    product_type: templates.map(template => ({ id: template.id, label: template.name}))
  }

  const handleCloseFilters = () => {
    setOpenFilters('')
  }

  return (
    <Provider value={{ ...props }}>
      {/* <PageTemplate sidebar={<Sidebar content={<Workload workload={workload} />} />} > */}
      <PageTemplate>
        {
          !!filterItems[openFilters] && filterItems[openFilters].length > 0 ? (
            <FilterModal 
              open={!!openFilters}
              items={filterItems}
              filter={openFilters}
              onApply={() => setOpenFilters('')}
              onClose={handleCloseFilters}
            />
          ) : null
        }

        {
          !!users && users.length > 0 ? (
            <BulkAssignModal 
              open={openBulkAssign}
              items={users}
              selectedContracts={selectedContracts}
              onClose={() => setOpenBulkAssign(false)}
            />
          ) : null
        }
        <Heading level={1} palette='grayscale'>
          Assing Requests
          <Subheading palette='grayscale'>
            Use this page to assign documents requests for review.
          </Subheading>
        </Heading>

        <Flex>
          <Switcher />
          {
            selectedContracts.length > 1 && (
              <div>
                <Button onClick={() => setSelectedContracts([])}>Cancel</Button>
                <Button onClick={() => setOpenBulkAssign(true)}>Assign</Button>
              </div>
            )
          }
        </Flex>

        <Block>
          <Search iconPosition='left' placeholder='Search' size='large' handleSearch={handleSearch} />
        </Block>

        <Block>
          <MultiSelect onClick={handleOpenFilters} onDelete={handleCloseFilters} />
        </Block>

        <Block>
          {
            isLoading ? <Loader /> : (
              <React.Fragment>
                <Metadata>
                  Showing {contracts.length} { contracts.length !== 1 ? 'records' : 'record' }
                </Metadata>
                <Table>
                    <TableRow palette='grayscale' key='heading'>
                      <TableCell heading={true} key='check'>&nbsp;</TableCell>
                      <TableCell heading={true} key='id'>Req. ID</TableCell>
                      <TableCell heading={true} key='counterparty_name'>Counterparty</TableCell>
                      <TableCell heading={true} key='product_type'>Prod. Type</TableCell>
                      <TableCell heading={true} key='created'>Date Submitted</TableCell>
                      <TableCell heading={true} key='document_request_id'>Status</TableCell>
                      <TableCell heading={true} key='assigned_negotiator'>Assigned To</TableCell>
                      <TableCell heading={true} key='more'>
                        <Icon link={true} name='ellipsis vertical' />
                      </TableCell>
                    </TableRow>
                    {
                      contracts.map(contract => (
                        <TableRow palette='grayscale' selected={true} key={contract.id}>
                          <TableCell key='check'>
                            <Checkbox 
                              checked={isChecked(contract.id, selectedContracts)} 
                              onChange={() => handleSelectContracts(contract.id)}
                              />
                          </TableCell>
                          <TableCell key='id'>{ contract.id }</TableCell>
                          <TableCell key='counterparty_name'>{ contract.counterparty_name }</TableCell>
                          <TableCell key='product_type'>{ contract.product_type }</TableCell>
                          <TableCell key='created'>{ contract.created }</TableCell>
                          <TableCell key='document_request_id'>{ contract.document_request_id }</TableCell>
                          <TableCell key='assigned_negotiator'>
                            <UserDropdown 
                              text={getNegotiatorLabel(contract)}
                              onClose={() => setSelectedContracts([...selectedContracts.filter(item => item.id === contract.id)])}
                              onOpen={() => setSelectedContracts([...selectedContracts, contract.id])}
                              users={users}
                              onChange={handleAssignUser}
                              getFullName={getFullName}
                            />
                          </TableCell>
                          <TableCell key='more'>&nbsp;</TableCell>
                        </TableRow>
                      ))
                    }
                  </Table>
              </React.Fragment>
            )
          }
        </Block>
    </PageTemplate>
    </Provider>
  )
}

export default contextWrapper(HomePage)