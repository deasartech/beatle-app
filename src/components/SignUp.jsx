import React, { useState } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp({ user, setUser, setModalShow }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password === passwordCheck) {
      setValidated(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setEmail("");
        setPassword("");
        setModalShow(false);
        navigate("/username");
      } catch (error) {
        alert(error.message);
        console.log(error.message);
        setError(error);
      }
    } else {
      setMessage("Passwords do not match");
    }
  };

  return (
    <>
      <Container className="align-items-center">
        {user ? (
          navigate("/")
        ) : (
          <div className="text-center p-2">
            <h4>Sign up</h4>
            <Form
              onSubmit={handleSignUp}
              validated={validated}
              className="sign-group"
            >
              <Row className="justify-content-center px-4">
                <Col lg="5">
                  <Form.Control
                    placeholder="email"
                    className="my-1 mt-4"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <br />
                  <Form.Control
                    type="password"
                    className="my-1"
                    value={password}
                    placeholder="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <br />
                  <Form.Control
                    type="password"
                    className="my-1"
                    value={passwordCheck}
                    placeholder="confirm your password"
                    onChange={(event) => {
                      setPasswordCheck(event.target.value);
                    }}
                  />
                  {error || message ? (
                    <p className="text-center p-1">
                      {message ||
                        "Please check your email/password and try again"}
                    </p>
                  ) : (
                    ""
                  )}
                  <Button
                    style={{ color: "white" }}
                    variant="light"
                    className="p-2 px-4 mt-3 play align-items-center"
                    type="submit"
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Form>
            <p className="py-3">
              Have an account?{" "}
              <Link to="/login" className="link">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
