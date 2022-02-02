'use strict';

const sectEl= document.querySelector('.section--0');
const sectEl1= document.querySelector('.section--1');
const numEl= document.getElementById('number0-id');
const numEl1= document.getElementById('number1-id');
const currentScoreEl=document.getElementById('current--0');
const currentScoreEl1= document.getElementById('current--1');
const diceEl= document.querySelector('.dice-1');
const newGameEl=document.querySelector('.button1');
const rollEl=document.querySelector('.button2');
const holdEl=document.querySelector('.button3');

let score, currentScore, activePlayer, playing;

const init= function(){
    score=[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true;

  numEl.textContent=0;
  numEl1.textContent=0;
  currentScoreEl.textContent=0;
  currentScoreEl1.textContent=0;

  diceEl.classList.add('hidden');
  sectEl.classList.remove('section--winner');
  sectEl1.classList.remove('section--winner');
  sectEl.classList.add('section1--active');
   
};

init();


const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer= activePlayer===0 ? 1 :0 ;
        sectEl.classList.toggle('section1--active');
        sectEl1.classList.toggle('section1--active');
}


rollEl.addEventListener('click', function(){
    if(playing){
    diceEl.classList.remove('hidden');
    
    const value=Math.trunc(Math.random()*6)+1;

    diceEl.src=`dice-${value}.png`;

    if(value!==1){
        currentScore += value;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    }

    else{
        switchPlayer();
    }
    }
});



holdEl.addEventListener('click', function(){
    if(playing){
    // 1. Add current score to active player score
    score[activePlayer]+=currentScore;
    document.getElementById(`number${activePlayer}-id`).textContent=score[activePlayer];
    
    // 2. If active player score is >=100 then
    // finish the game.
    if(score[activePlayer]>=50){
        playing=false;
        diceEl.classList.add('hidden');
        document.querySelector(`.section--${activePlayer}`).classList.add('section--winner');
        document.querySelector(`.section--${activePlayer}`).classList.remove('section1--active');
    } 
    // Or else switch to another player.
    else{
       switchPlayer();
    }
}
    
});

newGameEl.addEventListener('click', init);