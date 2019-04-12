import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import RadioBase from '@material-ui/core/Radio'

const styles = {
  root: {
    padding: 0,
    fontSize: '20px',
    '&$checked': {
      color: '#2E7D32',
      fontSize: '20px'
    },
  },
  checked: {},
}

const Radio = ({classes, ...props}) => (
  <RadioBase
    disableRipple={true}
    className='radio'
    classes={{
      root: classes.root,
      checked: classes.checked
    }}
    {...props}
  />
)

export default withStyles(styles)(Radio)
