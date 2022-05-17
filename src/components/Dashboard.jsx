import React, { useEffect, useState } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { getLyrics, getSong } from "genius-lyrics-api";
import { fetchTrack } from "../utils/api";
// import Player from "./Player";

export default function Dashboard() {
  const [lyrics, setLyrics] = useState(null);
  const [timePassed, setTimePassed] = useState(false);
  const [play, setPlay] = useState(false);

  const [results, setResults] = useState([]);

  // answer
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const options = {
    apiKey: "ZjqI5BRYEmR_6jSPsqAbGC0D6hGaAVy_3ljEDEv6uSN_IgaCoGtj-9RDG09sv8H8",
    title: "Blinding Lights",
    artist: "The Weeknd",
    optimizeQuery: true,
  };

  useEffect(() => {
    getLyrics(options).then((lyrics) => {
      console.log(lyrics);
      setLyrics(lyrics.slice(24, 44));
    });
    fetchTrack(3362856).then((data) => {
      console.log(data, "dashboard res");
    });
  }, [options]);

  const handlePlay = () => {
    setPlay(true);
    setTimeout(() => {
      setTimePassed(true);
      console.log("this is the first message");
    }, 5000);
  };

  const handleSubmit = () => {
    if (!answer) {
      console.log("empty");
      alert("Hello! I am an alert box!!");
      return;
    }
    if (answer.toLowerCase() === lyrics.toLowerCase()) {
      setResult("Correct");
      if (results.length < 3) {
        setResults([...results, "Correct"]);
      }
    } else if (
      answer.toLowerCase() !== lyrics.toLowerCase() &&
      results.length < 2
    ) {
      setResult("Incorrect");
      setTimeout(() => {
        setTimePassed(false);
        setResult("");
        setAnswer("");
        setPlay(false);
      }, 3000);

      setResults([...results, "Incorrect"]);
    } else {
      console.log("whut");
      setResult("Incorrect");
      setMessage("The answer was: " + lyrics);
      setResults([...results, "Incorrect"]);
    }
  };

  return (
    <>
      <Container>
        {/* <Player accessToken={accessToken} /> */}
        <br />
        <Card
          className="justify-content-center text-center tile"
          style={{ height: "25rem" }}
        >
          {!play ? (
            <Container>
              <Button onClick={handlePlay} className="">
                Play
              </Button>
            </Container>
          ) : (
            <>
              {!timePassed ? (
                <h3>{lyrics}</h3>
              ) : (
                <>
                  <Container>
                    {!result ? (
                      <>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="type your answer here"
                        />
                        <Button onClick={handleSubmit} className="m-3">
                          Submit
                        </Button>
                      </>
                    ) : (
                      <>
                        <h3>{result}</h3>
                        <p>{message}</p>
                      </>
                    )}
                  </Container>
                </>
              )}
            </>
          )}
        </Card>
        <Card className="mt-3 p-2">
          <Row className="justify-content-center">
            <Col className="text-center">
              <h1>1</h1>
              <h3>{results[0]}</h3>
            </Col>
            <Col className="text-center">
              <h1>2</h1>
              <h3>{results[1]}</h3>
            </Col>
            <Col className="text-center">
              <h1>3</h1>
              <h3>{results[2]}</h3>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
