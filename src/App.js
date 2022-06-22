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
import { fetchPlayerResults } from "./utils/fetchPlayerResults";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [musicModalShow, setMusicModalShow] = useState(false);
  const [hearts, setHearts] = useState(0);
  const [played, setPlayed] = useState(false);
  // const [playerResults, setPlayerResults] = useState([]);
  const [hasPlayed, setHasPlayed] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const heartsCookie = Cookies.get("hearts");
    if (!heartsCookie) {
      setHearts(3);
    } else {
      setHearts(heartsCookie);
    }
    const cookie = Cookies.get("played");
    if (cookie === "true") {
      setPlayed(true);
      setHearts(0);
    }
    // fetchPlayerResults
    fetchPlayerResults(auth.currentUser?.uid).then((res) => {
      checkIfPlayedToday(res);
    });
  }, [auth.currentUser?.uid]);

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
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/username" element={<Username />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
