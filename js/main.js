/*----- constants -----*/
let scores; //player scores end the end. Based on #of stones in their store at end of game. 
let stones; // game stones, always 48 of them.
let players = {
    '-1': 'Player 2',
    '1': 'Player 1',
};


/*----- app's state (variables) -----*/
let board; //single array starting in bottom right up to top right
let turn; //1 or -1, based on getTurn to know when the next turn starts
let winner; //winner is whoever has more stones at the end of the game(when no stones are left in pockets)
let playerHand; // when the player picks up stones from a pocket this will fill;


/*----- cached element references -----*/
const pocketEls = Array.from(document.querySelectorAll('#board > div'));
const btnEl= document.querySelector('button');
const msgEl = document.querySelector('h1'); 

/*----- event listeners -----*/
btnEL = addEventListener('click', init);
document.getElementById('board').addEventListener('click', playerTurn);
/*----- functions -----*/
// intialize the game
init();

//initialize all state var then call render;
function init() {
  //board for the game when starting
    board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]; //each game starts with 4 in each pocket;
    winner = null;
    turn= 1; //player one starts, bottom of screen
    playerHand = 0;
    render();
}

function render(){
    // renderBoard(); // edit images in divs to represent mancala stones. 
    renderMsg();
    board.forEach(function(numStones, idx) {
        pocketEls[idx].innerHTML = numStones;
    });
}

function playerTurn(evt){
    
    let idx = pocketEls.indexOf(evt, target);
    if (idx !== null) {
        playerHand === board[idx];
        console.log(playerHand);
    }

    // playerHand = pocketEls[idx];
    // turn = getTurn();
    // winner = getWinner();
    
}


function renderMsg(){
    if (winner === 1) {
        msgEl.innerHTML = "Player 1 has won!";
    } else {
        msgEl.innerHTML = "Player 2 has won!";
    }
}

function getWinner() {
    if (pockets === 0 && p6 > p13) {
        return winner = -1;
    } else if (pockets === 0 && p13 > p6){
        return winner = 1;
    }
}