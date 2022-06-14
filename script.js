// A) Selecting elements, so we defined them once at the top of our file instead of having to select the same elements over and over again
const player0El = document.querySelector('.player--0'); // select the player0
const player1El = document.querySelector('.player--1'); // select the player1

const score0El = document.querySelector('#score--0'); //select the element(id) where the score 0 is stored.
const score1El = document.getElementById('score--1'); //select the element (id) where the score 1 is stored.

const current0El = document.getElementById('current--0'); // select the current score
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

//select the all btns
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// b)Starting conditions
let scores, currentScore, activePlayer, playing; // we need to declare these variables outside of the function, otherwise they are not accessible. we declare them without any value. and in the function we reassign their value.

// creating a function -don't repeat yourself principle.
// we want this function to be executed whenever we load the page for the very first time and also when the btnNew is slicked.

const init = function () {
  scores = [0, 0]; // we store the scores of both players in an array... so the final scores that start with 0 points. [player0, player1]
  currentScore = 0; //
  activePlayer = 0; // if the current player is player 0 it will hold 0..and if the current player is player 1 it will hold 1. SO since we start with the first player we set it to 0.
  playing = true; // store the state of the game! (If the game is playing then we can click on buttons and if the game is finished we can no longer click on the buttons)

  // set the initial conditions of score elements. we use textContent and then we set it to zero. We are specifying numbers, not strings but Js will then automaticallly convert them to strings to actually display them on the page.
  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); // after your select the elemnet....create a hidden class(in css) and then add that hidden class.

  //we do not know which player won the game so we have to remove the class on both the player elements
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // player0 should be the active player in the beginning so there is no need of removing it. but we need to remove from the player1
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); // we need this scores to be 0 at the biginning so we need to have this code outside of any function to be executed. So we need to run the function

//creating a function -don't repeat yourself principle. we call the function in both places (if dice is 1 and if player hold the score)  // thsi function does not need any arhument at all(), or any parameter beacuse the code is exactly the same in both situations.all we want is to repeat this code and so we don't need any parameters and we don't need to return anyting.
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // before the switch we need to change the current score of the actovePlayer back to 0.
  currentScore = 0; // we need to set the current score to 0.
  activePlayer = activePlayer === 0 ? 1 : 0; // if the activePlayer is 0 then we want the new activePlayer to be 1 and else it should be 0

  //what toggle will do is that it will add the class if it is not there and if it is there, it will remove it.
  // SO toggling both at the same time will ensure that it's only ever on one of the ements at once. SWITCHING THE BACKGROUND
  player0El.classList.toggle('player--active'); //
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1; // create a simply dice variable for the number itself. this variable needs to be a global variable not a outside variable. because each time we roll the dice, we want to generate a new number.

    // 2. Display dice
    diceEl.classList.remove('hidden'); // first thing that we need to do is to actually remove the hidden class.

    diceEl.src = `dice-${dice}.png`; // and now according to the dice nr we want to display the image dice. we use a template literal and then we write dice- because thats the common name in all of the image names. and then we use the "dice" number. So we can dynamicallly load one of these six imagiges here, depinding on the random rolled dice.

    // 3. Check for rolled 1
    if (dice !== 1) {
      //    4. Add dice to current score
      currentScore += dice; // after we save the current score(not in the function because then each time we roll a dice, the current score would be reset it) so..currentScore is equal to current score plus the dice.

      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; // we select the element dynamically. so when it's active player 0 we will then end up with current--o,..and if it's 1, we will wnd up with current-1. and then we set the result to currentScore
    } else {
      // 5.Switch to next player
      switchPlayer(); // call the function
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore; // scores at position activePlayer will be equal that score plus the currentScore. So when its player1 then this will be score1, but when player0 then it will be scores0.  ex:scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // we need to display that score

    // 2. Check if player's score is >= 30. when we finished the game, we want to assign a player winner class (in css:player-winner which has the background color)
    if (scores[activePlayer] >= 30) {
      // Finish the game
      playing = false; // set the playing to finish
      diceEl.classList.add('hidden'); // add back the hidden

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // sellect the activePlayer, take the classList and add this class name(player--winner)
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // and also we want to remove the player--active class because otherwise we will have the player--active class at the same time as the player--winner class
    } else {
      // Switch to the next player
      switchPlayer(); // call the function
    }
  }
});

// resetting the game. when we click on the button "new game" we remove the winner class and set all the scores of all the players back to zero
btnNew.addEventListener('click', init);
// when you click on the button JS will call the init function