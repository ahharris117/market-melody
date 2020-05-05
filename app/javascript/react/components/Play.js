import React, { useState } from 'react'
import Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
import { Chart } from "react-google-charts";

const Play = props => {
  const setup = () => {
    let noteArray = []
    let noteTime = 0
    let melody_one;
    let synth;
    Tone.Transport.stop()
    Tone.Transport.cancel()
    props.melodyInfo.melody.forEach((melodyNote) => {
      noteArray.push({ time : noteTime, note : melodyNote, dur : '16n'})
      noteTime += 0.2
    })

    synth = new Tone.Synth({
      oscillator: {
        type: 'triangle8'
      },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 2,
        release: 4
      }
    }).toMaster()

    const part = new Tone.Part((time, event) => {
      synth.triggerAttackRelease(event.note, event.dur, time)
    }, noteArray)
    part.start(0);
    Tone.Transport.start()
  }

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
      debugger;
      return data
    }
  }

  return(
    <div className="play-container">
      <div className="play">
        <i className="far fa-play-circle" onClick={setup}></i>
        <div className="melody-title">{props.melodyInfo.name}</div>
      </div>
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
    </div>
  )
}

export default Play
