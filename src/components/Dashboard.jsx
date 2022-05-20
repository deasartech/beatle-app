import React, { useEffect, useState } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { getLyrics, getSong } from "genius-lyrics-api";
import { fetchTrack } from "../utils/api";
import { Howl, Howler } from "howler";
// import Player from "./Player";
import stay from "../assets/audio/stay.mp3";

export default function Dashboard() {
  const [lyrics, setLyrics] = useState(null);
  const [timePassed, setTimePassed] = useState(false);
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState([]);

  // answer
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  // lyrics
  const options = {
    apiKey: "ZjqI5BRYEmR_6jSPsqAbGC0D6hGaAVy_3ljEDEv6uSN_IgaCoGtj-9RDG09sv8H8",
    title: "Stay",
    artist: "the Kid Laroi",
    optimizeQuery: true,
  };

  // howler
  let sound = new Howl({
    src: [stay],
    sprite: {
      chorus: [45000, 10000],
    },
    onload: function () {
      setLoading(false);
    },
  });

  useEffect(() => {
    getLyrics(options).then((lyrics) => {
      console.log(lyrics);
      console.log(lyrics.slice(24, 198));
      setLyrics(lyrics.slice(24, 198));
    });
    // deezer call
    // fetchTrack(3362856).then((data) => {
    //   console.log(data, "dashboard res");
    // });
  }, [options]);

  const handlePlay = () => {
    const id1 = sound.play("chorus");
    sound.rate(0.8, id1);

    setPlay(true);
    sound.on("end", function () {
      setTimePassed(true);
    });
  };

  const handleSubmit = () => {
    if (!answer) {
      console.log("empty");
      alert("Hello! your answer is empty!!");
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
        <br />
        <Card
          className="justify-content-center text-center tile shadow border-0"
          style={{ height: "25rem" }}
        >
          {!play ? (
            <Container>
              <Button onClick={handlePlay} className="btn-trophy px-4">
                Play
              </Button>
            </Container>
          ) : (
            <>
              {loading ? (
                <p>waiting...</p>
              ) : (
                <>
                  {!timePassed ? (
                    <h3 className="p-3">{lyrics}</h3>
                  ) : (
                    <>
                      <Container className="px-3">
                        {!result ? (
                          <>
                            <Form.Control
                              as="textarea"
                              className="contact shadow"
                              rows={4}
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              placeholder="type your answer here"
                            />
                            <Button
                              onClick={handleSubmit}
                              className="m-3 btn-trophy"
                            >
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
            </>
          )}
        </Card>
        <Card className="mt-3 p-2 border-0 shadow">
          <Row className="justify-content-center">
            <Col className="text-center">
              <h2>1</h2>
              <h3 className={results[0] === "Correct" ? "pass" : null}>
                {results[0] || "none"}
              </h3>
            </Col>
            <Col className="text-center">
              <h2>2</h2>
              <h3 className={results[1] === "Correct" ? "pass" : null}>
                {results[1] || "none"}
              </h3>
            </Col>
            <Col className="text-center">
              <h2>3</h2>
              <h3 className={results[2] === "Correct" ? "pass" : null}>
                {results[2] || "none"}
              </h3>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
