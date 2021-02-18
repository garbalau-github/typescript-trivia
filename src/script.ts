// Custom Type
type Question = {
    id: number;
    text: string;
    answer: string;
    wrongAnswers: Array<string>;
}

// Questions
const questions: Question[] = [
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
]

// Elements inside HTML (Possibly Null)
const scoreEl = document.getElementById('score');
const answersSelectEl = document.getElementById('answersSelect');
const questionTextEl = document.getElementById('questionText');
const submitButtonEl = document.getElementById('submitButton');
const startButtonEl = document.getElementById('startButton');

// Question trackers
let index = 0;
let correct = 0;

// Check if elements exist (No need in optional chaning)
if (
    scoreEl && 
    answersSelectEl && 
    questionTextEl && 
    submitButtonEl && 
    startButtonEl
) {

    const scrambleAnswers = (answers: Array<string>): Array<string> => {
        return answers.sort(() => Math.random() - 0.5);
    }

    const getNextQuestion = (): Question => {
        return questions[index++];
    }

    const displayQuestion = (q: Question): void => {
        questionTextEl.innerText = q.text;
        answersSelectEl.innerHTML = '';

        const answers = scrambleAnswers([...q.wrongAnswers, q.answer]);

        answers.forEach(answer => {
            const newAnswer = document.createElement('option');
            newAnswer.value = answer;
            newAnswer.innerText = answer;
            answersSelectEl.appendChild(newAnswer);
        });
    };

    const showScore = () => {
        const score = Math.floor((correct / questions.length) * 100);

        answersSelectEl.style.display = 'none';
        submitButtonEl.style.display = 'none';
        questionTextEl.style.display = 'none';
        scoreEl.style.display = 'block';
        scoreEl.innerText = `Your Score: ${score}%`;
    }

    submitButtonEl.addEventListener('click', () => {
        if (questions[index - 1].answer === (<HTMLSelectElement>answersSelectEl).value) {
            correct++;
        }

        if (index < questions.length) {
            // If we are on the last question
            displayQuestion(getNextQuestion());
        } else {
            showScore();
        }
    });

    startButtonEl.addEventListener('click', () => {
        // Init
        startButtonEl.style.display = 'none';
        submitButtonEl.style.display = 'block';
        questionTextEl.style.display = 'block';
        answersSelectEl.style.display = 'block';
    
        displayQuestion(getNextQuestion());
    });
}