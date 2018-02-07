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

var scores,
    roundScore,
    activePlayer,
    diceDOM;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.getElementById('score-0').textContent = scores[0];
document.getElementById('score-1').textContent = scores[1];
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

diceDOM = document.querySelector('.dice');
diceDOM.style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){
    //1. Random Number;
    var dice = Math.floor((Math.random() * 6)+1);

    //2. Display the result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score IF the rolled number was not 1
    var currentPlayerScore = document.querySelector('#current-' + activePlayer);
    if (dice !== 1){
        //add score
        roundScore += dice;
        currentPlayerScore.textContent = roundScore;
    } else {
        endTurn(currentPlayerScore);
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //1. get the current player score and add to global score
    scores[activePlayer] += roundScore;

    //2. add current score to the active player score
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //3. check if player won the game else it is next player 
    endTurn(currentPlayerScore);
});

function endTurn(currentPlayerScore){
    roundScore = 0;
    currentPlayerScore.textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //next player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');  

    diceDOM.style.display = 'none';
}