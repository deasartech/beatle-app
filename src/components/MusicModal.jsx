import React from "react";
import { Modal, Image } from "react-bootstrap";
import soundcloud from "../assets/soundcloud.png";

// Music information modal
export default function MusicModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      dialogClassName="modal-border-0"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className="modal-text">We Love Music</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-text">
            <b>Beatle plays a new song every day</b>
          </p>
          <p className="modal-text">
            This was built as a cool project for friends who love music to test
            their lyrical knowlegde in a fun way. All copyright goes to the
            artists featured.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#334155" }}>
          <Image src={soundcloud} />
        </Modal.Footer>
      </>
    </Modal>
  );
}
