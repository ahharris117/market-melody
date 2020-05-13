import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const MelodyModal = props => {
  const hide = () => {
    props.hideModal("melody")
  }

  let melodyNotes;

  if (props.melody) {
    melodyNotes = props.melody.join(' ')
  }

  return(
    <Modal show={props.show} size="lg" onHide={hide}>
      <Modal.Header>
        <Modal.Title>Melody Notes:</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>{melodyNotes}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MelodyModal
