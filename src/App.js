import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import Leaderboard from "./components/Leaderboard";

import { getDailyTrack } from "./utils/getDailyTrack";

function App() {
  const [user, setUser] = useState(null);
  const [songObj, setSongObj] = useState(null);
  const [songs, setSongs] = useState([
    {
      src: ["./songs/055.wav", "./songs/055mixture.wav"],
      timestamp: [1000, 11000],
      name: "I'm Alright",
      artist: "Angels in Amplifiers",
      lyrics: [
        "I know the seasons ripe for change it's changing all around",
        "I know the reasons you've arranged they're tearing me down",
      ],
    },
    {
      src: ["./songs/005.wav", "./songs/005mixture.wav"],
      timestamp: [1000, 10000],
      name: "Milk Cow Blues",
      artist: "Angela Thomas Wade",
      lyrics: [
        "Well I woke up this morning looked out my door",
        "I could tell my Milk Cow I could tell by the way she luls",
      ],
    },
    {
      src: ["./songs/stay.mp3", "./songs/stay.mp3"],
      timestamp: [11300, 5900],
      name: "STAY",
      artist: "Justin Bieber and The Kid LARO",
      lyrics: [
        "I do the same thing I told you that I never would",
        "I told you I'd change even when I knew I never could",
      ],
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // console.log(getDailyTrack(songs), "app");
    // const dailySong = getDailyTrack(songs);
    // setSongObj(dailySong);
  });

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Dashboard songs={songs} songObj={songObj} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
