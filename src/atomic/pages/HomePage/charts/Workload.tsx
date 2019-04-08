import * as React from 'react'
import styled from 'styled-components'
import Doughnut from '@atomic/molecules/Doughnut/Doughnut'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'
import { workload as workloadModel } from '@app_modules/project-manager/redux/state'

const StyledCharts = styled.div``

const StyledChart = styled.div``

const chartValues = {
  'In Negotiation': {
    color: '#D45F17',
    label: 'Reviewing'
  },
  'With Client': {
    color: '#F2E72F',
    label: 'With Client'
  },
  'Client Signed': {
    color: '#5AA3DC',
    label: 'Signature Pending'
  },
  'Signed': {
    color: '#009C75',
    label: 'Signed'
  }
}

const Workload: React.SFC<{workload: workloadModel}> = ({ workload, ...props }) => {
  const { negotiator_workload } = workload
  const doughnutData = { datasets: [] } 
  const datasets = []
  if(!negotiator_workload) {
    return null
  }

  const negotiatorIds = Object.keys(negotiator_workload)
  const chartKeys = Object.keys(chartValues)

  negotiatorIds
    .map(negotiatorId => negotiator_workload[negotiatorId])
    .forEach(negotiator => {
      const obj = {
        data: [],
        backgroundColor: []
      }
         
      Object.keys(negotiator.workload).forEach(workloadKey => {
        obj.data.push(negotiator.workload[workloadKey] || 25)
        if(chartValues[workloadKey]) {
          obj.backgroundColor.push(chartValues[workloadKey].color)
        }
      })

      datasets.push({ data: obj.data, backgroundColor: obj.backgroundColor })
    })
    
    doughnutData.datasets = datasets
  // const dataSet = negotiator_workload.map(
  //   workload => Object.keys(workload)
  //   .map(key => workload[key])
  // )

  // console.log(dataSet)

  return (
    <StyledCharts>
      <Doughnut data={doughnutData} {...props} />
    </StyledCharts>
  )
}

// export default contextWrapper(Workload)
export default Workload