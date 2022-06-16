import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Username() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [colourArray, setColourArray] = useState([
    "blue",
    "coral",
    "dodgerblue",
    "springgreen",
    "yellowgreen",
    "green",
    "orangered",
    "red",
    "goldenrod",
    "hotpink",
    "cadetblue",
    "seagreen",
    "chocolate",
    "blueviolet",
    "firebrick",
  ]);
  const [colour, setColour] = useState();

  const randomColour = (colourArray) => {
    const length = colourArray.length;
    const random = Math.floor(Math.random() * length);
    const colourPicker = colourArray[random];
    return colourPicker;
  };

  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");

  const handleUsernameUpdate = async (event) => {
    event.preventDefault();
    const col = randomColour(colourArray);
    setColour(col);
    try {
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      // create user doc with uid
      await setDoc(doc(db, "users", auth.currentUser?.uid), {
        displayName: username,
        nameColour: col,
        totalPoints: 0,
        uid: auth.currentUser?.uid,
      });
      // create spot on leaderboard for player
      await setDoc(doc(db, "leaderboard", auth.currentUser?.uid), {
        username: username,
        nameColour: col,
        totalPoints: 0,
      });
      // navigation.navigate("Home");
      setUsername("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleUsernameUpdate} className="sign-group">
        <Row className="justify-content-center ms-auto p-2">
          <Col lg="5">
            <h5 className="text-center">Choose a username</h5>
            <Form.Control
              placeholder="username"
              className="my-1 mt-4"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />

            {error ? (
              <p className="text-center p-1">Something went wrong</p>
            ) : (
              ""
            )}
            <Button
              style={{ color: "white" }}
              variant="light"
              className="p-2 px-4 mt-3 play ms-auto align-items-center"
              type="submit"
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
