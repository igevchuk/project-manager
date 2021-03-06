import * as React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { of } from 'rxjs'
import { Provider } from './ProjectManagerContext'
import ProjectManagerPage from 'src/atomic/pages/HomePage/HomePage';
import { contract, user } from './redux/state'
import * as actions from './redux/actions'

interface IProjectManagerProps {
  contractState: {
    contracts: contract[],
    allResults: contract[],
    counterparties: string[],
    error: string,
    isLoading: boolean,
    templates: any[],
    users: user[],
    workload: any
  },
  dispatch: React.Dispatch<any>,
  fetchContracts: (options: {}) => void,
  fetchWorkload: (options: {}) => void,
  searchContracts: (options: {}) => void,
}

interface IProjectManagerState {
  assigned_negotiator: any[],
  assigned_negotiator__isnull: string,
  product_type: string[],
  counterparty_name: string[],
  ordering: string,
  search: string,
}

class ProjectManager extends React.Component<IProjectManagerProps, IProjectManagerState> {
  public state = {
    assigned_negotiator: [],
    assigned_negotiator__isnull: '',
    product_type: [],
    counterparty_name: [],
    ordering: '',
    search: '',
  }

  public componentDidMount() {
    const { dispatch } = this.props 

    this.getData()
    dispatch({ type: actions.FETCH_USER_GROUPS })
    dispatch({ type: actions.FETCH_WORKLOAD })
    dispatch(actions.fetchCounterparties())
    dispatch(actions.fetchTemplates())
  }

  public getData = () => {
    const options = this.getQueryOptions()

    this.props.dispatch(actions.fetchContracts(options))
  }

  public getQueryOptions = () => {
    const { 
      search, 
      ordering, 
      assigned_negotiator,
      assigned_negotiator__isnull,
      product_type,
      counterparty_name
    } = this.state
    const options = { search, ordering, assigned_negotiator, assigned_negotiator__isnull, product_type, counterparty_name }
    const keys = Object.keys(options)
    const queryOptions = {}

    keys.forEach(key => {
      if(!_.isEmpty(options[key])) {
        queryOptions[key] = Array.isArray(options[key]) ? options[key].join('||') : options[key]
      }
    })

    return queryOptions
  }


  public handleUpdateContracts = data => {
    const observer = of(this.props.dispatch(actions.postContracts(data)))
    observer.subscribe(() => this.getData())
  }

  public handleFilter = (key: string, value: number | string | any[]) => {
    const { dispatch } = this.props
    const state = {[key]: Array.isArray(value) ? [...value] : value }
    this.setState(state as any, () => {
      this.getData()
    })
  }

  public applyBulkFilters = (data: {}) => {
    const { dispatch } = this.props
    const state = {...data}
    this.setState(state as any, () => {
      this.getData()
    })
  }

  public handleSearch = (value) => {
    const { dispatch } = this.props

    this.setState({
      search: value
    }, () => {
      this.getData()
    })
  }

  public render() {
    const { contractState } = this.props
    const { contracts, allResults, error, isLoading, counterparties, templates, users, workload } = contractState
    const { assigned_negotiator__isnull, assigned_negotiator, counterparty_name, product_type, ordering, search } = this.state
    const filters = { assigned_negotiator__isnull, assigned_negotiator, counterparty_name, product_type, ordering, search }
    const applyBulkFilters = this.applyBulkFilters
    const handleFilter = this.handleFilter
    const handleSearch = this.handleSearch
    const handleUpdate = this.handleUpdateContracts

    return (
      <Provider
        value={{ 
          contracts, 
          allResults,
          counterparties,
          error, 
          isLoading,
          filters,
          templates,
          users,
          workload,
          applyBulkFilters,
          handleFilter,
          handleSearch,
          handleUpdate,
      }}
      >
        <ProjectManagerPage />
      </Provider>
    );
  }
}

const mapStateToProps = ({ contractReducer }) => {
  return { contractState: contractReducer };
}

export default connect(mapStateToProps)(ProjectManager)
