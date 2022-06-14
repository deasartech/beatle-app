var widgetIframe = document.getElementById("sc-widget"),
  widget = SC.Widget(widgetIframe);

function widgetPlay() {
  widget.play();
}

// function new Promise

(function () {
  var widgetIframe = document.getElementById("sc-widget"),
    widget = SC.Widget(widgetIframe);

  widget.bind(SC.Widget.Events.READY, function () {
    widget.seekTo(44000);
    widget.bind(SC.Widget.Events.PLAY, function () {});
    // get current level of volume
    widget.getVolume(function (volume) {
      console.log("current volume value is " + volume);
    });
    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function () {
      widget.getPosition((position) => {
        console.log(position);
        if (position >= 60865) {
          widget.pause();

          widget.seekTo(44000);
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
