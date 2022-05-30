// const [results, setResults] = useState([]);

// // answer
// const [answer, setAnswer] = useState("");
// const [result, setResult] = useState(null);
// const [message, setMessage] = useState("");

// function init() {
//   const sentence = "This is the lyrics the player must guess";
//   const sentenceArray = sentence.split(" ");

//   let answerArray = []; // answerArray stores the answer board (starting with all _ and gradually filled in)
//   for (let i = 0; i < sentenceArray.length; i++) {
//     answerArray[i] = "_" * sentenceArray[i].length;
//   }
//   document.getElementById("answer").innerHTML = answerArray.join(" ");
//   document.getElementById("message").innerHTML =
//     "Type a word then press guess, or press quit to stop playing.";
// }
// init();

// ///////

// const handleSubmit = () => {
//   if (!answer) {
//     console.log("empty");
//     alert("Hello! your answer is empty!!");
//     return;
//   }

//   const doc = lyrics;
//   console.log(doc, "doc");
//   const docClean = doc.replace(/[^\w\s]/gi, "").toLowerCase();
//   console.log(docClean, "clean");
//   const ans = answer;
//   const ansClean = ans.replace(/[^\w\s]/gi, "").toLowerCase();
//   // ans.contractions().expand().all().text();

//   const docArr = docClean.split(" ");
//   const ansArr = ansClean.split(" ");
//   const docArrPure = docArr.filter((element) => {
//     return element !== " " && element !== "";
//   });

//   console.log(docArrPure, "docArr");
//   console.log(ansArr, "ansArr");

//   let wordResults = [];
//   for (let i = 0; i < docArrPure.length; i++) {
//     let el = nlp(ansArr[i]);
//     if (el.has(docArrPure[i])) {
//       wordResults.push(true);
//     } else {
//       wordResults.push(false);
//     }
//   }
//   console.log(wordResults, "result");

//   if (!wordResults.includes(false)) {
//     setResult("Correct");
//     if (results.length < 3) {
//       winSound.play();
//       setResults([...results, "Correct"]);
//     }
//   } else if (wordResults.includes(false) && results.length < 2) {
//     setResult("try again");
//     setTimeout(() => {
//       setTimePassed(false);
//       setResult("");
//       setAnswer("");
//       setPlay(false);
//     }, 3000);
//     overSound.play();

//     setResults([...results, "X"]);
//   } else {
//     setResult("Oh no..");
//     setMessage("The answer was: \n\n" + lyrics);
//     setResults([...results, "X"]);
//     overSound.play();
//   }
// };
