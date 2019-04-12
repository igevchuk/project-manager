import * as React from 'react'

import PageTemplate from 'src/atomic/templates/PageTemplate/PageTemplate'
import Heading from 'src/atomic/atoms/Heading/Heading'

const NotFoundPage:React.SFC = () => {
  return (
    <PageTemplate>
      <Heading>404 Not Found</Heading>
    </PageTemplate>
  )
}

export default NotFoundPage
