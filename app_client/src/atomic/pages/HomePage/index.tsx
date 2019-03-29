import * as React from 'react'

import PageTemplate from '@atomic/templates/PageTemplate'
import Heading from '@atomic/atoms/Heading'
import Subheading from '@atomic/atoms/Subheading'

const HomePage: React.SFC<{}> = () => {
  return (
    <PageTemplate
    >
      <Heading level={1} palette='primary'>
        Assing Requests
        <Subheading palette='primary'>
          Use this page to assign documents requests for review.
        </Subheading>
      </Heading>
    </PageTemplate>
  )
}

export default HomePage