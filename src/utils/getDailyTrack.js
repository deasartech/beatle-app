// import { targetSongs } from "./songs";

export const getDailyTrack = (songs) => {
  const offsetFromDate = new Date(2022, 4, 25);
  console.log(offsetFromDate, "offsetFromDate");
  const msOffset = Date.now() - offsetFromDate;
  const dayOffset = msOffset / 1000 / 60 / 60 / 24;
  console.log(dayOffset, "offset");
  // const targetSong = songs[Math.floor(dayOffset)];
  const targetSong = songs[0];
  return targetSong;
};
