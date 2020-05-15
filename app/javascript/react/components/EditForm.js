import React, { useState, useEffect } from 'react'

import FormSelect from './FormSelect'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditForm = props => {
  const [ scales, setScales ] = useState([])
  const [ formValue, setFormValue ] = useState({
    scale: ""
  })
  const [ error, setError ] = useState("")
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
    if (formValue.scale === "") {
      setError("Must select a scale.")
    } else {
    props.editScale(formValue)
    }
  }

  return(
    <Form onSubmit={formSubmitHandler}>
      {error}
      <FormSelect
        label="Scale"
        array={scaleOptionNames}
        id="scale"
        value={formValue.scale}
        onChangeHandler={scaleChange}
      />
        <Button className="button" onClick={props.close} value="Close">
          Close
        </Button>
        <Button className="button" type="submit" value="Submit">
          Submit
        </Button>
    </Form>
  )
}

export default EditForm
