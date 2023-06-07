class Game {
  constructor(playerScore, computerScore) {
    this.playerScore = playerScore;
    this.computerScore = computerScore;
    this.clear();
  }

  
  clear(){
    this.status = '-';
    this.computerScore = 0;
    this.playerScore = 0;
  }

  play(move) {
    const allMoves = ["rock", "paper", "scissor"];
    let index = Math.floor(Math.random() * 3);
    let computerMove = allMoves[index];

    if ((move === 'scissor' && computerMove === 'paper') || (move === 'paper' && computerMove === 'rock') || (move === 'rock' && computerMove === 'scissor')) {
        this.status = 'win'
        this.playerScore++;
    }
    else if(move === computerMove){
        this.status = 'draw';
  
    }else{
        this.status = 'lose';
        this.computerScore++;
    }
    this.updateDisplay(move, computerMove);

  }

  sound(){
    let winSound = new Audio('./Media/victory.mp3');
    let loseSound = new Audio('./Media/lose.mp3');
    const drawSound = new Audio('./Media/draw.wav');
    if(this.status === 'win'){
      winSound.play();
    }else if(this.status === 'lose'){
      loseSound.play();
    }else{
      drawSound.play();
    }
  }

  updateStatus(){
    gameStatus.innerText = this.status;
  }

  updateDisplay(playerMove, computerMove) {
    if(this.status !== '-'){
    userOutput.innerText = playerMove;
    computerOutput.innerText = computerMove;
    }
    playerScoreBoard.innerText = this.playerScore;
    computerScoreBoard.innerText = this.computerScore;

    this.updateStatus();
    if(this.status !== '-'){
    this.sound();
    };

    setTimeout((function(){
        userOutput.innerText = '-';
        computerOutput.innerText = '-';
        this.status = '-';
        gameStatus.innerText = '-';
    }), 2000);
  }
}


const rps = new Game();

const playerMoves = document.querySelectorAll(".player-move");
const userOutput = document.querySelector(".user-output");
const computerOutput = document.querySelector(".computer-output");
const playerScoreBoard = document.querySelector(".player-score");
const computerScoreBoard = document.querySelector(".computer-score");
const gameStatus = document.querySelector('.status');
const clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', () => {
  rps.clear();
  rps.updateDisplay();
})

playerMoves.forEach((move) => {
  move.addEventListener("click", (e) => {
    let userMove = e.target;
    let id = userMove.id;
    rps.play(id);
  });
});
