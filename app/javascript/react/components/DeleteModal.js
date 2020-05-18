import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeleteModal = props => {
  const hide = () => {
    props.hideModal("delete")
  };

  return(
    <Modal show={props.show} onHide={hide}>
      <Modal.Header>
        <Modal.Title>Delete this Melody?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to delete this melody? Clicking delete will permanently delete this melody and bring you back to the home page.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>Close</Button>
        <Button variant="danger" onClick={props.deleteMelody}>Delete Melody</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal
