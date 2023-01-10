function Quiz(question) {
    this.score = 0;
    this.question = question;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.question[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {

    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.question.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

let question = [
    new Question("Java Script supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which Language used to styling web pages", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a Java SCript frameWork", ["Python Scrpt", "XHTML", "CSS", "HTML"], "Django"),
    new Question("Which is used to connect to Database", ["PHP", "HTML", "JS", "ALL"], "PHP"),
    new Question("Java Script is a", ["Language", "Programming Language", "Development", "All"], "Programming Language"),
];



function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;

        //show options
        var choices = quiz.getQuestionByIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            var choice = document.getElementById("choice" + i);
            choice.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function handleOptionButton(id, choice) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

function showScores() {
    var gameOverHtml = "<h1>Results</h1>";
    gameOverHtml += "<h2 id='score'> Your Scores:  " + quiz.score + "  And Percentage is: " + (quiz.score / question.length * 100) + "%" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.question.length;
}

var quiz = new Quiz(question);
loadQuestions();