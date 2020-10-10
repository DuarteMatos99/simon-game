// global variables
const btnClasses = ["first", "second", "third", "fourth"];
let gameRunning = false;
let computerSequence = [];
let userSequence = [];
let count = 0;

// When pressed Enter the game starts or resets
$(document).keypress(function (event) {
    if (event.key === "Enter" && gameRunning === false) {
        computerSequence = [];
        gameRunning = true;
        $("body").css("background-color", "#19d3da");
        restartLevel();
    }
});

// When a button is pressed will validate
$(".btn").click(function (event) {
    const userClick = event.target.innerText;
    $(this).addClass("pressed");
    setTimeout(function () {
        $(".btn").removeClass("pressed");
    }, 200);
    playSound(userClick);
    checkAnswer(userClick);
});

function restartLevel() {
    userSequence = [];
    count = 0;
    generateSequence();
}

function gameOver() {
    count = null;
    gameRunning = false;
    new Audio("sounds/wrong.mp3").play();
    $("body").css("background-color", "red");
    $("h1").text("Game Over, Press Enter to Start");
}

function btnAnimation(btn, opacity1, opacity2) {
    $(btn).animate({ opacity: opacity1 }, 300);
    $(btn).animate({ opacity: opacity2 }, 300);
}

function generateSequence() {
    const randomNumber = (Math.floor(Math.random() * 4) + 1).toString();
    computerSequence.push(randomNumber);
    setTimeout(function () {
        playSound(randomNumber);
        btnAnimation(`div.${btnClasses[randomNumber - 1]}`, 0.1, 1);
    }, 500);
    $("h1").text(`Level ${computerSequence.length}`);
}

function checkAnswer(userChoise) {
    if (userChoise === computerSequence[count] && count !== null) {
        userSequence.push(userChoise);
        count += 1;
        if (userSequence.length === computerSequence.length) {
            restartLevel();
        }
    } else {
        gameOver();
    }
}

function playSound(btn) {
    switch (btn) {
        case "1":
            new Audio("sounds/first.mp3").play();
            break;
        case "2":
            new Audio("sounds/second.mp3").play();
            break;
        case "3":
            new Audio("sounds/third.mp3").play();
            break;
        case "4":
            new Audio("sounds/fourth.mp3").play();
            break;
        default:
            console.log("error");
    }
}
