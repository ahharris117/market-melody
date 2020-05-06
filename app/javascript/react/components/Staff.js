import React from 'react'
import Vex from 'vexflow'

const Staff = props => {
  VF = Vex.Flow;
  let div = document.getElementById('staff')
  let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  renderer.resize(800, 800);

  let context = renderer.getContext();

  let stave = new VF.Stave(10, 40, 700);

  stave.addClef("treble").addTimeSignature("4/4");

  stave.setContext(context).draw();

  melodyArray = [];
  props.melody.forEach((note) => {
    melodyArray.push(new VF.StaveNote({clef: "treble", keys: [note], duration: "16" }))
  })

  staffNotes = new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(melodyArray)

  staffNotes.forEach(function(v) { v.draw(context, stave); })
  return(
    <div id="staff"></div>
  )
}

export default Staff
