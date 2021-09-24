/*----- constants -----*/
let scores; //player scores end the end. Based on #of stones in their store at end of game. 
let stones; // game stones, always 48 of them.

/*----- app's state (variables) -----*/
let board; //single array starting in bottom right up to top right
let turn; //1 or -1, based on getTurn to know when the next turn starts
let winner; //winner is whoever has more stones at the end of the game(when no stones are left in pockets)
let playerHand; // when the player picks up stones from a pocket this will fill;


/*----- cached element references -----*/
const pocketEls = Array.from([...document.querySelectorAll('#board > div')]);
const btnEls= document.querySelector('button');
const msgEl = document.querySelector('h1');


/*----- event listeners -----*/


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
  renderBoard();
  renderMsg();
}
