import React, { useState } from 'react'
import Tone from 'tone'
import StartAudioContext from 'startaudiocontext'

const Play = props => {
  const setup = () => {
    let noteArray = []
    let noteTime = 0
    let melody_one;
    let synth;
    Tone.Transport.stop()
    Tone.Transport.cancel()
    props.melody.forEach((melodyNote) => {
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

    part.start(0);
    Tone.Transport.start()
  }
  return(
    <div onClick={setup}>Hello</div>
  )
}

export default Play
