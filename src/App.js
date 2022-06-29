import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import Leaderboard from "./components/Leaderboard";
import Username from "./components/Username";
import {
  fetchPlayerResults,
  addPlayerTotalPoints,
  addPointsLeaderboard,
} from "./utils/fetchPlayerResults";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [musicModalShow, setMusicModalShow] = useState(false);
  const [hearts, setHearts] = useState(0);
  const [played, setPlayed] = useState(false);
  // const [playerResults, setPlayerResults] = useState([]);
  const [hasPlayed, setHasPlayed] = useState([]);
  const [isReturning, setIsReturning] = useState(false);
  const [scores, setScores] = useState([]);
  const [totalPoints, setTotalPoints] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const heartsCookie = Cookies.get("hearts");
    const cookie = Cookies.get("played");
    const hasVisited = Cookies.get("isReturning");
    if (!heartsCookie) {
      setHearts(3);
    } else if (cookie === "true") {
      // Cookies.remove("hearts");
      setHearts(0);
    } else {
      setHearts(heartsCookie);
    }
    if (cookie === "true") {
      // Cookies.remove("hearts");
      setPlayed(true);
      setHearts(0);
      Cookies.set("isReturning", true, { expires: 365 });
    }
    if (hasVisited) {
      setIsReturning(true);
    }
    // fetchPlayerResults
    fetchPlayerResults(auth.currentUser?.uid).then((res) => {
      checkIfPlayedToday(res);
      setScores(res);
    });
    // update players totalPoints and also return the value
    addPlayerTotalPoints(scores, auth.currentUser?.uid)
      .then((res) => {
        setTotalPoints(res);
      })
      .catch((err) => {
        console.log(err, "addPlayerTotalPointsError");
      });
    // update leaderboard totalPoints
    addPointsLeaderboard(totalPoints, auth.currentUser?.uid)
      .then((res) => {})
      .catch((err) => {
        console.log(err, "addPointsLeaderboard");
      });
  }, [auth.currentUser?.uid, totalPoints, played]);

  const checkIfPlayedToday = (playerResults) => {
    const today = Date();
    const itemDate = today.split(" ");
    const newDate = itemDate.slice(1, 4).join(" ");
    const played = playerResults.filter((el) => {
      const split = el.date.split(" ");
      const date = split.slice(1, 4).join(" ");
      return date === newDate;
    });
    setHasPlayed(played);
  };

  return (
    <>
      <NavBar
        hearts={hearts}
        modalShow={modalShow}
        setModalShow={setModalShow}
        musicModalShow={musicModalShow}
        setMusicModalShow={setMusicModalShow}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                user={user}
                modalShow={modalShow}
                setModalShow={setModalShow}
                musicModalShow={musicModalShow}
                setMusicModalShow={setMusicModalShow}
                hearts={hearts}
                setHearts={setHearts}
                played={played}
                setPlayed={setPlayed}
                hasPlayed={hasPlayed}
                isReturning={isReturning}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/username" element={<Username />} />
          <Route
            path="/leaderboard"
            element={
              <Leaderboard
                scores={scores}
                setScores={setScores}
                totalPoints={totalPoints}
                setTotalPoints={setTotalPoints}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
