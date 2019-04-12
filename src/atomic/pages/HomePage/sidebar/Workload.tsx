import * as React from 'react'
import styled from 'styled-components'
import * as _ from 'lodash'
import Doughnut from 'src/atomic/molecules/Doughnut/Doughnut'
import Loader from 'src/atomic/atoms/Loader/Loader'
import Search from 'src/atomic/organisms/Search/Search'
import Sort from './Sort'
import { workload as workloadModel } from 'src/app_modules/project-manager/redux/state'
import { workloadValues } from 'src/app_modules/project-manager/redux/constants'
import { contextWrapper } from 'src/app_modules/project-manager/ProjectManagerContext'

const Header = styled('div')`
  padding: 8px 24px;
  background-color: #F5F5F5;
  border-top: 1px solid #E0E0E0;
  & .search {
    margin-bottom: 8px;
  }
  & .sort svg {
    font-size: 20px;
  }
`

const Charts = styled.div`
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  max-height: 400px;
  overflow-y: auto;
  background-color: #FFFFFF;
`

const Chart = styled.div`
  flex: 0 50%;
  margin-bottom: 1rem;
  &:nth-child(odd) {
    padding-right: 15px;
  }
  &:last-child, &:nth-last-child(2) {
    margin-bottom: 0;
  }
  .workload-arcs-path {
    opacity: 1;
  }
  .workload-innertext-value {
    font-size: 18px;
    color: #616161;
    transform: translateY(-5%);
  }
`
const ChartLabel = styled.div`
  font-size: 16px;
  color: #616161;
  margin: 1em 0;
  text-align: center;
`

const Workload: React.SFC<{workload: workloadModel}> = ({ workload, ...props }) => {
  const [ allCharts, setAllCharts ] = React.useState(null)
  const [ charts, setCharts ] = React.useState([])
  const [ isLoading, setIsLoading ] = React.useState(true)

  React.useEffect(() => {
    setAllCharts(getCharts(workload.negotiator_workload))
    if(!!allCharts) {
      setCharts([...allCharts])
      setIsLoading(false)
    }
  }, [workload])

  function mapWorkload(data) {
    return Object.keys(data)
      .reduce((accum, curr) => {
        const {...rest} = data[curr]
        accum.push({ id: curr, under_review: rest.workload['Under Review'], ...rest })
        return accum
    }, [])
  }

  function getCharts(data) {
    if(!data) {
      return 
    }
    const charts = []
    const chartData = [] 
    const colors = []
    const mappedData = mapWorkload(data)

    mappedData.forEach(({workload, ...rest}) => {
      Object.keys(workload).forEach(workloadKey => {
        if(workloadValues[workloadKey]) {
          chartData.push({ value: workload[workloadKey] })
          colors.push(workloadValues[workloadKey].color)
        }
      })
      charts.push({
        chartData,
        colors,
        ...rest
      })
    })
    
    return charts
  }

  const handleSearch = (search: string): void => {
    const re = new RegExp(search, 'gi')

    setCharts([...charts.filter(item => !!~item.name.search(re))])
  }

  const handleSort = (sorting: string):void => {
    const sortedResult  = charts.sort((a, b) => {
      return (a[sorting] < b[sorting]) ? -1 : ((a[sorting] > b[sorting]) ? 1 : 0)
    })
    setCharts([...sortedResult])
  }

  const chartOptions = () => ({
      className: 'workload',
      formatValues: (values, total) => `${(total)}`
  })

  return (
    <div className='workload'>
      <Header>
        <Search iconPosition='left' handleSearch={handleSearch} />

        <Sort handleSort={handleSort} />
      </Header>

      <Charts>
        { isLoading 
          ? <Loader /> 
          :
          (!!charts && charts.length > 0 ? charts.map(({ data, colors, name, chartData }) => (
            <Chart>
              <Doughnut colors={colors} data={chartData} options={chartOptions()} />

              <ChartLabel>{ name }</ChartLabel>
            </Chart>
          )) : (<span>No result found.</span>))
        }
      </Charts>
    </div>
  )
}

export default contextWrapper(Workload)