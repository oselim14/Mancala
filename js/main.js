/*----- constants -----*/
const players = {
    '-1': 'Computer',
    '1': 'Player',
};
const pocketAcross = {
    '0': 12,
    '1': 11,
    '2': 10,
    '3': 9,
    '4': 8,
    '5': 7,
    '7': 5,
    '8': 4,
    '9': 3,
    '10': 2,
    '11': 1,
    '12': 0,
};


/*----- app's state (variables) -----*/
let board; //single array starting in bottom right up to top right
let turn; //1 or -1, based on getTurn to know when the next turn starts
let winner; //winner is whoever has more stones at the end of the game(when no stones are left in pockets)



/*----- cached element references -----*/
const pocketEls = Array.from(document.querySelectorAll('#board > div'));
const btnEl= document.getElementById('replay');
const btnCompEl= document.getElementById('computer');
const msgEl = document.querySelector('h1'); 

/*----- event listeners -----*/
btnEl.addEventListener('click', init);
btnCompEl.addEventListener('click', computerPlays);
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
    btnCompEl.style.visibility = turn === -1 ? 'visible' : 'hidden';
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
    if (board[idx] === 1 && isIdxInTurn(idx)){
        const mancalaIdx = turn === -1 ? 13 : 6;
        board[mancalaIdx] += 1 + board[pocketAcross[idx]];
        board[idx] = 0;
        board[pocketAcross[idx]] = 0;
        console.log('capture1');
    }
    getTurn(idx);
    getWinner();
    render();
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
    } else if ((board[0] === 0 && board[1] === 0 && board[3] === 0 && board[4] === 0 && board[5] === 0)|| (board[7] === 0 && board[8] === 0 && board[9] === 0 && board[10] === 0 && board[11] === 0 && board[12]=== 0) && (board[6] > board[13])){
        turn *= -1;
    } else {turn *= -1};
}

// function capture(idx) {
//     if (turn = 1){
//         console.log('capture');
//         board[6].value = board[6].value + board[idx];
//         return;
//     }
// }

function renderMsg(){
    if (winner === 't'){
        msgEl.innerHTML = `It's a tie!`;
        msgEl.style.color = `black`;
    } else if (winner) {
        msgEl.innerHTML = `${players[winner]} Wins!`;
        msgEl.style.color = `black`;
        msgEl.style.fontSize = '35px';
    } else {
        msgEl.innerHTML = `${players[turn]}'s Turn!`;
        msgEl.style.color = `#6B705C`;
        msgEl.style.fontSize = '26px';
    }
}

function getWinner() {
    if (board[6] > 24) {
        return winner = 1;
    } else if (board[13] > 24){
        return winner = -1;
    } else if ((board[0] === 0 && board[1] === 0 && board[3] === 0 && board[4] === 0 && board[5] === 0)|| (board[7] === 0 && board[8] === 0 && board[9] === 0 && board[10] === 0 && board[11] === 0 && board[12]=== 0) && (board[6] === board[13])){
        return winner = 't';
    } else return;
}

function computerPlays() {
    let randomIdx;
    while (!board[randomIdx]) {
        randomIdx = Math.floor(Math.random() * 6) + 7;
    }
    pocketEls[randomIdx].click();
}
