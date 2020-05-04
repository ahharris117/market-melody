import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Form from './form'
import Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
// export const App = (props) => {
  const [ melody, setMelody ] = useState([])
  const searchStock = (stock) => {
    fetch(`api/v1/stocks?stock=${stock}`)
    .then(response => {
      return response.json()
    })
    .then((response) => {
      setMelody(response)
      console.log('New melody set')
    })
  }
  // const stop = () => {
  //   Tone.context.close()
  //   Tone.context = new AudioContext()
  // }
  // let part;
  const setup = () => {
    let noteArray = []
    let noteTime = 0
    let melody_one;
    let synth;
    Tone.Transport.stop()

    melody.forEach((melodyNote) => {
      noteArray.push({ time : noteTime, note : melodyNote, dur : '16n'})
      noteTime += 0.2
    })

    console.log(noteArray.length);

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

    // console.log(part);

    // part.loop = 1
    // part.loopEnd = '3m'
    part.start(0);
    Tone.Transport.start()
    // part.start(Tone.now())
    // part.start();
    // Tone.Transport.toggle()
    // noteArray = []
  }

  return (
   <div>
    <button onClick={setup}>Hello</button>
    <Form searchStock={searchStock} />
   </div>
  )
}

// ReactDOM.render(<App />, document.getElementById('app'))
// export default App
