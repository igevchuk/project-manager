import * as React from 'react'
import { connect } from 'react-redux'
import { Provider } from './ProjectManagerContext'
import ProjectManagerPage from '@atomic/pages/HomePage/HomePage';
import { contract } from './redux/state'
import { fetchContracts, searchContracts } from './redux/actions'

interface IProjectManagerProps {
  contractState: {
    contracts: contract[],
    error: string,
    isLoading: boolean
  },
  dispatch: React.Dispatch<any>
}

class ProjectManager extends React.Component<IProjectManagerProps> {
  public state = {
    labels: [],
    search: '',
    ordering: '',
    filter: '',
    selectedContracts: []
  }

  public componentDidMount() {
    this.getData()
  }

  public getData = () => {
    const options = this.getQueryOptions()

    this.props.dispatch(fetchContracts(options))
  }

  public getQueryOptions = () => {
    const { search, ordering, filter } = this.state

    return { search, filter, ordering };
  }
  
  public handleSearch = (value, key) => {
    this.setState({
      [key]: value
    }, () => {
      const options = this.getQueryOptions()
      this.props.dispatch(searchContracts(options))
    })
  }

  public render() {
    const { contractState } = this.props
    const { contracts, error, isLoading } = contractState;
    const handleSearch = this.handleSearch

    return (
      <Provider
        value={{ 
          contracts, 
          error, 
          isLoading,
          handleSearch
      }}
      >
        <ProjectManagerPage />
      </Provider>
    );
  }
}

const mapStateToProps = ({ contractReducer }) => {
  return { contractState: contractReducer };
};

export default connect(mapStateToProps)(ProjectManager)
