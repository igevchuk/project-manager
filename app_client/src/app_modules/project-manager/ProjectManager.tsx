import * as React from 'react'
import { connect } from 'react-redux'
import { Provider } from './ProjectManagerContext'
import ProjectManagerPage from '@atomic/pages/HomePage/HomePage';
import { contract } from './redux/state'
import { fetchContracts } from './redux/actions'

interface IProjectManagerProps {
  contractState: {
    contracts: contract[],
    error: string,
    isLoading: boolean
  },
  dispatch: React.Dispatch<any>
}

class ProjectManager extends React.Component<IProjectManagerProps> {
  public componentDidMount() {
    this.props.dispatch(fetchContracts())
  }
  
  public handleSearch() {
    return null
  }

  public handleFilter() {
    return null
  }

  public render() {
    const { contractState } = this.props
    const { contracts, error, isLoading } = contractState;

    return (
      <Provider
        value={{ contracts, error, isLoading }}
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
