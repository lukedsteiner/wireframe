const STORE = [
    {
        question: `Which was the best selling 'The Cure' record?`,
        answers: ['Three Imaginary Boys', 'Pornography', 'Wish', 'Disintegration'],
        correctAnswer: 'Wish'
    },
    {
        question: `The song 'Just Like Heaven' appeared on which 'The Cure' record?`,
        answers: ['Pornography', 'Wish', 'Kiss Me, Kiss Me, Kiss Me', 'Faith'],
        correctAnswer: 'Kiss Me, Kiss Me, Kiss Me'
    },
    {
        question: `Which was the first 'The Cure' record?`,
        answers: ['Three Imaginary Boys', '4:13 Dream', 'The Head on the Door', 'The Cure'],
        correctAnswer: 'Three Imaginary Boys'
    },
    {
        question: `Who is the lead vocalist of 'The Cure?'`,
        answers: ['Robert Smith', `Roger O'Donnell`, 'Jason Coop', 'Morrissey'],
        correctAnswer: 'Robert Smith'
    },
    {
        question: `'The Cure' were inducted into the Rock and Roll Hall of Fame in the Class of ____`,
        answers: ['2018', '2019', '1999', '2004'],
        correctAnswer: '2019'
    },
    {
        question: `Which of these songs won an 'MTV Video Music Award?'`,
        answers: ['Fascination Street', `Friday I'm In Love`, 'Lullaby', 'Close To Me'],
        correctAnswer: `Friday I'm In Love`
    },
    {
        question: `Which of these songs won a 'Brit Award?'`,
        answers: [`Friday I'm In Love`, 'Lullaby', 'Fascination Street', 'Close To Me'],
        correctAnswer: 'Lullaby'
    },
    {
        question: `When did 'The Cure' form?`,
        answers: ['1976', '1979', '1969', '1974'],
        correctAnswer: '1976'
    },
    {
        question: `On which record did the song 'Lovesong' appear?`,
        answers: ['The Top', 'The Head on the Door', `Kiss Me, Kiss Me, Kiss Me`, 'Disintegration'],
        correctAnswer: 'Disintegration'
    },
    {
        question: `On which record does 'Let's Go To Bed' appear?`,
        answers: ['Wish', 'Pornography', 'It was a standalone single', 'The Top'],
        correctAnswer: 'It was a standalone single'
    }
];

let questionNumber = 0;
let score = 0;

function isCorrect() {
    $('form').submit(function(event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            selected.parent().addClass('correct');
            itWasCorrect();
        } 
        else {
            selected.parent().addClass('incorrect');
            itWasIncorrect();
        }
    });
}

function updateNumber() {
    questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
}

function updateScore() {
    score ++;
    $('.score').text(score);
}

function nextQuestion() {
    $('main').on('click', '.nextButton', function(event) {
      updateNumber();
      serveQuestion();
    });
  }

function itWasCorrect() {
    $('.quizQuestions').html(`<div class="correctAnswer"><p>Correct!</p>
    <button type=button class="nextButton">Next</button></div>`);
    updateScore();
}

function itWasIncorrect() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quizQuestions').html(`<div class="correctFeedback"><p>Incorrect,<br>
    the correct answer is <span>"${STORE[questionNumber].correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function restartQuiz() {
    $('main').on('click', '.restartButton', function (event) {
        location.reload();
        });
}

function finishQuiz() {
    if (score >= 8) {
        $('.quizQuestions').html(`<p>Congratulations! You scored ${score}0%, passing this quiz. Feel free to take it again!</p><button class="restartButton">Restart Quiz</button></div>`);}
    else {
        $('.quizQuestions').html(`<p>Unfortunately, you have scored ${score}0%, failing this quiz. Please try again!</p><button class="restartButton">Restart Quiz</button></div>`);
    }
}


function createQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form>
        <fieldset>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        finishQuiz();
        restartQuiz();
        $('.questionNumber').text(10)
      }
    }

function serveQuestion () {
    $('.quizQuestions').html(createQuestion());
    isCorrect();
}

function startQuiz() {
    $('.quizStart').on('click', '.startButton', function(event) {
      $('.quizStart').remove();
      $('.questionNumber').text(1);
      serveQuestion();  
  });
};

function makeIt() {
    startQuiz();
    createQuestion();
    isCorrect();
    nextQuestion();
}

$(makeIt);