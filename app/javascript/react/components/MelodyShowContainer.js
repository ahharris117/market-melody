import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import MelodyPlayer from './MelodyPlayer'
import Staff from './Staff'
const MelodyShowContainer = (props) => {
  const [ melodyInfo, setMelodyInfo ] = useState({})
  const [ user, setUser ] = useState({})
  const [ stockInfo, setStockInfo ] = useState({})
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
      debugger;
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
    })
  }, [])

  const chartData = () => {
    debugger;
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
  if (stockInfo.stock) {
    interval = stockInfo.stock.interval
  }

  return(
    <div>
      <h3>{melodyInfo.name}</h3>
      <h5>{user.username}</h5>
      <Chart
        className="chart-box"
        width={'900px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData()}
        options={{
          hAxis: {
            title: interval,
          },
          vAxis: {
            title: 'Prices',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <MelodyPlayer name={melodyInfo.name} melody={melodyInfo.melody} />
      <Staff melody={melodyInfo.melody} />
    </div>
  )
}

export default MelodyShowContainer
