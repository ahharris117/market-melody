import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const ScaleInfoModal = props => {
  return(
    <Modal show={props.show} size="lg" onHide={props.hide}>
      <Modal.Header>
        <Modal.Title>Scale Info</Modal.Title>
      </Modal.Header>

      <ListGroup>
        <ListGroup.Item action>Scale - a set of musical notes ordered by pitch</ListGroup.Item>
        <ListGroup.Item action>Arpeggio - notes of a chord</ListGroup.Item>
        <ListGroup.Item action>Minor - Most common minor scale</ListGroup.Item>
        <ListGroup.Item action>Harmonic Minor - Minor scale with a raised 7th, exotic sounding</ListGroup.Item>
        <ListGroup.Item action>Melodic Minor - Half major scale, half minor scale</ListGroup.Item>
        <ListGroup.Item action>Wholetone - often used in dream sequences</ListGroup.Item>
        <ListGroup.Item action>Symetric Diminished - Symetric scale mostly used in jazz</ListGroup.Item>
        <ListGroup.Item action>Dorian - Hip minor scale, often used in cool jazz</ListGroup.Item>
        <ListGroup.Item action>Mixolydian - Major scale, often used in funk </ListGroup.Item>
        <ListGroup.Item action>Blues - 6 note scale often used in, you guessed it, blues</ListGroup.Item>
        <ListGroup.Item action>C<sup>maj7</sup> - Major arpeggio for the bittersweet maj7 chord</ListGroup.Item>
        <ListGroup.Item action>E<sup>min7b5</sup> - Minor arpeggio with a flat 5th. Used often in jazz</ListGroup.Item>
        <ListGroup.Item action>C<sup>minmaj7</sup> - Minor arpeggio with a dissonant major 7th</ListGroup.Item>
        <ListGroup.Item action>C<sup>maj7#5</sup> - Major arpeggio with a raised 5th, can convey mystery, wonder</ListGroup.Item>
      </ListGroup>

      <Modal.Footer>
        <Button variant="primary" onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScaleInfoModal
