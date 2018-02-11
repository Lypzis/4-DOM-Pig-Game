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
// Imports
const electron = require('electron');

const { ipcRenderer } = electron;

////////////////////////////////////////////////////////////////////////////
// Variables
var scores,
    roundScore,
    activePlayer,
    currentPlayerScore,
    gamePlaying,
    maxScore,

    diceDOM,
    diceDOM2,
    diceRow,
    diceRollSound,
    
    buttonHold,
    buttonRoll,
    buttonNew,
    buttonQuit,
    buttonOptions,
    buttonSound,
    
    soundTrack,
    sound;

////////////////////////////////////////////////////////////////////////////
// Begin the game
newGame(); 

/////////////////////////////////////////////////////////////////////////////
// Button New Event Listener
buttonNew.addEventListener('click', newGame);

/////////////////////////////////////////////////////////////////////////////
// Button Options Event Listener
buttonOptions.addEventListener('click', (event) => {
    if (gamePlaying){
        event.preventDefault();

        ipcRenderer.send('options');
    }
});

ipcRenderer.on('setOptions', function(event, scoreValue){
        maxScore = scoreValue;
});

///////////////////////////////////////////////////////////////////////////
// Button Sound Event Listener
buttonSound.addEventListener('click', function(){
    var sound = document.querySelector('#sound');

    if (sound.classList.value === 'ion-ios-volume-high' ){
        sound.classList.remove('ion-ios-volume-high');
        sound.classList.add('ion-ios-volume-low');

        sound = false;
    }else{
        sound.classList.remove('ion-ios-volume-low');
        sound.classList.add('ion-ios-volume-high');

        sound = true;
    }

    sound ? soundTrack.play() : soundTrack.pause();
});

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
        var dice2 = Math.floor((Math.random() * 6)+1);
        var total = dice + dice2;

        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';

        if ( document.querySelector('#sound').classList.value === 'ion-ios-volume-high' ){
            diceRollSound.play();
        }
         
        diceDOM.src = 'img/dice-' + dice + '.png';
        diceDOM2.src = 'img/dice-' + dice2 + '.png';
 
        currentPlayerScore = document.querySelector('#current-' + activePlayer);
        if (dice === 1 || dice2 === 1 || diceRow === 6 && diceRow === total){
            endTurn();
        } else {
            //add score
            roundScore += total;
            currentPlayerScore.textContent = roundScore;    
            diceRow = total;
        }  
        
    }
});

/////////////////////////////////////////////////////////////////////////////
// Button Hold Event Listener
buttonHold.addEventListener('click', function(){ 
    if (gamePlaying){
        scores[activePlayer] += roundScore;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= maxScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            diceDOM2.style.display = 'none';
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
    maxScore = 100;
    gamePlaying = true,
    sound = true;
    
    diceDOM = document.querySelector('.dice');
    diceDOM2 = document.querySelector('.secondDice');
    diceRollSound = document.querySelector('#diceSound');
    soundTrack = document.querySelector('#soundTrack');

    buttonRoll = document.querySelector('.btn-roll');
    buttonHold = document.querySelector('.btn-hold');
    buttonNew = document.querySelector('.btn-new');
    buttonSound = document.querySelector('.btn-sound');
    buttonOptions = document.querySelector('.btn-options');
    buttonQuit = document.querySelector('.btn-quit');

    diceDOM.style.display = 'none';
    diceDOM2.style.display = 'none';

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
    diceRow = 0;
    currentPlayerScore.textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentPlayerScore = document.querySelector('#current-' + activePlayer);

    //next player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');  

    diceDOM.style.display = 'none';
    diceDOM2.style.display = 'none';

}

