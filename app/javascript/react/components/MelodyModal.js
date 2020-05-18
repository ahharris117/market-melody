import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const MelodyModal = props => {
  const hide = () => props.hideModal("melody");

  return(
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hide}>
      <Modal.Header>
        <Modal.Title>Melody Notes</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>{props.melody && props.melody.join(' ')}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MelodyModal
