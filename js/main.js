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
    render();
}

function render(){
    // renderBoard(); // edit images in divs to represent mancala stones. 
    renderMsg();
    board.forEach(function(numStone, idx) {
        pocketEls[idx].innerHTML = numStone;
    });
}

function playerTurn(evt){
    playerHand = 0;
    let idx = pocketEls.indexOf(evt.target); // if pocket doesn't equal 0, on a click set stone amt to playerhand. If pocket is 0, don't allow a click. 
    let numStone = board[idx];
    if (numStone !== 0) {
        playerHand = numStone; 
    } else if (numStone === 0) {
        return;
    };
    board[idx]=0;
    while (playerHand > 0){
        idx+=1;
        board[idx]++; 
        playerHand--;
    }
    console.log(board);
    render();
// if the pockets are all empty, the game is over => getWinner. If any pocket has a stone, go to getTurn. 
    // if (board[idx] === 0){
    //     getWinner();
    // } else {
}
// function findIndex(idx) {{
// if (idx >= 12) {
//     return idx += 1;
// } else if (idx < 12) {
//     return idx = 0;
// }} if (player = -1) {
//     for (let i = 0; i < 13; i++ ){
//         if (i === 6){continue;}
//     }
// } else {
//     for (let i = 0; i < 13; i++ ){
//         if (i === 13){continue;}
//     }
// }}    

function renderMsg(){
    if (winner === 1) {
        msgEl.innerHTML = "Player 1 wins!";
    } else if (winner === -1) {
        msgEl.innerHTML = "Player 2 wins!";
    }
}

// if the players hand is greater than 1, drop stones in pockets, remove stone from hand
//if players hand is 0 and the last pocket is greater than 1, pick up stones and continue again;
// if player hand is 0 and last pocket is 0, then turn is over. 

    //     while (playerHand <= 1){
    //         turn *= -1;
    //     }
    //    if (playerHand > 1) { pocketEls[idx] = numStones++;
    //     playerHand[idx] = numStones--;
    //    } else if (playerHand === 0 && (pocketEls[idx]> 1))  {
    //        playerHand[idx] = board[idx];
    //    } else if (playerHand === 0 && (pocketEls[idx] <= 1)){
    //        turn *= -1;
    //    }
    // })


function getWinner() {
    if (board.every(checkPockets) === 0 && getElementByID(p6) > getElementByID(p13)) {
        return winner = -1;
    } else if (board.every(checkPockets) === 0 && getElementByID(p13) > getElementByID(p6)){
        return winner = 1;
    }
    function checkPockets(stones) {
        return stones = 0;
    }
}
