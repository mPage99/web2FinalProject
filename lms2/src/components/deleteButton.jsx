import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";

function DeleteButton({ title, itemKey, callback }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleConfirm = () => {
    setShow(false);
    callback(itemKey);
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaTrash />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {title}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action cannot be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButton;
