import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Button,
  Form,
  Card,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { Howl } from "howler";
// import anime from "animejs/lib/anime.es.js";
import { initialiseClock, initialiseCountdown } from "../utils/script";
import { getDailyTrack } from "../utils/getDailyTrack";
import wrongAnswer from "../assets/audio/incorrect.wav";
import gameOver from "../assets/audio/end.wav";
import win from "../assets/audio/win.wav";
// import nlp
import nlp from "compromise";
import { auth } from "../firebase-config";
import fire from "canvas-confetti";

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
  const [modalShow, setModalShow] = useState(true);

  const BACKSPACE_KEY = "Backspace";

  // const [answerA, setAnswerA] = useState("");
  // const [answerB, setAnswerB] = useState("");

  useEffect(() => {
    const dailySong = getDailyTrack(songs);
    setTrack(dailySong);
    // setLyrics(track?.lyrics);
    setBlockA(track?.lyrics[0]);
    setBlockB(track?.lyrics[1]);
  }, [track, songs]);

  // howler
  const sound = new Howl({
    src: [track?.src[0]],
    sprite: {
      snippet: track?.timestamp,
    },
    onload: function () {
      setTimeout(() => {
        setLoading(false);
      }, [3000]);
    },
  });

  // howler
  const wrongSound = new Howl({
    src: [wrongAnswer],
  });

  const finalSound = new Howl({
    src: [track?.src[1]],
  });

  const overSound = new Howl({
    src: [gameOver],
    onend: function () {
      finalSound.play();
    },
  });

  const winSound = new Howl({
    src: [win],
    onend: function () {
      finalSound.play();
    },
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
  }

  const handlePlay = () => {
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
    if (guessA.includes(undefined) || guessA.length < lyricsA.length) {
      alert("Hello! your answer is missing something!!");
      return;
    }
    if (guessB.includes(undefined) || guessB.length < lyricsB.length) {
      alert("Hello! your answer is missing something!!");
      return;
    }

    const doc = blockA;

    const docClean = doc.replace(/[^\w\s]/gi, "").toLowerCase();
    const ans = guessA.join(" ");
    const ansClean = ans.replace(/[^\w\s]/gi, "").toLowerCase();

    const docArr = docClean.split(" ");
    const ansArr = ansClean.split(" ");
    const docArrPure = docArr.filter((element) => {
      return element !== " " && element !== "";
    });

    const docB = blockB;

    const docBClean = docB.replace(/[^\w\s]/gi, "").toLowerCase();

    const ansB = guessB.join(" ");
    const ansBClean = ansB.replace(/[^\w\s]/gi, "").toLowerCase();

    const docBArr = docBClean.split(" ");
    const ansBArr = ansBClean.split(" ");
    const docBArrPure = docBArr.filter((element) => {
      return element !== " " && element !== "";
    });

    let wordResults = [];
    for (let i = 0; i < docArrPure.length; i++) {
      let el = nlp(ansArr[i]);
      if (el.has(docArrPure[i])) {
        wordResults.push(true);
      } else {
        wordResults.push(false);
      }
    }

    for (let i = 0; i < docBArrPure.length; i++) {
      let elB = nlp(ansBArr[i]);
      if (elB.has(docBArrPure[i])) {
        wordResults.push(true);
      } else {
        wordResults.push(false);
      }
    }

    console.log(wordResults, "result");
    setResultArray(wordResults);

    if (!wordResults.includes(false)) {
      setTimeout(() => {
        flipTile(tileCard);
      }, 4000);
      if (results.length < 3) {
        winSound.play();
        setTimeout(() => {
          setPlayed(true);
          setResults([...results, "Correct"]);
          setResult("Winner");
          fire(0.25, {
            spread: 26,
            startVelocity: 55,
          });
          fire(0.2, {
            spread: 60,
          });
          fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
          });
          fire(0.1, {
            spread: 180,
            startVelocity: 25,
            decay: 0.8,
            scalar: 1.2,
          });
          fire(0.1, {
            spread: 120,
            startVelocity: 45,
          });
        }, 4500);
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
      wrongSound.play();

      setResults([...results, "X"]);
    } else {
      setTimeout(() => {
        flipTile(tileCard);
      }, 4000);
      setTimeout(() => {
        setResult("So close... you'll get it tomorrow!");
        // setMessage("The answer was: \n\n" + track?.lyrics.join("\n"));
        setPlayed(true);
        setGuessA("");
        setGuessB("");
        setResults([...results, "X"]);
        setResultArray("");
      }, [4500]);
      overSound.play();
    }
  };

  // handle input changeA
  const handleInputChangeA = (e, i, maxLength) => {
    const newGuess = [...guessA];
    newGuess[i] = e.target.value.trim();
    setGuessA(newGuess);

    if (newGuess[i].length === maxLength) {
      changeInputFocus(i + 1);
    }
  };

  // focus inputs
  const inputRefs = useRef([]);

  const changeInputFocus = (i) => {
    const ref = inputRefs.current[i];
    if (ref) {
      ref.focus();
    }
  };

  // handle input changeB
  const handleInputChangeB = (e, i, maxLength) => {
    const newIndex = i + lyricsA.length;
    const newGuess = [...guessB];
    newGuess[i] = e.target.value.trim();
    setGuessB(newGuess);

    if (newGuess[i].length === maxLength) {
      changeInputFocus(newIndex + 1);
    }
  };

  // move focus to previous field
  const onKeyDown = (e, i, block) => {
    const newIndex = i + lyricsA.length;
    const keyCode = e.nativeEvent.code;

    if (keyCode !== BACKSPACE_KEY) {
      return;
    }

    if (block === "A") {
      if (guessA[i] === "" || guessA[i] === undefined) {
        changeInputFocus(i - 1);
      } else {
        handleInputChangeA("", i);
      }
    }

    if (block === "B") {
      if (guessB[i] === "" || guessB[i] === undefined) {
        changeInputFocus(newIndex - 1);
      } else {
        handleInputChangeB("", i);
      }
    }
  };

  if (played) {
    setTimeout(() => {
      initialiseClock("clockdiv");
    }, [420]);
  }

  // instructions modal
  function Instructions(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            How to play
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Beatle plays a new song every day</h4>
          <p> 1. listen to the track and memorise the lyrics</p>
          <p>2. You have 3 attempts to answer with the correct lyrics to win</p>
          <p>
            3. There is a leaderboard for the best players, but you must be
            signed in to view and enter
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button href="/login" className="btn-trophy">
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Countdown
  // let timer;
  // let timeRemaining = 3;

  // function updateTimer() {
  //   timeRemaining = timeRemaining - 1;
  //   if (timeRemaining >= 0) ;
  //   else {
  //     gameOver();
  //   }
  // }
  // timer = setInterval(updateTimer, 1000);

  return (
    <>
      <Container className="text-center">
        {!auth.currentUser ? (
          <Instructions show={modalShow} onHide={() => setModalShow(false)} />
        ) : null}

        <Card
          id="tile"
          className="main-card justify-content-center text-center tile shadow border-0 mx-auto"
          style={{
            maxHeight: "37rem",
            height: "28rem",
            maxWidth: "50rem",
          }}
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
                <>
                  <div className="sk-plane"></div>
                </>
              ) : (
                <>
                  {!timePassed ? (
                    <>
                      <Row>
                        <Col>
                          <Container className="text-center mx-auto ml2-wrapper">
                            <p className="px-2 ml2">{blockA}</p>
                            <p className="px-2 ml2">{blockB}</p>
                          </Container>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <>
                      {!result ? (
                        <>
                          {/* <Container className="px-auto text-center">
                            <p>{guessA ? guessA.join(" ") : " "}</p>
                            <p>{guessB ? guessB.join(" ") : " "}</p>
                          </Container> */}
                          <Row>
                            <Col>
                              <Container className="px-2 text-center mt-1">
                                <Form id="inputContainer" className="mb-2">
                                  {lyricsA.map((element, index) => {
                                    return (
                                      <>
                                        <div className="inputWrapper mx-2 mb-1 py-1">
                                          <Form.Control
                                            ref={(el) => {
                                              if (el) {
                                                inputRefs.current[index] = el;
                                              }
                                            }}
                                            key={index}
                                            value={guessA[index]}
                                            maxLength={element.length}
                                            style={{
                                              minWidth: 20,
                                              width: 14 * element.length,
                                            }}
                                            className={
                                              resultArray[index] === true
                                                ? "green border-0 px-1"
                                                : resultArray[index] === false
                                                ? "red border-0 px-1"
                                                : "guessInput border-0 px-1"
                                            }
                                            onKeyDown={(e) =>
                                              onKeyDown(e, index, "A")
                                            }
                                            onChange={(e) =>
                                              handleInputChangeA(
                                                e,
                                                index,
                                                element.length
                                              )
                                            }
                                          />
                                        </div>
                                      </>
                                    );
                                  })}
                                  <br />
                                </Form>
                                <Form id="inputContainer" className="mb-2">
                                  {lyricsB.map((element, index) => {
                                    return (
                                      <>
                                        <div className="inputWrapper mx-2 mb-1 py-1">
                                          <Form.Control
                                            ref={(el) => {
                                              if (el) {
                                                inputRefs.current[
                                                  index + lyricsA.length
                                                ] = el;
                                              }
                                            }}
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
                                            onKeyDown={(e) =>
                                              onKeyDown(e, index, "B")
                                            }
                                            onChange={(e) =>
                                              handleInputChangeB(
                                                e,
                                                index,
                                                element.length
                                              )
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
                                  Guess
                                </Button>
                              </Container>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>
                          <Container className="px-2 text-center mb-2">
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

                            <h5>{result}</h5>
                          </Container>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Card>
        <Card
          className="results mt-3 p-2 border-0 shadow mx-auto"
          style={{ minHeight: "110px", maxWidth: "50rem" }}
        >
          <Row className="justify-content-center">
            <Col className="text-center align-items-center">
              <h2>1</h2>
              <h3 className={results[0] === "Correct" ? "pass" : "fail"}>
                {/* {results[0] || "none"} */}
                {results[0] || (
                  <div className="sk-wander sk-center mt-3">
                    <div className="sk-wander-cube"></div>
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
