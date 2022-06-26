import axios from "axios";

const api = axios.create({
  baseURL: "https://api.deezer.com",
});

// export function fetchTrack(trackNum) {
//   return api.get(`/track/${trackNum}`).then(({ data }) => {
//     return data;
//   });
// }
export function searchTrack(artist, trackName) {
  return api
    .get(`/search?q=artist:"${artist}" track:"${trackName}"`)
    .then(({ data }) => {
      return data;
    });
}
