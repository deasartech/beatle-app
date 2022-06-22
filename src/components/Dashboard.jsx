import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { Howl } from "howler";
// import anime from "animejs/lib/anime.es.js";
import { getTimeRemaining, initialiseClock } from "../utils/script";
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
import AlertModal from "./AlertModal";
import Cookies from "js-cookie";

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
  hasPlayed,
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
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [playsinline, setPlaysinline] = useState(true);
  // const [seconds, setSeconds] = useState(0);
  // const [duration, setDuration] = useState(0);

  const [results, setResults] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  // const [scoreValues, setScoreValues] = useState({});
  // const [score, setScore] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // answer
  const [guessA, setGuessA] = useState("");
  const [guessB, setGuessB] = useState("");
  const [result, setResult] = useState(null);
  // const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const BACKSPACE_KEY = "Backspace";

  useEffect(() => {
    const dailySong = getDailyTrack(songs);
    setTrack(dailySong);
    // setLyrics(track?.lyrics);
    setBlockA(track?.lyrics[0]);
    setBlockB(track?.lyrics[1]);
    if (!played) {
      const button = document.getElementById("play-button");
      button.addEventListener("click", () => handlePlayButtonClick());
    } else {
      setPlay(true);
      setLoading(false);
      setTimePassed(true);
      setResult(true);
    }
  }, [track, songs, played, setHearts]);

  // // ref
  const playerRefs = useRef([]);
  const ref = playerRefs.current[0];

  // to be used by event listener on play button to solve safari autplay issue
  const handleOnPlay = () => {};

  const handlePlayButtonClick = (e) => {
    handlePlay();
  };

  // handle play triggers each attempt
  const handlePlay = () => {
    if (hearts > 0) {
      if (isReady) {
        setLoading(true);
        setPlay(true);
        setTimeout(() => {
          setSubmitted(false);
          setLoading(false);
          setMuted(false);
          setPlaying(true);
          ref.seekTo(track?.timestamp[0], "seconds");
          setVolume(1);
        }, 2000);
        // temporary work-around
        setTimeout(() => {
          setPlaying(false);
        }, track?.timestamp[1] + 1000);
        // if (seconds >= 80) {
        //   console.log("stop");
        //   setPlaying(!playing);
        // }
      }
    } else if (hearts === 0) {
      setPlaying(true);
    } else {
      console.log("error");
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
    setIsReady(true);
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
      setMuted(false);
    },
  });

  const winSound = new Howl({
    src: [win],
    onend: function () {
      ref.seekTo(0, "seconds");
      setPlaying(true);
      setMuted(false);
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
    if (hasPlayed[0]) {
      console.log("player already played today");
    } else {
      const date = Date.now();
      const added = await setDoc(
        doc(db, `users/${auth.currentUser?.uid}/scores`, `${date}`),
        {
          date: Date(),
          points: score,
        }
      );
    }
  };

  // handleSubmit: check guess submission and calculate result
  const handleSubmit = (e) => {
    getTimeRemaining();
    e.preventDefault();
    e.stopPropagation();
    setAlert(false);
    setSubmitted(true);

    if (guessA.includes(undefined) || guessA.length < lyricsA.length) {
      // alert("Hello! your answer is missing something!!");
      setAlert(true);
      setSubmitted(false);
      return;
    }
    if (guessB.includes(undefined) || guessB.length < lyricsB.length) {
      // alert("Hello! your answer is missing something!!");
      setAlert(true);
      setSubmitted(false);
      return;
    }

    const wordResults = checkGuess(blockA, blockB, guessA, guessB);
    // console.log(wordResults, "wordResults");
    setResultArray(wordResults);

    const remaining = getTimeRemaining();
    const endOfDay = remaining.hours / 24;

    if (!wordResults.includes(false)) {
      Cookies.set("played", "true", { expires: endOfDay });
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
      Cookies.set("hearts", hearts - 1, { expires: endOfDay });
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
      Cookies.set("hearts", 0, { expires: endOfDay });
      Cookies.set("played", "true", { expires: endOfDay });
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
        autoPlay
        playsinline={playsinline}
        muted={muted}
        url={`https%3A//api.soundcloud.com/tracks/${track?.id}`}
        width="100%"
        height="0"
        style={{ visibility: "hidden" }}
        ref={(el) => (playerRefs.current[0] = el)}
        id="react-player"
        // pip={pip}
        playing={playing}
        // controls={controls}
        // light={light}
        // loop={loop}
        // playbackRate={playbackRate}
        volume={volume}
        onReady={handlePlayerLoaded}
        onStart={() => console.log("onStart")}
        onPlay={handleOnPlay}
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
            <>
              <Container>
                {/* <Player /> */}
                <div>
                  {!isReady ? (
                    <div className="text-center my-5">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : null}
                  <Button
                    id="play-button"
                    onClick={handlePlayButtonClick}
                    className={!isReady ? "noplay px-4" : "play px-4"}
                  >
                    Play
                  </Button>
                </div>
              </Container>
              <div className={!isReady ? "noplay" : "mt-4"}>
                <h5>Turn your volume up and tap play</h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="white"
                  className="bi bi-volume-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
                  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
                  <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
                </svg>
              </div>
            </>
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
                            <p className="px-4 py-0 ml2">{blockA}</p>
                            <p className="px-4 py-0 ml2">{blockB}</p>
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
                              <AlertModal
                                show={alert}
                                onHide={() => setAlert(false)}
                                alert={alert}
                                setAlert={setAlert}
                              />
                              <Container className="p-3 text-center mt-1">
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
                                                ? "greenGuess border-0 px-1"
                                                : resultArray[index] === false
                                                ? "redGuess border-0 px-1"
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
                                                ? "greenGuess border-0 px-1"
                                                : resultArray[
                                                    index + guessA.length
                                                  ] === false
                                                ? "redGuess border-0 px-1"
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
                                  disabled={submitted}
                                  onClick={(e) => handleSubmit(e)}
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
                className={results[0] === "Correct" ? "pass my-4" : "fail my-4"}
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
                className={results[1] === "Correct" ? "pass my-4" : "fail my-4"}
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
                className={results[2] === "Correct" ? "pass my-4" : "fail my-4"}
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
