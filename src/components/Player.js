// import React, { useState, useRef } from "react";
// import ReactPlayer from "react-player";

// export default function Player({ playing, setPlaying }) {
//   const [seconds, setSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);

//   // ref
//   const playerRefs = useRef([]);
//   const ref = playerRefs.current[0];

//   const handlePlay = () => {
//     ref.seekTo(69, "seconds");
//     setPlaying(true);
//     setPlay(true);
//     // temporary work-around
//     setTimeout(() => {
//       setPlaying(false);
//     }, 13000);
//     // if (seconds >= 80) {
//     //   console.log("stop");
//     //   setPlaying(!playing);
//     // }
//   };

//   const handlePause = () => {
//     const tileCard = document.getElementById("tile");
//     flipTile(tileCard);
//     setTimeout(() => {
//       setTimePassed(true);
//       init();
//     }, [420]);
//   };

//   const handlePlayerLoaded = (e) => {
//     console.log("player loaded successfully");
//     setTimeout(() => {
//       setLoading(false);
//     }, [3000]);
//   };

//   const handleProgress = (secs) => {
//     setSeconds(secs);
//   };

//   const handleDuration = (dur) => {
//     setDuration(dur);
//   };
//   // Render a YouTube video player
//   return (
//     <ReactPlayer
//       url={`https%3A//api.soundcloud.com/tracks/${1262879566}`}
//       width="10%"
//       height="0"
//       style={{ display: "none" }}
//       ref={(el) => (playerRefs.current[0] = el)}
//       id="react-player"
//       // pip={pip}
//       playing={playing}
//       // controls={controls}
//       // light={light}
//       // loop={loop}
//       // playbackRate={playbackRate}
//       // volume={volume}
//       // muted={muted}
//       onReady={handlePlayerLoaded}
//       onStart={() => console.log("onStart")}
//       // onPlay={handlePlay}
//       // onEnablePIP={this.handleEnablePIP}
//       // onDisablePIP={this.handleDisablePIP}
//       onPause={handlePause}
//       onBuffer={() => console.log("onBuffer")}
//       // onPlaybackRateChange={this.handleOnPlaybackRateChange}
//       onSeek={(seconds) => console.log("onSeek", seconds)}
//       // onEnded={this.handleEnded}
//       onError={(e) => console.log("onError", e)}
//       onProgress={(e) => handleProgress(e.playedSeconds)}
//       onDuration={handleDuration}
//     />
//   );
// }
