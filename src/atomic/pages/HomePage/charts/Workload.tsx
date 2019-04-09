import * as React from 'react'
import styled from 'styled-components'
import Doughnut from '@atomic/molecules/Doughnut/Doughnut'
import { contextWrapper } from '@app_modules/project-manager/ProjectManagerContext'
import { workload as workloadModel } from '@app_modules/project-manager/redux/state'
import { __values } from 'tslib';

const StyledCharts = styled.div``

const StyledChart = styled.div``

const chartValues = {
  'Under Review': {
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

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Workload: React.SFC<{workload: workloadModel}> = ({ workload, ...props }) => {
  const { negotiator_workload } = workload
  const doughnutData = { datasets: [], labels: [] } 
  const datasets = []
  const labels = []
  if(!negotiator_workload) {
    return null
  }

  const negotiatorIds = Object.keys(negotiator_workload)
  const chartKeys = Object.keys(chartValues)

  negotiatorIds
    .map(negotiatorId => negotiator_workload[negotiatorId])
    .forEach(negotiator => {
      const values = []
      const colors = []
         
      Object.keys(negotiator.workload).forEach(workloadKey => {
        if(chartValues[workloadKey]) {
          values.push(negotiator.workload[workloadKey] || getRandomInt(50, 200))
          colors.push(chartValues[workloadKey].color)
          labels.push(workloadKey)
        }
      })
      datasets.push({ data: values, backgroundColor: colors, label: ['AAA'] })
      
    })
    // doughnutData.labels = [...labels]
    doughnutData.datasets = [...datasets]

  return (
    <StyledCharts>
      <Doughnut data={doughnutData} {...props} />
    </StyledCharts>
  )
}

export default Workload