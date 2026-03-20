const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const youScoreEl = document.getElementById("me");
const compScoreEl = document.getElementById("comp");
const resetBtn = document.getElementById("reset");

let yourScore = 0;
let computerScore = 0;

const options = ["rock", "paper", "scissors"];

function getComputerChoice(){
    return options[Math.floor(Math.random() * options.length)];
}

function getRoundResult(player, computer){
    if(player === computer) return "tie";

    if(
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "win";
    }
    return "lose";
}

function winnerMessage(player, computer){
    if(player === computer) return `Tie! Both chose ${player}.`;
    if(player === "rock" && computer === "scissors") return "You win! Rock beats Scissors.";
    if(player === "paper" && computer === "rock") return "You win! Paper beats Rock.";
    if(player === "scissors" && computer === "paper") return "You win! Scissors beat Paper.";
    return `Computer wins! ${computer.charAt(0).toUpperCase() + computer.slice(1)} beats ${player}.`;
}

function updateScoreboard(){
    youScoreEl.textContent = yourScore;
    compScoreEl.textContent = computerScore;
}

function playGame(choice){
    const computerChoice = getComputerChoice();
    const result = getRoundResult(choice, computerChoice);

    if(result === "win") {
        yourScore += 1;
    } else if(result === "lose") {
        computerScore += 1;
    }

    resultText.textContent = `${winnerMessage(choice, computerChoice)} (You: ${choice}, Computer: ${computerChoice})`;
    updateScoreboard();
}

choices.forEach(button => {
    button.addEventListener("click", () => {
        const playerChoice = button.getAttribute("data-choice");
        if(!playerChoice) return;
        playGame(playerChoice);
    });
});

resetBtn.addEventListener("click", () => {
    yourScore = 0;
    computerScore = 0;
    updateScoreboard();
    resultText.textContent = "Game reset. Make your move!";
});

updateScoreboard();

