import * as React from 'react'

import PageTemplate from '@atomic/templates/PageTemplate/PageTemplate'
import Heading from '@atomic/atoms/Heading'

const NotFoundPage:React.SFC = () => {
  return (
    <PageTemplate>
      <Heading>404 Not Found</Heading>
    </PageTemplate>
  )
}

export default NotFoundPage
