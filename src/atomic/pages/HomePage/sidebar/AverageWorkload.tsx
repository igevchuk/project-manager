import * as React from 'react'
import styled from 'styled-components'

import Icon from 'src/atomic/atoms/Icon/Icon'
import Heading from 'src/atomic/atoms/Heading/Heading'
import { workload as workloadModel } from 'src/app_modules/project-manager/redux/state'
import { workloadValues } from 'src/app_modules/project-manager/redux/constants'
import { contextWrapper } from 'src/app_modules/project-manager/ProjectManagerContext'

const StyledAverageWorkload = styled.div`
  && h6 {
    margin: 0 0 9px;
    font-weight: bold;
    color: #010101;
    line-height: 14px;
  }
`

const StyledLabels = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledLabel = styled('div')<{bgColor?: string}>`
  flex: 0 50%;
  margin-bottom: 5px;
  font-size: 12px;	
  line-height: 14px;
  color: #161616;
  & .icon.circle {
    width: 14px;
    height: 14px;
    color: ${p => p.bgColor && p.bgColor};
  }
`


const AverageWorkload: React.SFC<{workload: workloadModel}> = ({ workload, ...props }) => {
  const { average_workload } = workload
  
  const renderLabel = key => (
    workloadValues[key] ? (
    <StyledLabel bgColor={workloadValues[key].color} key={key}>
      <Icon name='circle' /> { `${workloadValues[key].label}: ${average_workload[key]}` }
    </StyledLabel>
    ) : null
  )

  return !!average_workload ? (
    <StyledAverageWorkload>
      <Heading level={6} palette='grayscale'>
        Average Workload per Reviewer
      </Heading>
      <StyledLabels>
        {
          Object.keys(average_workload)
            .map(key => renderLabel(key))
        }
      </StyledLabels>
    </StyledAverageWorkload>
  ) : null
}

export default contextWrapper(AverageWorkload)