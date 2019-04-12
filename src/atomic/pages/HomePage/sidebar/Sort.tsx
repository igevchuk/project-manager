import * as React from 'react'
import styled from 'styled-components'
import Radio from 'src/atomic/atoms/Radio/Radio'
import RadioField from 'src/atomic/molecules/RadioField/RadioField'
import RadioGroup from 'src/atomic/molecules/RadioGroup/RadioGroup'

const SortLabel = styled.label`
  padding-right: 1em;
  font-size: 12px;
  color: #010101;
`

interface ISortProps {
  handleSort: (value: string) => void
}

const Sort:React.SFC<ISortProps> = ({ handleSort, ...props }) => {
  const [ checked, setChecked ] = React.useState(null)

  const handleChange = (value) => {
    setChecked(value)
    handleSort(value)
  }

  return (
    <RadioGroup inline={true} className='sort'>
      <SortLabel>Sort by</SortLabel>
  
      <RadioField 
        render={() => (
          <React.Fragment>
            <Radio 
              checked={checked === 'name'} 
              name='name' 
              value='name'
              onChange={({ target }) => handleChange(target.value)} 
            />
            <label>Alphabetical</label>
          </React.Fragment>
        )}
      />
  
      <RadioField 
        render={() => (
          <React.Fragment>
            <Radio 
              checked={checked === 'under_review'} 
              name='under_review' 
              value='under_review'
              onChange={({ target }) => handleChange(target.value)} 
            />
            <label>Under Review</label>
          </React.Fragment>
        )}
      />
    </RadioGroup>
  )
}


export default Sort
