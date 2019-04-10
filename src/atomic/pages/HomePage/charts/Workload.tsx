import * as React from 'react'
import styled from 'styled-components'
import Doughnut from '@atomic/molecules/Doughnut/Doughnut'
import { workload as workloadModel } from '@app_modules/project-manager/redux/state'
import { workloadValues } from '@app_modules/project-manager/redux/constants'

const StyledCharts = styled.div``

const StyledChart = styled.div``

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
  const chartKeys = Object.keys(workloadValues)

  negotiatorIds
    .map(negotiatorId => negotiator_workload[negotiatorId])
    .forEach(negotiator => {
      const values = []
      const colors = []
         
      Object.keys(negotiator.workload).forEach(workloadKey => {
        if(workloadValues[workloadKey]) {
          values.push(negotiator.workload[workloadKey])
          // values.push(getRandomInt(50, 200))
          colors.push(workloadValues[workloadKey].color)
          labels.push(workloadKey)
        }
      })
      datasets.push({ data: values, backgroundColor: colors })
      
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