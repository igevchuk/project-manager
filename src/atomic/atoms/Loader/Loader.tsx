import * as React from 'react'
import styled from 'styled-components'
import { PulseLoader } from "react-spinners";

const Loader = styled.div`
  text-align: center;
`

export default ({...props}) => (
  <Loader className='loader'>
    <PulseLoader color='#86bc25' loading={true} />
  </Loader>
)
