import * as React from 'react'
import styled from 'styled-components'
import { Label } from 'semantic-ui-react'
import * as theme from 'styled-theme'

const LabelGroup = styled(Label.Group)`
  && .label {
    margin-bottom: 0;
    padding: 6px 18px;
    font-size: 1em;
    font-weight: normal;
    color: ${p => p.palette ? theme.palette({ grayscale: 1 }, 1) : '#616161'};
    border-color: #d8d8d8;
  }
`

export default LabelGroup
