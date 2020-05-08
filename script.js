const quiz = document.getElementById("container")
const addButton = document.getElementById('add-btn')
const beginButton = document.getElementById('begin-btn')
const selection = document.getElementById('selection')

var words = [];
var word, wordList, translatedList, wrongList;


var input = document.getElementById("myInput");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    word = document.getElementById("myInput").value

    var node = document.createElement("LI")
    node.setAttribute('id', 'list')
    var textnode = document.createTextNode(word)
    node.appendChild(textnode)
    if (word === "") {
      alert("You must write a word!")
    } else {
      words.push(word)
      document.getElementById("display").appendChild(node)
      document.getElementById("myInput").value = ''
    }
    console.log(words)
  }
});

addButton.addEventListener('click', () => {
  word = document.getElementById("myInput").value

  var node = document.createElement("LI")
  node.setAttribute('id', 'list')
  var textnode = document.createTextNode(word)
  node.appendChild(textnode)
  if (word === "") {
    alert("You must write a word!")
  } else {
    words.push(word)
    document.getElementById("display").appendChild(node)
    document.getElementById("myInput").value = ''
  }
  console.log(words)
})

beginButton.addEventListener('click', () => {
    if (words.length < 4) {
      alert("You must have more than 4 words or more!")
    } else {
      selection.classList.add('hide')
      quiz.classList.remove("hide")
      wordList = words.slice();
      translatedList = wordList.slice();
      wrongList = wordList.slice(); // list of words that have yet to be correctly identified
      questions = generateQuestions(wrongList);
    }
  })

const spStartButton = document.getElementById('sp-start-btn')
const cnStartButton = document.getElementById('cn-start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
// const projectId = 'nice-tiger-255806';
// const {Translate} = require('@google-cloud/translate').v2;
// const translate = new Translate({projectId});

const language = 'ru';

var questions;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function generateAnswers(correctWord, otherWords) {
  answers = [];
  for (i = 0; i < 3; i++) {
    ind = getRandomInt(otherWords.length);
    answers.push({ text: otherWords[ind], correct: false });
    otherWords.splice(ind, 1);
  }
  answers.splice(getRandomInt(4), 0, { text: correctWord, correct: true });
  return answers;
};

function generateQuestions(wordsl) {
  var questionList = [];
  var i;
  for (i = 0; i < wordsl.length; i++) {
    w = wordsl[i];
    console.log(w)
    temp = translatedList.slice();
    temp.splice(wordList.indexOf(w), 1);
    questionList.push({
      question: w,
      answers: generateAnswers(translatedList[i], temp)
    });
  }
  return questionList;
}

let shuffledQuestions, currentQuestionIndex;

spStartButton.addEventListener('click', () => {
  startGame()
})
cnStartButton.addEventListener('click', () => {
  startGame()
})


nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  spStartButton.classList.add('hide')
  cnStartButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}