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
    if (turn === 1 && (idx === 7 || idx === 8 || idx === 9 || idx === 10 || idx === 11 || idx === 12)) return;   // if (turn === -1 && (idx === 7 || idx === 8 || idx === 9 || idx === 10 || idx === 11 || idx === 12)) return;
    if (turn === -1 && (idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === 4 || idx === 5)) return;
    if (idx === 6 || idx === 13 || numStone === 0) return;
    board[idx] = 0;
    while (numStone >= 1){
        idx = findIndex(idx);
        board[idx]++; 
        numStone--;
    }
    getTurn(idx);
    render();
    getWinner(idx);

}

function findIndex(idx) {
    idx += 1;
    idx = idx % 14;
    while (turn === -1 && idx === 6) {
        (idx += 1);
        continue;
    }
    while (turn === 1 && idx === 13) {
        (idx = 0);
        continue;
    }
    return idx;
}    

function getTurn(idx) {
    if ((turn === -1 && idx === 13) || (turn === 1 && idx === 6)){
        turn *= 1;
    } else {turn *= -1};
}

function renderMsg(){
    if (winner) {
        msgEl.innerHTML = `${players[winner]} Wins!`;
    } else {
        msgEl.innerHTML = `${players[turn]}'s Turn!`;
    }
}


function getWinner(idx) {
    if ((idx[0] === 0 && idx[1] === 0 && idx[2] === 0 && idx[3] === 0 && idx[4] === 0 && idx[5] === 0) || (idx[7] === 0 && idx[8] === 0 && idx[9] === 0 && idx[10] === 0 && idx[11] === 0 && idx[12] === 0) && getElementByID(p6) > getElementByID(p13)) {
        return winner = -1;
    } else if ((idx[0] === 0 && idx[1] === 0 && idx[2] === 0 && idx[3] === 0 && idx[4] === 0 && idx[5] === 0) || (idx[7] === 0 && idx[8] === 0 && idx[9] === 0 && idx[10] === 0 && idx[11] === 0 && idx[12] === 0) && getElementByID(p13) > getElementByID(p6)){
        return winner = 1;
    }
    renderMsg();
}
