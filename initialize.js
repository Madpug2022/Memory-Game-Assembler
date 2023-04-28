//! Selectors
//Form
const playerName = document.querySelector("#playerName");
//Input
const playerNameInput = document.querySelector("#playerNameInput");
//Buttons
const beginBtn = document.querySelector("#beginBtn");
const normalMode = document.querySelector("#normalMode");
const hardModeBtn = document.querySelector("#hardMode");
const startBtn = document.querySelector("#startBtn");
const gameModeBtns = document.querySelector("#gameModeBtns");
const tryAgain = document.querySelector("#tryAgain");
//DIVs
const scoreboard = document.querySelector("#scoreboard");
const boardCards = document.querySelector("#boardCards");
// Spans
const timeTook = document.querySelector("#timeTook");
//Sections
const mainPage = document.querySelector(".game-start");
const gameBoard = document.querySelector(".board");
const endGameBoard = document.querySelector(".end-game");
//! Utils Variables
//Variable for the images
let shuffledCards = [];
let pickedCards = [];
let flipedCards = 0;
let timer = 0;
let playerNumber = 0;
let cardsRemaining = 16;
let playerPoints = 0;
//Variable for scoreboard


//! Functions
function selectDificulty(){
    startBtn.classList.toggle("hidden");
    gameModeBtns.classList.toggle("hidden");
};
function gameStart(){
    mainPage.classList.toggle("hidden");
    gameBoard.classList.toggle("hidden");
}
function shuffle() {
    const cards = ["card-0", "card-1", "card-2", "card-3", "card-4", "card-5", "card-6", "card-7", "card-8", "card-9", "card-10"];
    while (shuffledCards.length < 8) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const card = cards[randomIndex];
        if (!shuffledCards.includes(card)) {
        shuffledCards.push(card);
            cards.splice(randomIndex, 1);
        }
        }
    shuffledCards = shuffledCards.concat(shuffledCards);
    for(let i = 0; i < shuffledCards.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] =[shuffledCards[j], shuffledCards[i]]
}
};
function createPlayerDiv(){
    playerNumber++;
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';


    const playerName = document.createElement('p');
    playerName.className = 'player-name';
    playerName.textContent = localStorage.getItem('playerName');
    playerDiv.appendChild(playerName);

    const playerTime = document.createElement('p');
    playerTime.className = 'player-time';
    playerTime.setAttribute("data-time", playerNumber)
    playerDiv.appendChild(playerTime);

    scoreboard.appendChild(playerDiv);
}
function fillBoard(){
    for (let i = 0; i < shuffledCards.length; i++){
        const cardContainer = document.createElement('div');
        cardContainer.setAttribute("data-front", shuffledCards[i]);
        cardContainer.className = 'card-container';

        const cardImg = document.createElement('img');
        cardImg.className = 'card';
        cardImg.src = "resources/" + shuffledCards[i] + ".jpg";
        cardContainer.appendChild(cardImg);

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.setAttribute("data", shuffledCards[i]);
        cardContainer.appendChild(cardBack);

        boardCards.appendChild(cardContainer);
    }
}
function flipCard(event){
    event.currentTarget.classList.add("flipped");
    flipedCards++;
    setTimeout(evaluateMove, 1200)
}
function storeCardSrc(event){
    const cardSrc = event.target.getAttribute('data');
    pickedCards.push(cardSrc);
}

function evaluateMove(){

    if (flipedCards == 2){
        if (pickedCards[0] === pickedCards[1]){
            const selector = `[data-front="${pickedCards[0]}"], [data-front="${pickedCards[1]}"]`;
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
            element.classList.add('opacate');
            flipedCards = 0;
            pickedCards = [];
            cardsRemaining = cardsRemaining - 1;
            evaluateFinish();
        })
}   else {
    const cardContainers = document.querySelectorAll(".card-container");
        for(let i = 0; i < cardContainers.length; i++){
            let container = cardContainers[i];
            container.classList.remove("flipped")
            flipedCards = 0;
            pickedCards = [];
        }
}
}
};
function evaluateFinish(){
    if (cardsRemaining === 0){
        let finishTime =  timer;
        const selector = `[data-time="${playerNumber}"]`;
        const playerTimer = document.querySelector(selector);
        playerTimer.innerText = "You took " + finishTime + " seconds";
        boardCards.classList.toggle("hidden");
        endGameBoard.classList.toggle("hidden");
        timeTook.innerText = finishTime;
        stopTimer();
    }
}
function startTimer(){
    const selector = `[data-time="${playerNumber}"]`;
    const playerTimer = document.querySelector(selector);
    gameInterval = setInterval(function(){
        timer++;
        playerTimer.innerText = "Your time is " + timer + " seconds";
    }, 1000)
};
function stopTimer(){
    clearInterval(gameInterval);
}
function easyMode(){
    startTimer()
    const cardContainers = document.querySelectorAll(".card-container");
        for(let i = 0; i < cardContainers.length; i++){
            let container = cardContainers[i];
            container.addEventListener("click", flipCard);
            container.addEventListener("click", storeCardSrc);
        }
    gameStart()
}
//HARD MODE
function flipCardHard(event){
    event.currentTarget.classList.add("flipped");
    flipedCards++;
    setTimeout(evaluateMoveHard, 1200)
}
function evaluateMoveHard(){

    if (flipedCards == 2){
        if (pickedCards[0] === pickedCards[1]){
            const selector = `[data-front="${pickedCards[0]}"], [data-front="${pickedCards[1]}"]`;
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
            element.classList.add('opacate');
            flipedCards = 0;
            pickedCards = [];
            cardsRemaining = cardsRemaining - 1;
            playerPoints++;
            evaluateFinishHard();
        })
}   else {
    const cardContainers = document.querySelectorAll(".card-container");
        for(let i = 0; i < cardContainers.length; i++){
            let container = cardContainers[i];
            container.classList.remove("flipped")
            flipedCards = 0;
            pickedCards = [];
        }
}
}
};
function evaluateFinishHard(){
    if (cardsRemaining === 0){
        let finishTime =  timer;
        const selector = `[data-time="${playerNumber}"]`;
        const playerTimer = document.querySelector(selector);
        playerTimer.innerText = "You took " + finishTime + " seconds";
        boardCards.classList.toggle("hidden");
        endGameBoard.classList.toggle("hidden");
        timeTook.innerText = finishTime;
        stopTimer();
    }
}
function hardMode(){

}
function tryAgainFunction(){
    location.reload();
}
//!Event listeners
//Game-Start Section
playerName.addEventListener("submit", function(event){
    event.preventDefault();
    if (playerNameInput.value.length > 5){
        localStorage.setItem("playerName", playerNameInput.value);
        selectDificulty();
        createPlayerDiv();
        fillBoard()
        }
    else {
        return
}
});
normalMode.addEventListener("click", easyMode);
tryAgain.addEventListener("click", tryAgainFunction)
//! Inicialization
window.onload = function(){
    shuffle()
}
