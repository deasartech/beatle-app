import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { Howl } from "howler";
// import anime from "animejs/lib/anime.es.js";
import { initialiseClock } from "../utils/script";
import { getDailyTrack } from "../utils/getDailyTrack";
import wrongAnswer from "../assets/audio/incorrect.wav";
import gameOver from "../assets/audio/end.wav";
import win from "../assets/audio/win.wav";
// import nlp
// import nlp from "compromise";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import fire from "canvas-confetti";
import ReactPlayer from "react-player";
// import Player from "./Player";
import { checkGuess } from "../utils/checkGuess";
import InfoModal from "./InfoModal";
import MusicModal from "./MusicModal";

export default function Dashboard({
  songs,
  user,
  modalShow,
  setModalShow,
  musicModalShow,
  setMusicModalShow,
  hearts,
  setHearts,
  played,
  setPlayed,
}) {
  const [lyricsA, setLyricsA] = useState("");
  const [lyricsB, setLyricsB] = useState("");
  const [blockA, setBlockA] = useState("");
  const [blockB, setBlockB] = useState("");

  const [timePassed, setTimePassed] = useState(false);
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState();
  const [playing, setPlaying] = useState(false);
  // const [seconds, setSeconds] = useState(0);
  // const [duration, setDuration] = useState(0);

  const [results, setResults] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  // const [scoreValues, setScoreValues] = useState({});
  // const [score, setScore] = useState(0);

  // answer
  const [guessA, setGuessA] = useState("");
  const [guessB, setGuessB] = useState("");
  const [result, setResult] = useState(null);
  // const [message, setMessage] = useState("");

  const BACKSPACE_KEY = "Backspace";

  useEffect(() => {
    const dailySong = getDailyTrack(songs);
    setTrack(dailySong);
    // setLyrics(track?.lyrics);
    setBlockA(track?.lyrics[0]);
    setBlockB(track?.lyrics[1]);
    if (!played) {
      setHearts(3);
    }
  }, [track, songs, played, setHearts]);

  // ref
  const playerRefs = useRef([]);
  const ref = playerRefs.current[0];

  const handlePlay = () => {
    if (hearts > 0) {
      ref.seekTo(track?.timestamp[0], "seconds");
      setPlaying(true);
      setPlay(true);
      // temporary work-around
      setTimeout(() => {
        setPlaying(false);
      }, track?.timestamp[1]);
      // if (seconds >= 80) {
      //   console.log("stop");
      //   setPlaying(!playing);
      // }
    } else {
      setPlaying(true);
    }
  };

  const handlePause = () => {
    flipTile(tileCard);
    setTimeout(() => {
      setTimePassed(true);
      init();
    }, [420]);
  };

  const handlePlayerLoaded = (e) => {
    console.log("player loaded successfully");
    setTimeout(() => {
      setLoading(false);
    }, [3000]);
  };

  const handleProgress = (secs) => {
    // setSeconds(secs);
  };

  const handleDuration = (dur) => {
    // setDuration(dur);
  };

  // howler
  const wrongSound = new Howl({
    src: [wrongAnswer],
  });

  const overSound = new Howl({
    src: [gameOver],
    onend: function () {
      setPlaying(true);
    },
  });

  const winSound = new Howl({
    src: [win],
    onend: function () {
      ref.seekTo(0, "seconds");
      setPlaying(true);
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

  function init() {
    const sentenceArrayA = blockA.split(" ");
    setLyricsA(sentenceArrayA);
    const sentenceArrayB = blockB.split(" ");
    setLyricsB(sentenceArrayB);
  }

  // // handleAddScore: Add score to database
  const handleAddScore = async (score) => {
    const date = Date.now();
    const added = await setDoc(
      doc(db, `users/${auth.currentUser?.uid}/scores`, date),
      {
        points: score,
      }
    );
    console.log(added, "score added response");
  };

  // handleSubmit: check guess submission and calculate result
  const handleSubmit = () => {
    if (guessA.includes(undefined) || guessA.length < lyricsA.length) {
      alert("Hello! your answer is missing something!!");
      return;
    }
    if (guessB.includes(undefined) || guessB.length < lyricsB.length) {
      alert("Hello! your answer is missing something!!");
      return;
    }

    const wordResults = checkGuess(blockA, blockB, guessA, guessB);
    console.log(wordResults, "wordResults");
    setResultArray(wordResults);

    if (!wordResults.includes(false)) {
      setTimeout(() => {
        flipTile(tileCard);
      }, 4000);
      if (results.length < 3) {
        // ADD SCORE

        if (results.length === 0) {
          handleAddScore(15);
        } else if (results.length === 1) {
          handleAddScore(10);
        } else {
          handleAddScore(5);
        }
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
      setHearts((currNum) => currNum - 1);
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
      setHearts((currNum) => currNum - 1);
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

  return (
    <>
      <ReactPlayer
        url={`https%3A//api.soundcloud.com/tracks/${track?.id}`}
        width="10%"
        height="0"
        style={{ display: "none" }}
        ref={(el) => (playerRefs.current[0] = el)}
        id="react-player"
        // pip={pip}
        playing={playing}
        // controls={controls}
        // light={light}
        // loop={loop}
        // playbackRate={playbackRate}
        // volume={volume}
        // muted={muted}
        onReady={handlePlayerLoaded}
        onStart={() => console.log("onStart")}
        // onPlay={handlePlay}
        // onEnablePIP={this.handleEnablePIP}
        // onDisablePIP={this.handleDisablePIP}
        onPause={handlePause}
        onBuffer={() => console.log("onBuffer")}
        // onPlaybackRateChange={this.handleOnPlaybackRateChange}
        onSeek={(seconds) => console.log("onSeek", seconds)}
        // onEnded={this.handleEnded}
        onError={(e) => console.log("onError", e)}
        onProgress={(e) => handleProgress(e.playedSeconds)}
        onDuration={handleDuration}
      />
      <Container className="text-center">
        <InfoModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          user={user}
          setModalShow={setModalShow}
        />
        <MusicModal
          show={musicModalShow}
          onHide={() => setMusicModalShow(false)}
        />
        <Card
          id="tile"
          className="main-card justify-content-center text-center tile shadow border-0 mx-auto"
          style={{
            maxHeight: "35rem",
            height: "28rem",
            maxWidth: "45rem",
          }}
        >
          {!play ? (
            <Container>
              {/* <Player /> */}
              <Button
                id="play-button"
                onClick={handlePlay}
                className="play px-4"
              >
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
                                              // const newIndex = (index + guessA.length)
                                              resultArray[index + guessA.length]
                                                ? "green border-0 px-1"
                                                : resultArray[
                                                    index + guessA.length
                                                  ] === false
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
                                  className="m-3 play"
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
                            {played || hearts === 0 ? (
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
              {/* <h2>1</h2> */}
              <h3
                className={
                  results[0] === "Correct my-4" ? "pass my-4" : "fail my-4"
                }
              >
                {/* {results[0] || "none"} */}
                {results[0] || (
                  <div className="sk-wander sk-center my-4">
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                  </div>
                )}
              </h3>
            </Col>
            <Col className="text-center">
              {/* <h2>2</h2> */}
              <h3
                className={
                  results[1] === "Correct my-4" ? "pass my-4" : "fail my-4"
                }
              >
                {/* {results[1] || "none"} */}
                {results[1] || (
                  <div className="sk-wander sk-center my-4">
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                    <div className="sk-wander-cube"></div>
                  </div>
                )}
              </h3>
            </Col>
            <Col className="text-center">
              {/* <h2>3</h2> */}
              <h3
                className={
                  results[2] === "Correct my-4" ? "pass my-4" : "fail my-4"
                }
              >
                {/* {results[2] || "none"} */}
                {results[2] || (
                  <div className="sk-wander sk-center my-4">
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
