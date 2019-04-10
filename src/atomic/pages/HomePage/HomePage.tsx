import * as React from 'react'
import styled from 'styled-components'
import * as moment from 'moment'
import * as _ from 'lodash'

import { Grid, ItemDescription } from 'semantic-ui-react'
import AverageWorkload from './charts/AverageWorkload'
import BulkActionButton from './buttons/BulkActionButton'
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
import IconButton from '@atomic/molecules/IconButton/IconButton'
import LabelGroup from '@atomic/molecules/LabelGroup/LabelGroup'
import Loader from '@atomic/atoms/Loader/Loader'
import Message from '@atomic/atoms/Message/Message'
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
import { Close } from '@material-ui/icons'

const Block = styled.div`
  display: block;
  margin-bottom: 16px;
`

const Flex = styled('div')`
  display: flex;
  justify-content: space-between;
`

const HoverTableRow = styled(TableRow)`
  & .checkbox {
    opacity: ${p => !p.selected && 0};
    transition: opacity 0.3s;
  }
  &:hover .checkbox {
    opacity: 1;
  }
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
  });

  const [openBulkAssign, setOpenBulkAssign] = React.useState(false)
  const [openUserMenu, setOpenUserMenu] = React.useState(false)
  const [openFilters, setOpenFilters] = React.useState('')
  const [selectedContracts, setSelectedContracts] = React.useState([])
  const [selectedUsers, setSelectedUsers] = React.useState([])
  const [selectedColumns, setSelectedColumns] = React.useState([])
  const [ ordering, setOrdering ] = React.useState({
    column: null, direction: null
  })
  const [ results, setResults ] = React.useState([])

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

  React.useEffect(() => {
    setResults([...contracts])
  }, [contracts])


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

  const handleAssignUser = (contractId, userId) => {
    const data = { assigned_negotiator: userId, contracts: [contractId] }
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

  const getMetadataLabel = () => {
    if(selectedContracts.length) {
      return `${selectedContracts.length} ${ selectedContracts.length !== 1 ? 'records' : 'record' } selected`
    }
    return `Showing ${results.length} ${ results.length !== 1 ? 'records' : 'record' }`
  }

  const handleOpenFilters = (name: string): void => {
    setOpenFilters(name)
  }

  const filterItems = {
    assigned_negotiator: users.map(user => ({ id: user.id, label: getFullName(user)})),
    counterparty_name: counterparties.map((counterparty, index) => ({ id: counterparty, label: counterparty})),
    product_type: templates.map(template => ({ id: template.name, label: template.name}))
  }

  const handleCloseFilters = () => {
    setOpenFilters('')
  }

  const handleSort = clickedColumn => () => {
    const { column, direction } = ordering
    let newOrdering

    if (column !== clickedColumn) {
      newOrdering = {
        column: clickedColumn,
        direction: 'ascending',
      }
    } else {
      newOrdering = {
        column: direction === 'ascending' ? clickedColumn : null,
        direction: direction === 'ascending' ? 'descending' : null,
      }
    }

    setOrdering(newOrdering)

    const sortValue = newOrdering.direction === null ? null : 
    ( newOrdering.direction === 'ascending' ? `-${newOrdering.column}` : newOrdering.column)
    
    handleFilter('ordering', sortValue)
  }

  const toggleAssign = (assigned = null) => {
    if(assigned) {
      setResults(results.filter(item => !!item.assigned_negotiator))
    } else if (assigned === false) {
      setResults(results.filter(item => item.assigned_negotiator === null))
    } else {
      setResults([...contracts])
    }
  }

  const renderSortIcon = sortedColumn => {
    const { column, direction } = ordering

    if(sortedColumn === column) {
      const iconName = direction === 'ascending' ? 'triangle down' : 'triangle up'
      return <Icon name={iconName} />
    }

    return null
  }

  const SidebarComponent = <Sidebar content={<Workload workload={workload} />} footer={<AverageWorkload workload={workload} />} />

  console.log(filterItems)

  return (
    <Provider value={{ ...props }}>
      <PageTemplate 
        sidebar={SidebarComponent}
      >
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
              items={filterItems.assigned_negotiator}
              selectedContracts={selectedContracts}
              onClose={() => setOpenBulkAssign(false)}
            />
          ) : null
        }
        <Heading level={1} palette='grayscale'>
          Assign Documents
          <Subheading palette='grayscale'>
            Use this page to assign documents for review.
          </Subheading>
        </Heading>

        <Block>
          <Flex>
            <Switcher handleClick={toggleAssign} />
            {
              selectedContracts.length > 1 && (
                <Flex>
                  <BulkActionButton onClick={() => setSelectedContracts([])}>
                    <Close /> CANCEL
                  </BulkActionButton>
                  {/* <BulkActionButton onClick={() => handleUpdate({ assigned_negotiator: null, contacts: [selectedContracts]})}>
                    <Icon name='user x' flipped='horizontally' /> UNASSIGN
                  </BulkActionButton> */}
                  <BulkActionButton onClick={() => setOpenBulkAssign(true)}>
                    <Icon name='user plus' flipped='horizontally' /> ASSIGN
                  </BulkActionButton>
                </Flex>
              )
            }
          </Flex>
        </Block>

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
                  { getMetadataLabel() }
                </Metadata>

                { results.length === 0 && <Message>No contracts found.</Message>}
                
                {
                  results.length > 0 && (
                    <Table selectable={true} singleLine={true} sortable={true}>
                      <TableRow palette='grayscale' key='heading' heading={true}>
                        <TableCell heading={true} key='check'>&nbsp;</TableCell>
                        <TableCell 
                          heading={true} 
                          key='id' 
                          sorted={ordering.column === 'id' ? ordering.direction : null}
                          onClick={handleSort('id')}
                        >
                          Doc. ID { renderSortIcon('id') }
                        </TableCell>
                        <TableCell 
                          heading={true} 
                          key='counterparty_name' 
                          sorted={ordering.column === 'counterparty_name' ? ordering.direction : null}
                          onClick={handleSort('counterparty_name')}
                        >
                          Counterparty { renderSortIcon('counterparty_name') }
                        </TableCell>
                        <TableCell 
                          heading={true} 
                          key='product_type' 
                          sorted={ordering.column === 'product_type' ? ordering.direction : null}
                          onClick={handleSort('product_type')}
                        >
                          Prod. Type { renderSortIcon('product_type') }
                        </TableCell>
                        <TableCell 
                          heading={true} 
                          key='created' 
                          sorted={ordering.column === 'created' ? ordering.direction : null}
                          onClick={handleSort('created')} 
                        >
                          Date Submitted { renderSortIcon('created') }
                        </TableCell>
                        <TableCell 
                          heading={true} 
                          key='status' 
                          sorted={ordering.column === 'status' ? ordering.direction : null}
                          onClick={handleSort('status')}
                        >
                          Status { renderSortIcon('status') }
                        </TableCell>
                        <TableCell 
                          heading={true} 
                          key='assigned_negotiator' 
                          sorted={ordering.column === 'assigned_negotiator' ? ordering.direction : null}
                          onClick={handleSort('assigned_negotiator')}>
                          Assigned To { renderSortIcon('assigned_negotiator') }
                        </TableCell>
                        <TableCell heading={true} key='more'>
                          <Icon link={true} name='ellipsis vertical' />
                        </TableCell>
                      </TableRow>
                      {
                        results.map(contract => (
                          <HoverTableRow palette='grayscale' selected={isChecked(contract.id, selectedContracts)} key={contract.id}>
                            <TableCell key='check'>
                              <Checkbox 
                                checked={isChecked(contract.id, selectedContracts)} 
                                onChange={() => handleSelectContracts(contract.id)}
                                />
                            </TableCell>
                            <TableCell key='id'>{ contract.id }</TableCell>
                            <TableCell key='counterparty_name'>{ contract.counterparty_name }</TableCell>
                            <TableCell key='product_type'>{ contract.product_type }</TableCell>
                            <TableCell key='created'>{ moment(contract.created).format('YYYY-MM-DD, h:ma') }</TableCell>
                            <TableCell key='status'>{ contract.status }</TableCell>
                            <TableCell key='assigned_negotiator'>
                              <UserDropdown 
                                red={!contract.assigned_negotiator}
                                text={getNegotiatorLabel(contract)}
                                onClose={() => setSelectedContracts([...selectedContracts.filter(item => item.id === contract.id)])}
                                contract={contract}
                                users={users}
                                onChange={handleAssignUser}
                                getFullName={getFullName}
                              />
                            </TableCell>
                            <TableCell key='more'>&nbsp;</TableCell>
                          </HoverTableRow>
                        ))
                      }
                    </Table>
                  )
                }
              </React.Fragment>
            )
          }
        </Block>
    </PageTemplate>
    </Provider>
  )
}

export default contextWrapper(HomePage)