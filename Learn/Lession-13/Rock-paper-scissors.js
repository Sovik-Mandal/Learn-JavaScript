

/* To localStorage.getItem() get out the value from localStroge */

let score = JSON.parse(localStorage.getItem('score')) || {
wins: 0,
losses: 0,
Ties: 0,
};

updateScoreElement();


// if (!score) {
//         score = {
//             wins: 0,
//             losses: 0,
//             Ties: 0,
//         };
// }


function playGame(playerMove) { 
  const computerMove = pickComputerMove();

  let message = `You picked ${playerMove}. Computer picked ${computerMove}`;
  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } 
    else if (computerMove === "paper") {
      result = "You loss";
    } 
    else if (computerMove === "scissors") {
      result = "You win";
    }
  } 

  else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You loss";
    }
  } 

  else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You loss";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === 'You win') {
    score.wins += 1;
  }
  else if (result === 'You loss') {
    score.losses += 1;
  }
  else if (result === 'Tie') {
    score.Ties += 1;
  }

  /* To Save A Item in Local storage 
  localStorage.setItem() is the methoed and localStorage is only store string */

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;

}

function updateScoreElement() {
document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.Ties}`;
}


function pickComputerMove() {
const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } 
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } 
  else {
    computerMove = "scissors";
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
};

function changeButtonElement() {
  const buttonElement = document.querySelector('.js-play-stop-button');

  if (buttonElement.innerHTML === 'Auto Play') {
    buttonElement.innerHTML = 'Stop Play'
  }
  else {
    buttonElement.innerHTML = 'Auto Play'
  }
}