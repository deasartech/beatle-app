var widgetIframe = document.getElementById("sc-widget"),
  widget = SC.Widget(widgetIframe);

function widgetPlay() {
  widget.play();
}

(function () {
  var widgetIframe = document.getElementById("sc-widget"),
    widget = SC.Widget(widgetIframe);
  console.log(widget, "widget");
  // widgetIframe.attr(
  //   "src",
  //   `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${1262879566}`
  // );
  // Churchill downs song

  const Churchill = {
    track: 1262879566,
    title: "Churchill Downs",
    atrist: "Jack Harlow ft. Drake",
    time: [69000, 80293],
  };

  widget.bind(SC.Widget.Events.READY, function () {
    widget.seekTo(Churchill.time[0]);
    widget.bind(SC.Widget.Events.PLAY, function () {});
    // get current level of volume
    widget.getVolume(function (volume) {
      console.log("current volume value is " + volume);
    });
    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function () {
      widget.getPosition((position) => {
        console.log(position);
        if (position >= Churchill.time[1]) {
          widget.pause();
          widget.seekTo(Churchill.time[0]);
          // trigger flip tile in Dashboard
        }
      });
    });

    // set new volume level
    widget.setVolume(50);
    widget.bind(SC.Widget.Events.FINISH, function () {
      console.log("finished");
    });
  });
})();
