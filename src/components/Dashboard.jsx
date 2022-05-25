import React, { useEffect, useState } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { Howl } from "howler";
// import anime from "animejs/lib/anime.es.js";
import { initialiseClock } from "../utils/script";
import { fetchTrack } from "../utils/api";
import { getDailyTrack } from "../utils/getDailyTrack";
import { getTrack, getTimeRemaining, initialiseClock } from "../utils/script";
import gameOver from "../assets/audio/retro-game-over.wav";
import win from "../assets/audio/win.wav";
// import nlp
import nlp from "compromise";

export default function Dashboard({ songs }) {

  const [lyrics, setLyrics] = useState("");

  const [timePassed, setTimePassed] = useState(false);
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState();

  const [results, setResults] = useState([]);

  // answer
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const dailySong = getDailyTrack(songs);
    setTrack(dailySong);
    setLyrics(track?.lyrics);

    console.log(track?.timestamp, "track lol");

    console.log(initialiseClock("clockdiv"), "Clock");
  }, [track, songs]);

  // howler
  const sound = new Howl({
    src: [track?.src],
    sprite: {
      snippet: track?.timestamp,
    },
    onload: function () {
      setLoading(false);
    },
  });

  const overSound = new Howl({
    src: [gameOver],
  });

  const winSound = new Howl({
    src: [win],
  });

  const tileCard = document.getElementById("tile");

  const flipTile = (tile) => {
    setTimeout(() => {
      tile.classList.add("flip");
    }, [250]);

    tile.addEventListener("transitionend", () => {
      tile.classList.remove("flip");
    });
  };

  const handlePlay = () => {
    // const id1 = sound.play("chorus");
    // sound.rate(0.8, id1);
    sound.play("snippet");

    setPlay(true);
    sound.on("end", function () {
      flipTile(tileCard);
      setTimeout(() => {
        setTimePassed(true);
      }, [420]);
    });
  };

  const handleSubmit = () => {
    if (!answer) {
      console.log("empty");
      alert("Hello! your answer is empty!!");
      return;
    }

    const doc = lyrics;
    console.log(doc, "doc");
    const docClean = doc.replace(/[^\w\s]/gi, "").toLowerCase();
    console.log(docClean, "clean");
    const ans = answer;
    const ansClean = ans.replace(/[^\w\s]/gi, "").toLowerCase();
    // ans.contractions().expand().all().text();

    const docArr = docClean.split(" ");
    const ansArr = ansClean.split(" ");
    const docArrPure = docArr.filter((element) => {
      return element !== " " && element !== "";
    });

    console.log(docArrPure, "docArr");
    console.log(ansArr, "ansArr");

    let wordResults = [];
    for (let i = 0; i < docArrPure.length; i++) {
      let el = nlp(ansArr[i]);
      if (el.has(docArrPure[i])) {
        wordResults.push(true);
      } else {
        wordResults.push(false);
      }
    }
    console.log(wordResults, "result");

    if (!wordResults.includes(false)) {
      setResult("Correct");
      if (results.length < 3) {
        winSound.play();
        setResults([...results, "Correct"]);
      }
    } else if (wordResults.includes(false) && results.length < 2) {
      setResult("try again");
      setTimeout(() => {
        setTimePassed(false);
        setResult("");
        setAnswer("");
        setPlay(false);
      }, 3000);
      overSound.play();

      setResults([...results, "X"]);
    } else {
      setResult("Oh no..");
      setMessage("The answer was: \n\n" + lyrics);
      setResults([...results, "X"]);
      overSound.play();
    }
  };

  return (
    <>
      <Container>
        <Card id="clockdiv" className="border-0 text-center">
          <Row className="g-0">
            <Col> </Col>
            <Col className="block">
              <span className="hours"></span>
              <p className="smalltext">Hrs</p>
            </Col>
            <Col className="block">
              <span className="minutes"></span>
              <p className="smalltext">Mins</p>
            </Col>
            <Col className="block">
              <span className="seconds"></span>
              <p className="smalltext">Secs</p>
            </Col>
            <Col> </Col>
          </Row>
        </Card>

        <Card
          id="tile"
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
                <div className="sk-plane"></div>
              ) : (
                <>
                  {!timePassed ? (
                    <>
                      <h5 className="p-3 ml2" id="animateMe">
                        {lyrics}
                      </h5>
                    </>
                  ) : (
                    <>
                      <Container className="px-3">
                        {!result ? (
                          <>
                            <Form.Control
                              as="textarea"
                              className="contact shadow"
                              rows={2}
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
                            {/* <p>{track?.title}</p>
                            <Image
                              src={track?.albumArt}
                              height="100"
                              width="100"
                            /> */}
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
        <Card
          className="mt-3 p-2 border-0 shadow"
          style={{ minHeight: "110px" }}
        >
          <Row className="justify-content-center">
            <Col className="text-center align-items-center">
              <h2>1</h2>
              <h3 className={results[0] === "Correct" ? "pass" : "fail"}>
                {/* {results[0] || "none"} */}
                {results[0] || (
                  <div className="sk-wander sk-center mt-3">
                    <div classNames="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                  </div>
                )}
              </h3>
            </Col>
            <Col className="text-center">
              <h2>2</h2>
              <h3 className={results[1] === "Correct" ? "pass" : "fail"}>
                {/* {results[1] || "none"} */}
                {results[1] || (
                  <div className="sk-wander sk-center mt-3">
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                  </div>
                )}
              </h3>
            </Col>
            <Col className="text-center">
              <h2>3</h2>
              <h3 className={results[2] === "Correct" ? "pass" : "fail"}>
                {/* {results[2] || "none"} */}
                {results[2] || (
                  <div className="sk-wander sk-center mt-3">
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                  </div>
                )}
              </h3>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
