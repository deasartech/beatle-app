import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SignUp from "./SignUp";
import Login from "./Login";
import { auth } from "../firebase-config";

// instructions modal
export default function InfoModal(props, setModalShow) {
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);

  const handleLoginShow = () => {
    setRegisterShow(false);
    setLoginShow(true);
  };

  const handleSignUpShow = () => {
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
          <Modal.Body>
            <Login setModalShow={setModalShow} />
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
          <Modal.Body>
            <SignUp setModalShow={setModalShow} />
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
              <h2>How to play</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>Beatle plays a new song every day</b>
            </p>
            <p> 1. listen to the track and memorise the lyrics</p>
            <p>
              2. You have 3 attempts to answer with the correct lyrics to win
            </p>
            <p>
              3. There is a leaderboard for the best players, but you must be
              signed in to view and enter
            </p>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#334155" }}>
            {!auth.currentUser ? (
              <Button onClick={setLoginShow} className="play">
                Sign in
              </Button>
            ) : (
              <div className="py-2"></div>
            )}
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
