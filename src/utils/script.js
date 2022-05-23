// import stay from "../assets/audio/stay.mp3";

const targetSongs = [
  {
    song: "../assets/audio/stay.mp3",
    name: "one",
    artist: "test",
    lyrics:
      "here are some awesome test lyrics, today we will make progress and push this branch",
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
];

export const getTrack = () => {
  const offsetFromDate = new Date(2022, 4, 20);
  console.log(offsetFromDate, "offsetFromDate");
  const msOffset = Date.now() - offsetFromDate;
  const dayOffset = msOffset / 1000 / 60 / 60 / 24;
  console.log(dayOffset, "offset");
  const targetSong = targetSongs[Math.floor(dayOffset)];
  return targetSong;
};

export const getTimeRemaining = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const deadline = tomorrow.toDateString();

  const total = Date.parse(deadline) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};

export const initialiseClock = (id, endtime) => {
  const clock = document.getElementById(id);

  const hoursSpan = clock.querySelector(".hours");
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = t.hours;
    minutesSpan.innerHTML = t.minutes;
    secondsSpan.innerHTML = t.seconds;

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
};

// const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
// initialiseClock("clockdiv", deadline);

// timing
