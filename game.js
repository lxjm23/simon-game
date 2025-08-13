var started = false;

var level = 0;

// chooses random color base on the random number generated
buttonColors = ["red", "blue", "green", "yellow"];

//stores the game patter
let gamePattern = [];

//stores the items the user clicked
let userInputPattern = [];

$(document).on("keypress", function () {
    if(event.keyCode === 32 || event.key === " "){
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    } 
});

// generates random number
function nextSequence() {
    userInputPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    //pushes the random color generated to the array called gamePatter
    gamePattern.push(randomChosenColor);

    //animation for the random color chosen
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //plays sound
    playSound(randomChosenColor);

    level++;

    $("#level-title").text("Level " + level);
}

//detects click
$(".btn").on("click", function () {
    userChosenColor = this.id // gets the id of the box
    //push the id og the color chosed in the array
    userInputPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userInputPattern.length - 1);
})

//detects key press
$(document).on("keypress", function(event){
    var  keyPressed = event.key.toLowerCase();
    var idMap = {
        "Q" : "green",
        "W" : "red",
        "A" : "yellow",
        "S" : "blue"
    };

    if(keyPressed in idMap){
        var buttonId = idMap[keyPressed]
        userChosenColor = buttonId
        userInputPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userInputPattern.length - 1)
    }
})


// play sound when clicked
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation when clicked
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

//checks answers
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userInputPattern[currentLevel]) {
        console.log("success");

        if (userInputPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Spacebar to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}