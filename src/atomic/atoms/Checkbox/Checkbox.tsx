import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CheckboxBase from '@material-ui/core/Checkbox'

const styles = {
  root: {
    padding: 0,
    '&$checked': {
      color: '#2E7D32',
    },
  },
  checked: {},
}

const Checkbox = ({classes, ...props}) => (
  <CheckboxBase
    disableRipple={true}
    className='checkbox'
    classes={{
      root: classes.root,
      checked: classes.checked,
    }}
    {...props}
  />
)

export default withStyles(styles)(Checkbox)
