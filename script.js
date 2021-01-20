// Defining global Variables ***
var timer = $("#time");
var questionArea = $("#question");
var options = $("#answer-area");
var start = $("#start");
var questionArray = [{ question: "Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2 }, { question: "Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2 }, { question: "Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2 }, { question: "Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2 }, { question: "Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2 }];
var currentScore = 0
var finished = false
var hiscores = JSON.parse(localStorage.getItem("highScoresObj")) || []
var index = 0
var cAnswer = 0
var countDown = 60
var userScore = 0
// Functions ***
// This newgame function is run when the webpage is opened and whenever a new game is started
function newGame() {
    questionArea.empty();
    options.empty();
    start.empty();
    finished = false
    countDown = 60
    index = 0
    questionArea.append($("<h1>").text("Coding Quiz Challenge"));
    options.append($("<p>").text("Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers with penalize your score/time by ten seconds!"));
    var startBTN = $("<button>").prop("type", "button");
    startBTN.addClass("btn btn-outline-primary start-button")
    startBTN.text("Start Quiz")
    start.append(startBTN)
}
// This function destroys the old question and then creates new divs for the question and options, it has a conditional if theres no more questions left it calls the gameover function
function questions() {
    questionArea.empty();
    options.empty();
    if (index < 5) {
        questionArea.append($("<h1>").text(questionArray[index].question));
        for (i = 0; i < 4; i++) {
            var ansBTN = $("<button>").text(questionArray[index].options[i])
            ansBTN.prop("type", "button")
            ansBTN.addClass("btn btn-outline-primary ansBTN")
            ansBTN.attr("id", i)
            options.append(ansBTN)
        }
        cAnswer = questionArray[index].answer
    }
    else {
        gameOver()
    }
}
// This function is used for the scoring and can make the time lower if the user guesses incorrectly
function reward(guess) {
    var counter = 2
    var rightWrong = $("<div>").addClass("container-fluid")
    rightWrong.css("border-top", "5px solid darkgrey")
    rightWrong.css("color", "darkgrey")
    start.append(rightWrong)
    if (cAnswer == guess) {
        rightWrong.text("Correct!")
        index += 1
        questions()
    }
    else {
        rightWrong.text("Incorrect!")
        countDown -= 10
        timer.text(countDown)
        index += 1
        questions()
    }
    counter = 1
    var rewardTimer = setInterval(function () {
        counter -= 1
        if (counter === 0) {
            start.empty()
            clearInterval(rewardTimer);
        }
    }, 1000)
}
// Function name is self explanitory it counts down for 60 changing the timer text() and checks if it has reached 0 or another finishing condition is met
function gameClock() {
    timer.text(countDown);
    var gameClock = setInterval(function () {
        countDown -= 1;
        timer.text(countDown);
        if (countDown === 0) {
            currentScore = 0
            clearInterval(gameClock)
        }
        else if (finished) {
            clearInterval(gameClock)
            currentScore = countDown
        }
    }, 1000);
}
// Creates a new screen for when the game is finished that allows the user to type their name in and submit it to highscores
function gameOver() {
    finished = true
    questionArea.empty();
    options.empty();
    start.empty();
    questionArea.append($("<h1>").text("Quiz Over!"))
    options.append($("<p>").text("You scored: " + timer.text() + " Please input your name:"))
    userScore = timer.text()
    var userInput = $("<textarea>").addClass("user-input")
    options.append(userInput)
    var submitBTN = $("<button>").prop("type", "button");
    submitBTN.addClass("btn btn-outline-primary submit-button")
    submitBTN.text("Submit")
    options.append(submitBTN)
}
// Displays the highscores in a list from highest to lowest
function highScores() {
    questionArea.empty();
    options.empty();
    start.empty();
    hiscores = JSON.parse(localStorage.getItem("highScoresObj"))
    questionArea.append($("<h1>").text("High Scores"))
    options.append($("<ol>").addClass("list-group"))
    for (i = 0; i < hiscores.length; i++) {
        var indexNum = i + 1
        var newListItem = $("<li>").addClass("row list-item")
        var numInList = $("<h5>").addClass("col-md-5")
        numInList.text(indexNum)
        var userName = $("<p>").addClass("col-md-5")
        userName.text(hiscores[i].name)
        var score = $("<p>").addClass("col-md-2")
        score.text("Score: " + hiscores[i].scored)
        newListItem.append(numInList).append(userName).append(score)
        $(".list-group").append(newListItem)
        console.log(hiscores[i].scored)
    }
}

// Starting main function ***
newGame()

// listeners ***
// This is the listener for the start button in order to start the clock and the quiz this must be pushed
$(document).on("click", ".start-button", function (event) {
    event.preventDefault()
    index = 0
    questionArea.empty();
    options.empty();
    start.empty();
    gameClock()
    questions(index)
})
// This is the listener for any answer button that supports the logic and tells the script what was chosen.
$(document).on("click", ".ansBTN", function (event) {
    event.preventDefault()
    var guess = $(this).attr("id")
    reward(guess)
});
// This listener takes the user's input and score and add them to the high scores object when pressed, it also sorts the objects inside the array from highest to lowest and caps the amount of scores at 10
$(document).on("click", ".submit-button", function (event) {
    event.preventDefault()
    var user = $(".user-input").val()
    var userObj = { name: user, scored: userScore }
    console.log(userObj)
    hiscores.push(userObj)
    hiscores.sort((a, b) => b.scored - a.scored);
    hiscores.splice(10)
    console.log(hiscores)
    localStorage.setItem("highScoresObj", JSON.stringify(hiscores))
    highScores()
})
// This allows the user to cycle between the main game screen and the highscores page
$(document).on("click", ".hsBTN", function (event) {
    event.preventDefault()
    if ($(this).attr("id") === "game") {
        $(this).attr("id", "scores")
        highScores()
        finished = true
        $(this).text("< Play Again")
    }
    else {
        $(this).attr("id", "game")
        newGame()
        $(this).text("View High Scores")
    }
})