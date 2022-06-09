import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigate("/");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        setError(error);
      });
  };

  return (
    <>
      <Container className="align-items-center">
        <div className="text-center p-2">
          <h4>Sign in</h4>
          <Form onSubmit={handleSignIn}>
            <Row className="justify-content-center px-4">
              <Col lg="5">
                <Form.Control
                  placeholder="email"
                  className="my-1 mt-4 sign-form"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <br />
                <Form.Control
                  type="password"
                  className="my-1 sign-form"
                  value={password}
                  placeholder="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                {error ? (
                  <p className="text-center p-1">
                    Please check your email/password and try again
                  </p>
                ) : (
                  ""
                )}
                <Button
                  style={{ color: "white" }}
                  variant="light"
                  className="p-2 px-4 mt-3 btn-trophy align-items-center"
                  type="submit"
                >
                  Sign In
                </Button>
              </Col>
            </Row>
          </Form>
          <p className="py-3">
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Create an account
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
