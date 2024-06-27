const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

const blue = new Audio('./sounds/blue.mp3');
const green = new Audio('./sounds/green.mp3');
const red = new Audio('./sounds/red.mp3');
const yellow = new Audio('./sounds/yellow.mp3');
const wrong = new Audio('./sounds/wrong.mp3');

let firstKeyPress = true;
let level = 0;

function checkAnswer() {
    if (userClickedPattern.length === gamePattern.length) {
        let isMatch = true;
        for (let i = 0; i < userClickedPattern.length; i++) {
            if (userClickedPattern[i] !== gamePattern[i]) {
                isMatch = false;
                break;
            }
        }
        
        if (isMatch) {
            $('#debugger').text("Success! The patterns match.");
            setTimeout(nextSequence, 1000); // Call nextSequence after a short delay if the user is correct
        } else {
            $('#debugger').text("Wrong pattern.");
            playSound('wrong');
            $('body').addClass('game-over');
            setTimeout(() => {
                $('body').removeClass('game-over');
                $('#level-title').text("Game Over, Press Any Key or Tap to Restart");
            }, 200);
            startOver();
        }
    }
}

function nextSequence() {
    userClickedPattern.length = 0; // Reset user clicked pattern for new sequence
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    $('#level-title').text('Level ' + level);
    level += 1;
    setTimeout(() => {
        $('button').removeClass('pressed');
    }, 250);
}

function playSound(currentColor) {
    switch (currentColor) {
        case 'red':
            red.play();
            break;
        case 'blue':
            blue.play();
            break;
        case 'green':
            green.play();
            break;
        case 'yellow':
            yellow.play();
            break;
        case 'wrong':
            wrong.play();
            break;
        default:
            break;
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    firstKeyPress = true;
    $('#level-title').text("Press A Key or Tap to Start");
}

$('button').click(function() {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    setTimeout(() => {
        $('button').removeClass('pressed');
    }, 250);
    if (userClickedPattern.length === gamePattern.length) {
        checkAnswer();
    }
});

$(document).keydown(function(event) {
    if (firstKeyPress) {
        firstKeyPress = false;
        nextSequence();
    }
});

$(document).on('touchstart', function(event) {
    if (firstKeyPress) {
        firstKeyPress = false;
        nextSequence();
    }
});

$('#console-log').click(function() {
    nextSequence();
});

// Debugging statements to check the state
console.log("Script loaded");
$(document).keydown(function(event) {
    console.log("Key pressed:", event.key);
    if (firstKeyPress) {
        console.log("First key press detected");
        firstKeyPress = false;
        nextSequence();
        console.log("Game pattern:", gamePattern);
    }
});

$(document).on('touchstart', function(event) {
    console.log("Screen tapped");
    if (firstKeyPress) {
        console.log("First tap detected");
        firstKeyPress = false;
        nextSequence();
        console.log("Game pattern:", gamePattern);
    }
});
