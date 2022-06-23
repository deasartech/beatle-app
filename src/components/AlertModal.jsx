import React from "react";
import { Modal } from "react-bootstrap";

export default function AlertModal({ alert, setAlert }) {
  return (
    <>
      <Modal
        size="sm"
        show={alert}
        onHide={() => setAlert(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <h4 className="modal-text">Check Answer</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={"text-center"}>
          Your answer is missing something
        </Modal.Body>
      </Modal>
    </>
  );
}
