import React, { useState } from 'react'
import Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
import { Chart } from "react-google-charts";
import MelodyPlayer from './MelodyPlayer'
const Play = props => {

  const chartData = () => {
    const data = [];
    if (props.melodyInfo.prices) {
      let time = 35;
      props.melodyInfo.prices.forEach((price) => {
        let rowArray = [time, price]
        time --
        data.unshift(rowArray)
      })
      data.unshift(["Date", "Price"])
      return data
    }
  }

  const handleSave = (event) => {
    event.preventDefault()
    props.saveMelody()
  }
  let saveButton = ""
  if (props.melodyInfo.user) {
    saveButton = (
      <button className="save button" onClick={handleSave}>Save Melody</button>
    )
  }
  return(
    <div className="play-container">
      <MelodyPlayer
        class="play"
        melody={props.melodyInfo.melody}
        name={props.melodyInfo.name}
      />
      <div className="chart-container">
        <Chart
          className="chart-box"
          width={'400px'}
          height={'300px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData()}
          options={{
            hAxis: {
              title: props.melodyInfo.interval,
            },
            vAxis: {
              title: 'Prices',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
      {saveButton}
    </div>
  )
}

export default Play
