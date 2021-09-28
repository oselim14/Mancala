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


/*----- cached element references -----*/
const pocketEls = Array.from(document.querySelectorAll('#board > div'));
const btnEl= document.querySelector('button');
const msgEl = document.querySelector('h1'); 

/*----- event listeners -----*/
btnEl.addEventListener('click', init);
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
    let idx = pocketEls.indexOf(evt.target); // if pocket doesn't equal 0, on a click set stone amt to playerhand. If pocket is 0, don't allow a click. 
    let numStone = board[idx]; 
    while (turn === 1 && (idx === 7 || idx === 8 || idx === 9 || idx === 10 || idx === 11 || idx === 12)) return;
    while (turn === -1 && (idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === 4 || idx === 5)) return;
    if (idx === 6 || idx === 13 || numStone === 0) return;
    board[idx] = 0;
    while (numStone > 1){
        idx = findIndex(idx);
        board[idx]++; 
        numStone--;
    }
    // while (numStone = 1) {
    //     idx = findIndex(idx);
    //     board[idx]++;
    //     numStone = board[idx];
    // }
    console.log(board);
    render();
    turn *= -1;
// if the pockets are all empty, the game is over => getWinner. If any pocket has a stone, go to getTurn. 
    if (document.querySelectorAll('#board > pocket') === 0){
        getWinner();
    } else if (numStone === 0) { 
        turn *= -1;
    }
}

function findIndex(idx) {
    idx += 1;
    idx = idx % 14;
    while (turn === 1 && idx === 6) {
        (idx += 1);
        continue;
    }
    while (turn === -1 && idx === 13) {
        (idx = 0);
        continue;
    }
    return idx;
}    

function renderMsg(){
    if (winner === 1) {
        msgEl.innerHTML = "Player 1 wins!";
    } else if (winner === -1) {
        msgEl.innerHTML = "Player 2 wins!";
    }
}


function getWinner() {
    if (board.every(checkPockets) === 0 && getElementByID(p6) > getElementByID(p13)) {
        return winner = -1;
    } else if (board.every(checkPockets) === 0 && getElementByID(p13) > getElementByID(p6)){
        return winner = 1;
    }
    function checkPockets(stones) {
        return stones = 0;
    }
    renderMsg();
}
