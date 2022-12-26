'use strict';

// -----------------Selecting elements----------------
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



//----------------Reusable Functions-------------------
const switchPlayer = function (){
    //switch to the next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer===0 ? 1 : 0;  
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active'); 
    currentScore = 0;
}

const endGame = function(){
    playing = false;
    diceEl.classList.add('hidden');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
}

// init variablaes:
let scores , currentScore , activePlayer , playing;
const init = function(){
     scores = [0,0];
     currentScore = 0;
     activePlayer = 0; //  0 -> Player one , 1 ->  Player two
     playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    diceEl.classList.add('hidden');
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
}

// ------------------Initial all values-------------------
init();

//---------------Rolling dice funciotnality--------------

btnRoll.addEventListener('click', function(){
        //1. Generate random dice roll
        const diceNumber =  Math.trunc(Math.random()*6+1);
    
        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${diceNumber}.png`; 
    
        //3. Check for if the dice number is 1 , 
        if(diceNumber !== 1){
            currentScore += diceNumber; 
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    
        }else{
            //switch to the next player
            switchPlayer();
        }




});


//---------------- Holding Functionality -----------------
btnHold.addEventListener('click', function() {

        // Add the score to the player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        //if the score is >= 100 ,finish the game
        if(scores[activePlayer] >= 100){
            endGame(); // To end the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            //Switch to the other player
            switchPlayer();
        }
});

//---------------Reset Functionaliy-------------------------
btnNew.addEventListener('click',init);