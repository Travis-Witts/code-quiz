var timer = $("#time");
var questionArea = $("#question");
var options = $("#answer-area");
var start = $("#start");
var questionArray = [{question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}, {question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}, {question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}, {question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}, {question:"Test", options: ["Wrong", "Wrong", "Right", "Wrong"], answer: 2}];

function newGame() {
    questionArea.append($("<h1>").text("Coding Quiz Challenge"));
    options.append($("<p>").text("Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers with penalize your score/time by ten seconds!"));
    var startBTN =  $("<button>").prop("type", "button");
    startBTN.addClass("btn btn-outline-primary")
    startBTN.text("Start Quiz")
    start.append(startBTN)
}

function question(index) {
        questionArea.empty();
        options.empty();
        start.empty();
        questionArea.append($("<h1>").text(questionArray[index].question));
        for (i = 0; i < 4; i++) {
            var ansBTN = $("<button>").text(questionArray[index].options[i])
            ansBTN.prop("type", "button")
            ansBTN.addClass("btn btn-outline-primary option")
            ansBTN.attr("id", i)
            options.append(ansBTN)
        }
}
questions()











function gameClock() {
    var sec = 60;
    timer.text(sec) ;
    var gameClock = setInterval(function() {
        sec -= 1;
        $.text(sec);
        if (sec === "0") {
            // gameover function init
        }
    }, 1000);
}