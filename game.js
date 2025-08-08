var isGameOn = false;
var level = 1;
var gameSequence = [];
var idx = 0;

$("body").on("keypress", () => {
  if (!isGameOn) {
    isGameOn = true;
    startGame(level);
  }
});

function startGame(level) {
  $("h1").text("Level " + level);
  if (gameSequence.length > 0) {
    playSequence(gameSequence);
  }
  setTimeout(() => playRandomSound(), gameSequence.length * 700 + 100);
}

function playSequence(sequence) {
  for (let i = 0; i < sequence.length; i++) {
    setTimeout(() => {
      switch (sequence[i]) {
        case 1:
          playBlue();
          break;
        case 2:
          playGreen();
          break;
        case 3:
          playRed();
          break;
        case 4:
          playYellow();
          break;
        default:
          playBlue();
          break;
      }
    }, i * 700);
  }
}

function playRandomSound() {
  var randomNumber = Math.floor(Math.random() * 4 + 1);
  switch (randomNumber) {
    case 1:
      playBlue();
      gameSequence.push(1);
      break;
    case 2:
      playGreen();
      gameSequence.push(2);
      break;
    case 3:
      playRed();
      gameSequence.push(3);
      break;
    case 4:
      playYellow();
      gameSequence.push(4);
      break;
    default:
      playBlue();
      gameSequence.push(1);
      break;
  }
}

function playRed() {
  new Audio("./sounds/red.mp3").play();
  $(".btn.red").addClass("pressed");
  setTimeout(() => {
    $(".btn.red").removeClass("pressed");
  }, 600);
}

function playYellow() {
  new Audio("./sounds/yellow.mp3").play();
  $(".btn.yellow").addClass("pressed");
  setTimeout(() => {
    $(".btn.yellow").removeClass("pressed");
  }, 600);
}

function playGreen() {
  new Audio("./sounds/green.mp3").play();
  $(".btn.green").addClass("pressed");
  setTimeout(() => {
    $(".btn.green").removeClass("pressed");
  }, 600);
}

function playBlue() {
  new Audio("./sounds/blue.mp3").play();
  $(".btn.blue").addClass("pressed");
  setTimeout(() => {
    $(".btn.blue").removeClass("pressed");
  }, 600);
}

$(".btn.blue").on("click", () => {
  if (!isGameOn) {
    return;
  }
  playBlue();
  checkSequence(1);
});

$(".btn.green").on("click", () => {
  if (!isGameOn) {
    return;
  }
  playGreen();
  checkSequence(2);
});

$(".btn.red").on("click", () => {
  if (!isGameOn) {
    return;
  }
  playRed();
  checkSequence(3);
});

$(".btn.yellow").on("click", () => {
  if (!isGameOn) {
    return;
  }
  playYellow();
  checkSequence(4);
});

function checkSequence(value) {
  if (isGameOn) {
    if (gameSequence[idx] === value) {
      idx++;
      if (idx === gameSequence.length) {
        idx = 0;
        level++;
        setTimeout(() => startGame(level), 1000);
      }
    } else {
      gameOver();
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  new Audio("./sounds/wrong.mp3").play();
  $("h1").text("Game Over, Press Any Key To Restart");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 1000);
  isGameOn = false;
  resetGame();
}

function resetGame() {
  level = 1;
  gameSequence = [];
  idx = 0;
}
