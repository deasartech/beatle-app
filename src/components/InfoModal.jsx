import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SignUp from "./SignUp";
import Login from "./Login";
import { auth } from "../firebase-config";

// instructions modal
export default function InfoModal(props, modalShow, setModalShow) {
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [hideText, setHideText] = useState(true);

  const handleLoginShow = () => {
    setHideText(true);
    setRegisterShow(false);
    setLoginShow(true);
  };

  const handleSignUpShow = () => {
    setHideText(true);
    setLoginShow(false);
    setRegisterShow(true);
  };

  return (
    <Modal
      {...props}
      size="md"
      dialogClassName="modal-border-0"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {loginShow && !auth.currentUser ? (
        <>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="infoModal">
            <Login hideText={hideText} setHideText={setHideText} />
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#334155" }}>
            {/* <Button href="/login" className="btn-trophy"> */}
            <Button onClick={handleSignUpShow} className="play">
              Create an account
            </Button>
          </Modal.Footer>
        </>
      ) : registerShow && !auth.currentUser ? (
        <>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="infoModal">
            <SignUp
              modalShow={modalShow}
              hideText={hideText}
              setHideText={setHideText}
            />
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#334155" }}>
            {/* <Button href="/login" className="btn-trophy"> */}
            <Button onClick={handleLoginShow} className="play">
              Sign in
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h2 className="modal-text">How to play</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="modal-text">
              <b>Beatle plays a new song every day</b>
            </p>
            <p className="modal-text">
              {" "}
              1. Listen to the track and memorise the lyrics
            </p>
            <p className="modal-text">
              2. You have 3 attempts to answer with the correct lyrics to win
            </p>
            <p className="modal-text">
              3. There is a leaderboard for the best players but you must be
              signed in to enter
            </p>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#334155" }}>
            {!auth.currentUser ? (
              <Button onClick={setLoginShow} className="play">
                Sign in
              </Button>
            ) : (
              <div className="py-3"></div>
            )}
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
