import React, { useEffect, useState } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { Howl } from "howler";
// import anime from "animejs/lib/anime.es.js";
import { initialiseClock } from "../utils/script";
import { getDailyTrack } from "../utils/getDailyTrack";
import gameOver from "../assets/audio/retro-game-over.wav";
import win from "../assets/audio/win.wav";
// import nlp
import nlp from "compromise";

export default function Dashboard({ songs }) {
  const [lyricsA, setLyricsA] = useState("");
  const [lyricsB, setLyricsB] = useState("");
  const [blockA, setBlockA] = useState("");
  const [blockB, setBlockB] = useState("");

  const [timePassed, setTimePassed] = useState(false);
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState();

  const [results, setResults] = useState([]);
  const [resultArray, setResultArray] = useState([]);

  // answer
  const [guessA, setGuessA] = useState("");
  const [guessB, setGuessB] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const [played, setPlayed] = useState(false);

  // const [answerA, setAnswerA] = useState("");
  // const [answerB, setAnswerB] = useState("");

  useEffect(() => {
    const dailySong = getDailyTrack(songs);
    setTrack(dailySong);
    // setLyrics(track?.lyrics);
    setBlockA(track?.lyrics[0]);
    setBlockB(track?.lyrics[1]);

    console.log(track?.timestamp, "track lol");
  }, [track, songs]);

  // howler
  const sound = new Howl({
    src: [track?.src],
    sprite: {
      snippet: track?.timestamp,
    },
    onload: function () {
      setTimeout(() => {
        setLoading(false);
      }, [1300]);
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

  ///////

  function init() {
    const sentenceArrayA = blockA.split(" ");
    setLyricsA(sentenceArrayA);
    const sentenceArrayB = blockB.split(" ");
    setLyricsB(sentenceArrayB);
    console.log(sentenceArrayA, "sentenceArrayA");
    console.log(sentenceArrayB, "sentenceArrayB");

    // setAnswerA(answerArrayA.join(" "));
    // console.log(answerA, "arrayA");
    // setAnswerB(answerArrayB.join("  "));
  }

  const handlePlay = () => {
    // const id1 = sound.play("chorus");
    // sound.rate(0.8, id1);
    sound.play("snippet");

    setPlay(true);
    sound.on("end", function () {
      flipTile(tileCard);
      setTimeout(() => {
        setTimePassed(true);
        init();
      }, [420]);
    });
  };

  const handleSubmit = () => {
    console.log(guessA, "submit guess");
    if (guessA.includes(undefined) || guessA.length < lyricsA.length) {
      alert("Hello! your answer is missing something!!");
      return;
    }

    const doc = blockA;
    console.log(doc, "doc");
    const docClean = doc.replace(/[^\w\s]/gi, "").toLowerCase();
    console.log(docClean, "clean");
    console.log(guessA, "ans guess <<<<<----");
    const ans = guessA.join(" ");
    const ansClean = ans.replace(/[^\w\s]/gi, "").toLowerCase();

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
    setResultArray(wordResults);

    if (!wordResults.includes(false)) {
      setTimeout(() => {
        setResult("Correct");
      }, 4000);

      if (results.length < 3) {
        winSound.play();
        setResults([...results, "Correct"]);
      }
    } else if (wordResults.includes(false) && results.length < 2) {
      setTimeout(() => {
        setResult("try again");
      }, 4000);
      setTimeout(() => {
        setTimePassed(false);
        setResult("");
        setGuessA("");
        setGuessB("");
        setResultArray("");
        setPlay(false);
      }, 6000);
      overSound.play();

      setResults([...results, "X"]);
    } else {
      setGuessA("");
      setGuessB("");
      setPlayed(true);
      setResult("Oh no..");
      setMessage("The answer was: \n\n" + track?.lyrics.join("\n"));
      setResults([...results, "X"]);
      setResultArray("");
      overSound.play();
    }
  };

  // handle input changeA
  const handleInputChangeA = (e, i) => {
    const newGuess = [...guessA];
    newGuess[i] = e.target.value;
    setGuessA(newGuess);

    console.log(guessA, "guessArray");
  };

  // handle input changeB
  const handleInputChangeB = (e, i) => {
    const newGuess = [...guessB];
    newGuess[i] = e.target.value;
    setGuessB(newGuess);

    console.log(guessB, "guessArray");
  };

  if (played) {
    initialiseClock("clockdiv");
  }

  return (
    <>
      <Container>
        <Card
          id="tile"
          className="justify-content-center text-center tile shadow border-0"
          style={{ maxHeight: "37rem", height: "28rem" }}
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
                      <Container className="text-center">
                        <p className="px-2 ml2" id="animateMe">
                          {blockA}
                        </p>
                        <p className="px-2 ml2" id="animateMe">
                          {blockB}
                        </p>
                      </Container>
                    </>
                  ) : (
                    <>
                      <Container className="px-2 text-center mb-2">
                        {!result ? (
                          <>
                            <p>{guessA ? guessA.join(" ") : null}</p>

                            <Form id="inputContainer" className="mb-2">
                              {lyricsA.map((element, index) => {
                                return (
                                  <>
                                    <div className="inputWrapper mx-2 mb-1 py-1">
                                      <Form.Control
                                        key={index}
                                        value={guessA[index]}
                                        maxLength={element.length}
                                        style={{
                                          minWidth: 20,
                                          width: 14 * element.length,
                                        }}
                                        className={
                                          resultArray[index]
                                            ? "green border-0 px-1"
                                            : resultArray[index] === false
                                            ? "red border-0 px-1"
                                            : "guessInput border-0 px-1"
                                        }
                                        onChange={(e) =>
                                          handleInputChangeA(e, index)
                                        }
                                      />
                                    </div>
                                  </>
                                );
                              })}
                              // <br />
                            </Form>
                            <Form id="inputContainer" className="mb-2">
                              {lyricsB.map((element, index) => {
                                return (
                                  <>
                                    <div className="inputWrapper mx-2 mb-1 py-1">
                                      <Form.Control
                                        key={"b" + index}
                                        value={guessB[index]}
                                        maxLength={element.length}
                                        style={{
                                          minWidth: 20,
                                          width: 15 * element.length,
                                        }}
                                        className={
                                          resultArray[index]
                                            ? "green border-0 px-1"
                                            : resultArray[index] === false
                                            ? "red border-0 px-1"
                                            : "guessInput border-0 px-1"
                                        }
                                        onChange={(e) =>
                                          handleInputChangeB(e, index)
                                        }
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </Form>

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
                            {played ? (
                              <>
                                <h5>Next Beatle in</h5>
                                <Card
                                  id="clockdiv"
                                  className="border-0 text-center"
                                >
                                  <Card.Body>
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
                                  </Card.Body>
                                </Card>
                              </>
                            ) : null}

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
