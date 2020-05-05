import React, { useState, useEffect } from 'react'
import Form from './form'
import Play from './Play'

const FormContainer = props => {
  const [ scales, setScales ] = useState([])
  const [ melodyInfo, setMelodyInfo ] = useState({
    melody: "",
    name: "",
    dates: "",
    prices: ""
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
    const { stock, scale, interval } = formPayload
    fetch(`/api/v1/melodies?stock=${stock}&scale=${scale}&interval=${interval}` , {
      credentials: "same-origin",
      method: "GET",
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
      setMelodyInfo(response)
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }
  let playComponent;
  if (showPlay === true) {
    playComponent = <Play melodyInfo={melodyInfo} />
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
