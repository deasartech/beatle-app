import { db } from "../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

// Async function to retrieve players points and results from firestore
export const fetchPlayerResults = async (uid) => {
  const querySnapshot = await getDocs(collection(db, `users/${uid}/scores`));
  const scoreArray = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data(), "util");
    scoreArray.push({
      date: doc.id,
      score: doc.data(),
    });
  });
  return scoreArray;
};

// Async function to retrieve all players totalPoints to serve leaderboard
export const fetchAllPlayersTotalPoints = async () => {
  const leaderboardRef = collection(db, "leaderboard");
  const data = await getDocs(leaderboardRef);
  const playersArr = [];
  data.forEach((doc) => playersArr.push(doc.data()));
  playersArr.sort((a, b) => (a.totalPoints < b.totalPoints ? 1 : -1));
  return playersArr.slice(0, 11);
};

// sum players scores and then update their totalPoints
export const addPlayerTotalPoints = async (scores, uid) => {
  let total = 0;
  scores.map((item) => {
    return (total += item.score.points);
  });
  // players doc
  if (scores && uid) {
    const playersScoreRef = doc(db, "users", `${uid}`);
    await updateDoc(playersScoreRef, {
      totalPoints: total,
    });
    return total;
  }
};
// update leaderboard with players totalPoints
export const addPointsLeaderboard = async (total, uid) => {
  // leaderboard doc
  if (total && uid) {
    const leaderboardRef = doc(db, "leaderboard", `${uid}`);
    const update = await updateDoc(leaderboardRef, {
      totalPoints: total,
    });
    return update;
  }
};
