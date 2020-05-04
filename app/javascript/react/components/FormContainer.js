import React, { useState, useEffect } from 'react'
import Form from './form'
import Play from './Play'

const FormContainer = props => {
  const [ scales, setScales ] = useState([])
  const [ melody, setMelody ] = useState()
  const [ showPlay, shouldShowPlay ] = useState(false)
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

  const submitForm = (formPayload) => {
    fetch('/api/v1/melodies' , {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.status === 200) {
        shouldShowPlay(true)
      }
      return response.json()
    })
    .then((response) => {
      setMelody(response)
    })
  }

  if (showPlay === true) {
    return(
      <div>
       <Form scales={scales} submitForm={submitForm} />
       <Play melody={melody} />
      </div>
    )
  } else {
    return(
      <Form scales={scales} submitForm={submitForm} />
    )
  }

}

export default FormContainer
