/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/////////////////////////////////
/* Lessons Here:
-How to create our fundamental game variables;
-How to generate a random number;
-How to manipulate the DOM;
-How to read from the DOM;
-How to change CSS styles;
*/
/////////////////////////////////

////////////////////////////////////////////////////////////////////////////
// Import of Electron
const electron = require('electron');
const { ipcRenderer } = electron;

////////////////////////////////////////////////////////////////////////////
// Variables
var scores,
    roundScore,
    activePlayer,
    currentPlayerScore,
    gamePlaying,

    diceDOM,
    diceRow,
    
    buttonHold,
    buttonRoll,
    buttonNew,
    buttonQuit,
    buttonOptions;
    //buttonSave

////////////////////////////////////////////////////////////////////////////
// Begin the game
newGame(); 

/////////////////////////////////////////////////////////////////////////////
// Button New Event Listener
buttonNew.addEventListener('click', newGame);

/////////////////////////////////////////////////////////////////////////////
// Button Options Event Listener
buttonOptions.addEventListener('click', (event) => {
    event.preventDefault();

    ipcRenderer.send('options');
});

/////////////////////////////////////////////////////////////////////////////
// Button Save Event Listener
/*buttonSave.addEventListener('submit', (event) => {
    event.preventDefault();

    alert('I submitted');

    ipcRenderer.send('hahahahhah'); //for now !!!!
}); */

////////////////////////////////////////////////////////////////////////////
// Button Quit Event Listener
buttonQuit.addEventListener('click', (event) => {
    event.preventDefault();

    ipcRenderer.send('quit');
});

/////////////////////////////////////////////////////////////////////////////
// Button Roll Event Listener
buttonRoll.addEventListener('click', function(){
    if(gamePlaying) {
        var dice = Math.floor((Math.random() * 6)+1);

        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';

        currentPlayerScore = document.querySelector('#current-' + activePlayer);
        if (dice === 1 || diceRow === 6 && diceRow === dice){
            endTurn();
        } else {
            //add score
            roundScore += dice;
            currentPlayerScore.textContent = roundScore;    
            diceRow = dice;  
        }    
    }
});

/////////////////////////////////////////////////////////////////////////////
// Button Hold Event Listener
buttonHold.addEventListener('click', function(){ 
    if (gamePlaying){
        scores[activePlayer] += roundScore;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            endTurn();
        }
    }
});

////////////////////////////////////////////////////////////////////////////
// New Game Starter
function newGame(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceRow = 0;
    gamePlaying = true;

    diceDOM = document.querySelector('.dice');
    buttonRoll = document.querySelector('.btn-roll');
    buttonHold = document.querySelector('.btn-hold');
    buttonNew = document.querySelector('.btn-new');
    buttonOptions = document.querySelector('.btn-options');
    buttonQuit = document.querySelector('.btn-quit');
    /*buttonSave = document.querySelector('.btn-save'); */

    diceDOM.style.display = 'none';

    for (var i = 0; i < 2; ++i){
        document.getElementById('score-'+i).textContent = scores[i];
        document.getElementById('current-'+i).textContent = 0;
        document.getElementById('name-'+i).textContent = 'Player '+(i+1);
        document.querySelector('.player-'+i+'-panel').classList.remove('winner');
        document.querySelector('.player-'+i+'-panel').classList.remove('active');
    }

    document.querySelector('.player-0-panel').classList.add('active'); 
}

//////////////////////////////////////////////////////////////////////////
// End of the Turn
function endTurn(){
    roundScore = 0;
    currentPlayerScore.textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentPlayerScore = document.querySelector('#current-' + activePlayer);

    //next player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');  

    diceDOM.style.display = 'none';
}

