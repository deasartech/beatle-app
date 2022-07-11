import { songs } from "./songs";

export const getDailyTrack = () => {
  const offsetFromDate = new Date(2022, 4, 30);

  const msOffset = Date.now() - offsetFromDate;
  const dayOffset = msOffset / 1000 / 60 / 60 / 24;
  //loop to start
  const wrap = (num) => {
    if (num > songs.length) num = num - songs.length;
    return num > songs.length ? wrap(num) : num;
  };

  const wrapped = wrap(dayOffset);

  const targetSong = songs[Math.floor(wrapped)];
  // const targetSong = songs[60];

  return targetSong;
};
