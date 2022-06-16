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
  const [hearts, setHearts] = useState();
  const [played, setPlayed] = useState(false);
  const [songs, setSongs] = useState([
    {
      id: 1262879566,
      timestamp: [69, 10000],
      name: "Churchill Downs",
      artist: "Jack Harlow ft Drake",
      lyrics: [
        "All that time in the kitchen finally panned out I put some flavor in a pot and took the bland out",
        "I know my grandpa would have a heart attack if I pulled a hunnid grand out",
      ],
    },
    {
      id: 254527393,
      timestamp: [52, 15000],
      name: "Running Up That Hill (A Deal With God)",
      artist: "Kate Bush",
      lyrics: [
        "I'd make a deal with God And I'd get him to swap our places",
        "Be running up that road Be running up that hill Be running up that building",
      ],
    },
    {
      id: 1267146844,
      timestamp: [52, 9500],
      name: "Cooped Up (feat. Roddy Ricch)",
      artist: "Post Malone",
      lyrics: [
        "Feelin like an outcast I'm the only guy in slacks That'll cost you three stacks",
        "Now you're savin that check why you takin my swag Can you give me that back",
      ],
    },
    {
      id: 1245609985,
      timestamp: [112, 9000],
      name: "First Class",
      artist: "Jack Harlow",
      lyrics: [
        "This lifestyle don't got many downsides except for the lack of time I get round my",
        "Family, makin' sure they never downsize",
      ],
    },
  ]);

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
                songs={songs}
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
