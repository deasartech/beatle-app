// import React from "react";

// export default function Player() {
//   (function () {
//     var iframeElement = document.querySelector("iframe");
//     var iframeElementID = iframeElement.id;
//     var widget = SC.Widget(iframeElement);
//     var widget2 = SC.Widget(iframeElementID);
//     // var widgetIframe = document.getElementById("sc-widget"),
//     //   widget = SC.Widget(widgetIframe);

//     widget.bind(SC.Widget.Events.READY, function () {
//       widget.bind(SC.Widget.Events.PLAY, function () {
//         // get information about currently playing sound
//         widget.getCurrentSound(function (currentSound) {
//           console.log("sound " + currentSound.get("") + "began to play");
//         });
//       });
//       // get current level of volume
//       widget.getVolume(function (volume) {
//         console.log("current volume value is " + volume);
//       });
//       // set new volume level
//       widget.setVolume(50);
//       // get the value of the current position
//     });
//   })();
//   return (
//     <iframe
//       allow="autoplay"
//       id="sc-widget"
//       src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp;"
//       width="100%"
//       height="465"
//       scrolling="no"
//       frameborder="no"
//     ></iframe>
//   );
// }
