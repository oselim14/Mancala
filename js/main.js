/*----- constants -----*/
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
        pocketEls[idx].style.backgroundColor = isIdxInTurn(idx) ? '#fce0cd' : '#DDBEA9';
    });
}

function isIdxInTurn(idx) {
    if (turn === -1 && [7,8,9,10,11,12].includes(idx)) return true; 
    if (turn === 1 && [0,1,2,3,4,5].includes(idx)) return true; 
    return false;
}


function playerTurn(evt){
    let idx = pocketEls.indexOf(evt.target); // if pocket doesn't equal 0, on a click set stone amt to playerhand. If pocket is 0, don't allow a click. 
    let numStone = board[idx]; 
    if (turn === 1 && (idx === 7 || idx === 8 || idx === 9 || idx === 10 || idx === 11 || idx === 12)) return;   // if (turn === -1 && (idx === 7 || idx === 8 || idx === 9 || idx === 10 || idx === 11 || idx === 12)) return;
    if (turn === -1 && (idx === 0 || idx === 1 || idx === 2 || idx === 3 || idx === 4 || idx === 5)) return;
    if (idx === 6 || idx === 13 || numStone === 0) return;
    board[idx] = 0;
    while (numStone >= 1){
        idx = getNextIdx(idx);
        board[idx]++; 
        numStone--;
    }
    getTurn(idx);
    render();
    getWinner();
    renderMsg();
    console.log(winner);
}

function getNextIdx(idx) {
    idx += 1;
    idx = idx % 14;
    if (turn === -1 && idx === 6) return idx + 1;
    if (turn === 1 && idx === 13) return 0;   
    return idx;
}    

function getTurn(idx) {
    if ((turn === -1 && idx === 13) || (turn === 1 && idx === 6)){
        turn *= 1;
    } else if ([0,1,2,3,4,5] === 0 || [7,8,9,10,11,12] === 0){
        turn *= -1;
    } else {turn *= -1};
}

function renderMsg(){
    if (winner === 't'){
        msgEl.innerHTML = `It's a tie!`;
    } else if (winner) {
        msgEl.innerHTML = `${players[winner]} Wins!`;
    } else {
        msgEl.innerHTML = `${players[turn]}'s Turn!`;
    }
}


function getWinner() {
    if ([0,1,2,3,4,5] === 0 || [7,8,9,10,11,12] === 0 && ([6] > [13])) {
        return winner = 1;
    } else if ([0,1,2,3,4,5] === 0 || [7,8,9,10,11,12] === 0 && ([13] > [6])){
        return winner = -1;
    } else if ([0,1,2,3,4,5] === 0 || [7,8,9,10,11,12] === 0 && ([13] === [6])){
        return winner === 't';
    } else return;
    // if ((board[0,1,2,3,4,5] === 0 || board[7,8,9,10,11,12] === 0) && (board[13] > board[6])){
    //     return winner = -1;
    // } else if ((board[0,1,2,3,4,5]=== 0 || board[7,8,9,10,11,12] === 0) && (board[6] > board[13])){
    //     return winner = 1;
    // }
}
