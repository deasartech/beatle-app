import nlp from "compromise";

export const checkGuess = (blockA, blockB, guessA, guessB) => {
  const doc = blockA;

  const docClean = doc.replace(/[^\w\s]/gi, "").toLowerCase();
  const ans = guessA.join(" ");
  const ansClean = ans.replace(/[^\w\s]/gi, "").toLowerCase();

  const docArr = docClean.split(" ");
  const ansArr = ansClean.split(" ");
  const docArrPure = docArr.filter((element) => {
    return element !== " " && element !== "";
  });

  const docB = blockB;

  const docBClean = docB.replace(/[^\w\s]/gi, "").toLowerCase();

  const ansB = guessB.join(" ");
  const ansBClean = ansB.replace(/[^\w\s]/gi, "").toLowerCase();

  const docBArr = docBClean.split(" ");
  const ansBArr = ansBClean.split(" ");
  const docBArrPure = docBArr.filter((element) => {
    return element !== " " && element !== "";
  });

  let wordResults = [];
  for (let i = 0; i < docArrPure.length; i++) {
    let el = nlp(ansArr[i]);
    if (el.has(docArrPure[i])) {
      wordResults.push(true);
    } else {
      wordResults.push(false);
    }
  }

  for (let i = 0; i < docBArrPure.length; i++) {
    let elB = nlp(ansBArr[i]);
    if (elB.has(docBArrPure[i])) {
      wordResults.push(true);
    } else {
      wordResults.push(false);
    }
  }

  return wordResults;
};
