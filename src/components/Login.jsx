import React from "react";
import { auth } from "../firebase-config";
import {
  //   createUserWithEmailAndPassword,
  //   signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form, Container, Button, Image } from "react-bootstrap";
import google from "../assets/google.png";

export default function Login() {
  //   const [loginEmail, setLoginEmail] = useState("");
  //   const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="text-center">
      <Form>
        <h4 className="mt-3">sign in with</h4>
        <Button
          style={{ color: "white" }}
          variant=""
          className="p-2 px-4 mt-3 align-items-center"
          onClick={signInWithGoogle}
        >
          <Image src={google} width="50" height="50" />
        </Button>
      </Form>
    </Container>
  );
}
