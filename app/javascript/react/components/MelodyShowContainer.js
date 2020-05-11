import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import { Redirect, Link } from 'react-router-dom'
import MelodyPlayer from './MelodyPlayer'
import FormSelect from './FormSelect'
import EditForm from './EditForm'
const MelodyShowContainer = (props) => {
  const [ melodyInfo, setMelodyInfo ] = useState({})
  const [ user, setUser ] = useState({})
  const [ stockInfo, setStockInfo ] = useState({})
  const [ currentUser, setCurrentUser ] = useState({})
  const [ redirect, shouldRedirect ] = useState(false)
  const [ scaleForm, setScaleForm ] = useState("")
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

  const chartData = () => {
    const data = [];
    if (stockInfo.prices) {
      let time = 35;
      stockInfo.prices.forEach((price, index) => {
        let rowArray = [new Date(stockInfo.dates[index]), price]
        data.unshift(rowArray)
      })
      data.unshift(["Date", "Price"])
      return data
    }
  }

  let interval = ""
  let start = ""
  let end =""
  let name = ""
  if (stockInfo.stock) {
    interval = stockInfo.stock.interval
    start = stockInfo.dates[35]
    end = stockInfo.dates[0]
    name = stockInfo.stock.name
  }

  const confirmDelete = () => {
    let confirmMessage = confirm("Do you want to delete this item?")
    if (confirmMessage === true) {
      deleteMelody()
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

  const renderScaleOptions = () => {
    setScaleForm((
      <EditForm editScale={editScale}/>
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


  let editButton = ""
  let deleteButton = ""
  if(currentUser) {
    if (user.id === currentUser.id) {
      editButton = (
        <button className="button" onClick={renderScaleOptions}>Change Scale</button>
      )
      deleteButton = (
        <button className="delete button" onClick={confirmDelete}>Delete Melody</button>
      )
    }
  }
  return(
    <div className="show">
      <div className="show-title">
        <h3>{melodyInfo.name}</h3>
        <h5>by <Link to={`/users/${user.id}`}>{user.username}</Link></h5>
      </div>
      <Chart
        className="chart-box"
        width={'900px'}
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
          backgroundColor: '#0b132b'
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <div className="show-info">
        <div>{name}</div>
        <div>Dates: {start} to {end}</div>
        <div>Time interval: {interval}</div>
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
      <div>
        <Link to="/">Home</Link>
        <Link to="/melodies/new">Create</Link>
      </div>
    </div>
  )
}

export default MelodyShowContainer
