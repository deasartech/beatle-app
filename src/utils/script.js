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

export const initialiseClock = (id) => {
  const clock = document.getElementById(id);

  const hoursSpan = clock.querySelector(".hours");
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining();

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

// First attempt countdown from 3
export const initialiseCountdown = (id) => {
  let timeleft = 3;

  const clock = document.getElementById(id);

  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      clock.querySelector(".countdown").innerHTML = "Finished";
    } else {
      clock.querySelector(".countdown").innerHTML = timeleft;
      console.log(timeleft);
    }
    timeleft -= 1;
  }, 1000);
};

export const calculateWPM = (time, wordCount) => {
  const one = wordCount / time;
  const wpm = one * 60;
  console.log(wpm, "wpm");
  return Math.round(wpm);
};
