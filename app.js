/* VARIABLES */
const typeWriterContainer = document.querySelector(".typewriterContainer");
const words = [
  "Hello, my name is Omar",
  "I am a software developer",
  "I love creating project",
  "Geek in my spare time",
];

let currentIndex = 0;

/* LOGIC */
const createLetter = (l) => {
  const letterDOM = document.createElement("span");
  l.trim() === ""
    ? (letterDOM.innerHTML = "&nbsp;")
    : (letterDOM.innerHTML = l);
  letterDOM.className = "letter";
  typeWriterContainer.appendChild(letterDOM);
};

const delay = async (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const appendSentenceLetters = async (currentSentence) => {
  const splitSentence = currentSentence.split("");

  for (let i = 0; i < splitSentence.length; i++) {
    const currentLetter = splitSentence[i];
    await delay(150).then(() => createLetter(currentLetter));
  }
};

const removeSentenceLetters = async () => {
  const lettersDOM = document.querySelectorAll(".letter");

  for (let i = lettersDOM.length - 1; i >= 0; i--) {
    const currentLetterDOM = lettersDOM[i];
    await delay(10).then(() => currentLetterDOM.remove());
  }
};

const checkCurrentIndex = () => {
  currentIndex === words.length - 1 ? (currentIndex = 0) : (currentIndex += 1);
};

const startTyping = async () => {
  const sentence = words[currentIndex];
  await appendSentenceLetters(sentence)
    .then(async () => await delay(1000))
    .then(() => removeSentenceLetters())
    .then(() => checkCurrentIndex())
    .then(() => {
      return startTyping(currentIndex);
    });
};

startTyping();
