// import { targetSongs } from "./songs";

export const getDailyTrack = (songs) => {
  const offsetFromDate = new Date(2022, 4, 28);

  const msOffset = Date.now() - offsetFromDate;
  const dayOffset = msOffset / 1000 / 60 / 60 / 24;

  //loop to start
  const wrap = (num) => {
    if (num > songs.length) num = num - songs.length;
    return num > songs.length ? wrap(num) : num;
  };

  const wrapped = wrap(dayOffset);
  console.log(dayOffset, "offset");
  console.log(wrapped, "wrapped");

  const targetSong = songs[Math.floor(wrapped)];
  // const targetSong = songs[1];
  return targetSong;
};
