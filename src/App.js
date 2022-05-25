import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";

import { getDailyTrack } from "./utils/getDailyTrack";

function App() {
  const [user, setUser] = useState(null);
  const [songObj, setSongObj] = useState(null);
  const [songs, setSongs] = useState([
    {
      src: "./songs/055.wav",
      timestamp: [1000, 10000],
      name: "I'm Alright",
      artist: "Angels in Amplifiers",
      lyrics:
        "i know the seasons ripe for change it's changing all around i know the reasons you've arranged",
    },
    {
      song: "../assets/audio/stay.mp3",
      name: "two",
      artist: "test",
      lyrics:
        "here are some awesome test lyrics, today we will make progress and push this branch",
    },
    {
      song: "stay.mp3",
      name: "three",
      artist: "test",
      lyrics:
        "here are some awesome test lyrics, today we will make progress and push this branch",
    },
    {
      song: "stay.mp3",
      name: "four",
      artist: "test",
      lyrics:
        "here are some awesome test lyrics, today we will make progress and push this branch",
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
