import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { Chart } from "react-google-charts";

import MelodyPlayer from './MelodyPlayer'
import FormSelect from './FormSelect'
import EditForm from './EditForm'
import DeleteModal from './DeleteModal'
import MelodyModal from './MelodyModal'
import Button from 'react-bootstrap/Button'

const MelodyShowContainer = (props) => {
  const [ melodyInfo, setMelodyInfo ] = useState({})
  const [ user, setUser ] = useState({})
  const [ stockInfo, setStockInfo ] = useState({})
  const [ currentUser, setCurrentUser ] = useState({})
  const [ redirect, shouldRedirect ] = useState(false)
  const [ scaleForm, setScaleForm ] = useState("")
  const [ deleteModalShow, setDeleteModalShow ] = useState(false)
  const [ melodyModalShow, setMelodyModalShow ] = useState(false)

  useEffect(() => {
    let id = props.match.params.id
    fetch(`/api/v1/melodies/${id}`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      setMelodyInfo({
        name: body.name,
        melody: body.melody
      })
      setUser(body.user)
      setStockInfo({
        stock: body.stock,
        prices: body.prices,
        dates: body.dates
      })
      setCurrentUser(body.current_user)
    })
  }, [])

  const parseDate = dateObject => {
    return `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`
  }

  const chartData = () => {
    const data = [];
    if (stockInfo.prices) {
      let time = 35;
      stockInfo.prices.forEach((price, index) => {
        let rowArray = [
          new Date(stockInfo.dates[index]),
          price,
          `<strong>Date:</strong> ${parseDate(new Date(stockInfo.dates[index]))}<br/><strong>Price:</strong> $${price}<br/><strong>Note:</strong> ${melodyInfo.melody[time]}`
        ];
        data.unshift(rowArray)
        time--
      })
      data.unshift(["Date", "Price", { type: "string", role: "tooltip", p: { html: true }}])
      return data
    }
  }

  let interval;
  let start;
  let end;
  let name ;
  if (stockInfo.stock) {
    interval = stockInfo.stock.interval
    start = stockInfo.dates[35]
    end = stockInfo.dates[0]
    name = stockInfo.stock.name
  }


  const showModal = (event) => {
    if (event.currentTarget.id === "delete") {
      setDeleteModalShow(true)
    } else {
      setMelodyModalShow(true)
    }
  }

  const hideModal = (modal) => {
    if (modal === "delete") {
      setDeleteModalShow(false)
    } else {
      setMelodyModalShow(false)
    }
  }

  const deleteMelody = () => {
    let id = props.match.params.id
    fetch(`/api/v1/melodies/${id}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(() => {
      shouldRedirect(true)
    })
  }

  const close = () => {
    setScaleForm("")
  }

  const renderScaleOptions = () => {
    setScaleForm((
      <EditForm editScale={editScale} close={close} />
    ))
  }

  const editScale = (scaleName) => {
    let id = props.match.params.id
    fetch(`/api/v1/melodies/${id}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(scaleName)
    })
    .then((response) => response.json())
    .then((body) => {
      setMelodyInfo({
        name: body.name,
        melody: body.melody
      })
      setScaleForm("")
    })
  }

  if (redirect === true) {
    return <Redirect to="/" />
  }

  let editButton = "";
  let deleteButton = "";
  if(currentUser) {
    if (user.id === currentUser.id) {
      editButton = (
        <Button className="button" onClick={renderScaleOptions}>Change Scale</Button>
      )
      deleteButton = (
        <Button id="delete" className="delete button" onClick={showModal}>Delete Melody</Button>
      )
    }
  }

  return(
    <div className="show-page">

    <MelodyModal
      show={melodyModalShow}
      hideModal={hideModal}
      melody={melodyInfo.melody}
      />

    <DeleteModal
      show={deleteModalShow}
      hideModal={hideModal}
      deleteMelody={deleteMelody}
    />
      <div className="show-title">
        <h3>{melodyInfo.name}</h3>

        <h5>by <Link to={`/users/${user.id}`}>{user.username}</Link></h5>
      </div>

      <Chart
        className="chart-box"
        width={'80%'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData()}
        options={{
          hAxis: {
            title: interval
          },
          vAxis: {
            title: 'Prices'
          },
          colors: ['#6fffe9'],
          backgroundColor: '#0b132b',
          tooltip: {isHtml: true}
        }}
        rootProps={{ 'data-testid': '1' }}
      />

      <div className="show-info">
        <div>{name}</div>
        <div>Dates: {start} to {end}</div>
        <div>Time interval: {interval}</div>
        <Button id="melody" className="button" onClick={showModal}>Show Melody Notes</Button>
      </div>

      <div className="play-container">
        <MelodyPlayer classStyle="play" name={melodyInfo.name} melody={melodyInfo.melody} />
      </div>

      <div className="show-bottom">
        <div>
          {scaleForm}
        </div>
        {editButton}
        {deleteButton}
      </div>
    </div>
  )
}

export default MelodyShowContainer
