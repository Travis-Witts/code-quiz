var timer = $("#time");
var questionArea = $("#question");
var options = $("#answer-area");
var start = $("#start");
var questionArray = [{question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}, {question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}, {question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}, {question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}, {question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}];
var currentScore = 0
var finished = false
var hiscores = [1 , 2, 3, 4]


function newGame() {
    finished = false
    timer.text("60")
    questionArea.append($("<h1>").text("Coding Quiz Challenge"));
    options.append($("<p>").text("Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers with penalize your score/time by ten seconds!"));
    var startBTN =  $("<button>").prop("type", "button");
    startBTN.addClass("btn btn-outline-primary start-button")
    startBTN.text("Start Quiz")
    start.append(startBTN)
}

function questions(index) {
    questionArea.empty();
    options.empty();
    questionArea.append($("<h1>").text(questionArray[index].question));
    for (i = 0; i < 4; i++) {
        var ansBTN = $("<button>").text(questionArray[index].options[i])
        ansBTN.prop("type", "button")
        ansBTN.addClass("btn btn-outline-primary option")
        ansBTN.attr("id", i)
        options.append(ansBTN)
    }
}
// questions(1)

function reward(cAnswer, guess) {
    var counter = 2
    var rightWrong = $("<div>").addClass("container-fluid")
    rightWrong.css("border-top", "5px solid lightgrey")
    rightWrong.css("color", "lightgrey")
    start.append(rightWrong)
    if (cAnswer == guess) {
        rightWrong.text("Correct!")
    }
    else {
        rightWrong.text("Incorrect!")
        var decrement = timer.text()
        decrement -= 10
        timer.text(decrement)
    }
    counter = 1
    var rewardTimer = setInterval(function() {
        counter -= 1
        if (counter === 0) {
            start.empty()
            clearInterval(rewardTimer);
        }
    }, 1000)
}
function gameClock() {
    var sec = $("#time").text()
    timer.text(sec) ;
    var gameClock = setInterval(function() {
        sec -= 1;
        timer.text(sec);
        if (sec === 0) {
            currentScore = 0
            clearInterval(gameClock)
        }
        else if (finished) {
            clearInterval(gameClock)
            currentScore = sec
        }
    }, 1000);
}
function gameOver() {
    questionArea.empty();
    options.empty();
    start.empty();
    questionArea.append($("<h1>").text("Quiz Over!"))
    options.append($("<p>").text("You scored: " + timer.text() + " Please input your name:"))
    var userInput = $("<textarea>").addClass("user-input")
    options.append(userInput)
    var submitBTN =  $("<button>").prop("type", "button");
    submitBTN.addClass("btn btn-outline-primary submit-button")
    submitBTN.text("Submit")
    start.append(submitBTN)
}
// gameOver(10)
function highScores(newScore) {
    questionArea.empty();
    options.empty();
    start.empty();
    questionArea.append($("<h1>").text("High Scores"))
    options.append($("<ol>").addClass("list-group")) 
    for (i = 0; i < hiscores.length; i++) {
        var newListItem = $("<li>").addClass("row list-item")
        var numInList = $("<h5>").addClass("col-md-5")
        numInList.text("1")
        var userName = $("<p>").addClass("col-md-5")
        userName.text("test")
        var userScore = $("<p>").addClass("col-md-2")
        userScore.text("Score: " + "10")
        newListItem.append(numInList).append(userName).append(userScore)
        $(".list-group").append(newListItem)
    }
}

// Testing
newGame()

// listeners
$(".start-button").on("click", function(event) {
    event.preventDefault()
    index = 0
    questionArea.empty();
    options.empty();
    start.empty();
    gameClock()
    questions(index)
})

$("#0, #1, #2, #3").on("click", function(event) {
    event.preventDefault()
    console.log(this)
})