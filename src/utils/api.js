import axios from "axios";

const api = axios.create({
  baseURL: "https://api.deezer.com",
});

export function fetchTrack(trackNum) {
  return api.get(`/track/${trackNum}`).then(({ data }) => {
    return data;
  });
}
