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
