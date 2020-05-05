import React, { useState, useEffect } from 'react'
import Form from './form'
import Play from './Play'

const FormContainer = props => {
  const [ scales, setScales ] = useState([])
  const [ melody, setMelody ] = useState({
    melody: "",
    name: ""
  })
  const [ showPlay, shouldShowPlay ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")
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
      } else {
        shouldShowPlay(false)
      }
      return response.json()
    })
    .then((response) => {
      if (response.status === 'error') {
        throw new Error(response.message)
      }
      setErrorMessage("")
      setMelody(response)
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }
  let playComponent;
  if (showPlay === true) {
    playComponent = <Play melody={melody} />
  } else {
    playComponent = ""
  }
  return(
    <div>
      <div className="form-container">
        <Form scales={scales} error={errorMessage} submitForm={submitForm} />
      </div>
      {playComponent}
    </div>
  )
}

export default FormContainer
