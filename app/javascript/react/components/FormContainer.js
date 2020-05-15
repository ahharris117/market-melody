import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import MelodyForm from './MelodyForm'
import Play from './Play'
import ScaleInfoModal from './ScaleInfoModal'

const FormContainer = props => {
  const [ scales, setScales ] = useState([])
  const [ melodyInfo, setMelodyInfo ] = useState({
    melody: "",
    name: "",
    dates: "",
    prices: "",
    interval: "",
    fullMelody: "",
    user: "",
    stock: ""
  })
  const [ showPlay, shouldShowPlay ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ showId, setShowId ] = useState("")
  const [ shouldRedirect, setShouldRedirect ] = useState(false)
  const [ showModal, shouldShowModal ] = useState(false)

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
      return response.json()
    })
    .then((response) => {
      if (response.status === 'error') {
        throw new Error(response.message)
        shouldShowPlay(false)
      } else {
        shouldShowPlay(true)
      }
      setErrorMessage("")
      setMelodyInfo(response)
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }

  const saveMelody = () => {
    fetch('/api/v1/melodies' , {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({
        fullMelody: melodyInfo.fullMelody,
        user: melodyInfo.user,
        stock: melodyInfo.stock
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      setShowId(body)
      setShouldRedirect(true)
    })
  }

  if (shouldRedirect) {
    return <Redirect to={`/melodies/${showId}`} />
  }

  let playComponent;
  if (showPlay === true) {
    playComponent = <Play melodyInfo={melodyInfo} saveMelody={saveMelody} />
  } else {
    playComponent = ""
  }

  const show = () => {
    shouldShowModal(true)
  }

  const hide = () => {
    shouldShowModal(false)
  }
  return(
    <div>
      <ScaleInfoModal show={showModal} hide={hide} />
      <div className="form-container">
        <MelodyForm
          show={show}
          scales={scales}
          error={errorMessage}
          submitForm={submitForm}
        />
      </div>
      {playComponent}
    </div>
  )
}

export default FormContainer
