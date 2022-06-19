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

function App() {
  const [user, setUser] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [musicModalShow, setMusicModalShow] = useState(false);
  const [hearts, setHearts] = useState(0);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

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
