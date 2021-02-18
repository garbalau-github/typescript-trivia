"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// Questions
var questions = [
    {
        id: 1,
        text: 'What is the full birth name of Boy George?',
        answer: 'George Alana O\'Dowd',
        wrongAnswers: ['George Phillips', 'Johnny Cash', 'Bill Freud'],
    },
    {
        id: 2,
        text: 'According to legend, which plant screams when the root is dug us?',
        answer: 'Mandrake',
        wrongAnswers: ['Daisy', 'Potato', 'Jasmine']
    },
    {
        id: 3,
        text: 'What fruit appears on the first screen in the original "Pac-Man" game?',
        answer: 'Cherry',
        wrongAnswers: ['Apple', 'Kiwi', 'Banana']
    }
];
// Elements inside HTML (Possibly Null)
var scoreEl = document.getElementById('score');
var answersSelectEl = document.getElementById('answersSelect');
var questionTextEl = document.getElementById('questionText');
var submitButtonEl = document.getElementById('submitButton');
var startButtonEl = document.getElementById('startButton');
// Question trackers
var index = 0;
var correct = 0;
// Check if elements exist (No need in optional chaning)
if (scoreEl &&
    answersSelectEl &&
    questionTextEl &&
    submitButtonEl &&
    startButtonEl) {
    var scrambleAnswers_1 = function (answers) {
        return answers.sort(function () { return Math.random() - 0.5; });
    };
    var getNextQuestion_1 = function () {
        return questions[index++];
    };
    var displayQuestion_1 = function (q) {
        questionTextEl.innerText = q.text;
        answersSelectEl.innerHTML = '';
        var answers = scrambleAnswers_1(__spreadArrays(q.wrongAnswers, [q.answer]));
        answers.forEach(function (answer) {
            var newAnswer = document.createElement('option');
            newAnswer.value = answer;
            newAnswer.innerText = answer;
            answersSelectEl.appendChild(newAnswer);
        });
    };
    var showScore_1 = function () {
        var score = Math.floor((correct / questions.length) * 100);
        answersSelectEl.style.display = 'none';
        submitButtonEl.style.display = 'none';
        questionTextEl.style.display = 'none';
        scoreEl.style.display = 'block';
        scoreEl.innerText = "Your Score: " + score + "%";
    };
    submitButtonEl.addEventListener('click', function () {
        if (questions[index - 1].answer === answersSelectEl.value) {
            correct++;
        }
        if (index < questions.length) {
            // If we are on the last question
            displayQuestion_1(getNextQuestion_1());
        }
        else {
            showScore_1();
        }
    });
    startButtonEl.addEventListener('click', function () {
        // Init
        startButtonEl.style.display = 'none';
        submitButtonEl.style.display = 'block';
        questionTextEl.style.display = 'block';
        answersSelectEl.style.display = 'block';
        displayQuestion_1(getNextQuestion_1());
    });
}
