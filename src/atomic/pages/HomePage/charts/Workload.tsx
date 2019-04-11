import * as React from 'react'
import styled from 'styled-components'
import Doughnut from '@atomic/molecules/Doughnut/Doughnut'
import { workload as workloadModel } from '@app_modules/project-manager/redux/state'
import { workloadValues } from '@app_modules/project-manager/redux/constants'

const StyledCharts = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledChart = styled.div`
  flex: 0 50%;
  margin-bottom: 1rem;
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
const StyledChartLabel = styled.div`
  font-size: 18px;
  color: #616161;
  line-height: 36px;
`

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Workload: React.SFC<{workload: workloadModel}> = ({ workload, ...props }) => {
  const { negotiator_workload } = workload

  if(!negotiator_workload) {
    return null
  }

  const chartOptions = {
    className: 'workload',
    formatValues: (values, total) => `${(total)}`
  }
  const negotiatorIds = Object.keys(negotiator_workload)
  const charts = []
  const chartData = [] 
  const colors = []

  negotiatorIds
    .map(negotiatorId => negotiator_workload[negotiatorId])
    .forEach(negotiator => {
      Object.keys(negotiator.workload).forEach(workloadKey => {
        if(workloadValues[workloadKey]) {
          // chartData.push({ value: negotiator.workload[workloadKey] })
          chartData.push({ value: getRandomInt(50, 200) })
          colors.push(workloadValues[workloadKey].color)
        }
      })
      charts.push({
        chartData,
        colors,
        name: negotiator.name
      })
      charts.push({
        chartData,
        colors,
        name: negotiator.name
      })
      charts.push({
        chartData,
        colors,
        name: negotiator.name
      })
    })

  return (
    <StyledCharts>
      {
        charts.map(({ data, colors, name }) => (
          <StyledChart>
            <Doughnut colors={colors} data={chartData} options={chartOptions} />
            <StyledChartLabel>{ name }</StyledChartLabel>
          </StyledChart>
        ))
      }
    </StyledCharts>
  )
}

export default Workload