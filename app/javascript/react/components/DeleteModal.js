import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeleteModal = props => {
  const hide = () => {
    props.hideModal("delete")
  }
  
  return(
    <Modal show={props.show} onHide={hide}>
      <Modal.Header>
        <Modal.Title>Delete this melody?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>Are you sure you want to delete this melody? This will bring you back to the home page.</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>Close</Button>
        <Button variant="danger" onClick={props.deleteMelody}>Delete Melody</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
