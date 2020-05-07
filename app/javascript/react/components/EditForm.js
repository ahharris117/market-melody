import React, { useState, useEffect } from 'react'
import FormSelect from './FormSelect'
const EditForm = props => {
  const [ scales, setScales ] = useState([])
  const [ formValue, setFormValue ] = useState({
    scale: ""
  })
  useEffect(() => {
    fetch('/api/v1/scales')
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      setScales(body)
    })
  }, [])

  const scaleChange = (event) => {
    setFormValue({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  let scaleOptionNames = ""
  scaleOptionNames = scales.map((scale) => {
    return scale.name
  })

  const formSubmitHandler = (event) => {
    event.preventDefault()
    props.editScale(formValue)
  }

  return(
    <form onSubmit={formSubmitHandler}>
      <FormSelect
        label="Scale"
        array={scaleOptionNames}
        id="scale"
        value={formValue.scale}
        onChangeHandler={scaleChange}
      />
      <div className="button-group float-right">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default EditForm
