/*
 * Key variables
 */

let moves = 0;
let starRating = 3;
let minutes = 0;
let seconds = 0;
let flippedCards = [];
let pairedMatches = [];

/*
 * Create a list that holds all of your cards
 */

let deck = document.querySelector('.deck');
let cards = deck.getElementsByTagName('i');

//document.querySelector('.deck').querySelectorAll('i') returns nodelist

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Grab current order of cards established in HTML
const cardArray = [];
 for (let card of cards) {
		cardArray.push(card.className);
	}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Take the shuffled order of cards and build the HTML for the cards
function buildHTML(array) {
  for (let i = 0; i < array.length; i++) {
  	deck.children[i].innerHTML = '<i class="' + array[i] + '"></i>';
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const stars = document.querySelector('.stars');
const moveContainer = document.querySelector('.moves');
const restart = document.querySelector('.restart');

// User presses restart, this function will refresh the game.
restart.addEventListener('click', function() {
	clearTimeout(time);
	begin();
})

// This function calls other functions to flip over the card, check the cards, capture and update the moves,
// and adjust stars based on performance
deck.addEventListener('click', function() {
	flipOverCard();
	updateMoves();
	starAdjustment();
})

// This function first makes sure that the LI is targeted and that it is not performed on a card that is already matched
// or turned over. It then adds the flipped cards to the flippedCards array. Flipped over cards should match the number
// of moves.
function flipOverCard() {
	// nothing happens if user clicks the icon instead of the card
	if (event.target.tagName == 'LI' && event.target.className != 'card match') {
		event.target.className = 'card open show';
		// with every qualified flip, the move is captured - not captured if they click an open matched card by accident
		moves++;
		flippedCards.push(event.target.firstElementChild);
		checkCards();
	}
}

// This function checks the cards only if two have been flipped over. It compares the class of the I tags last two cards
// in the flippedCards array to determine a match. If there is a match, a new class is assigned them to turn them green,
// and they are pushed to the pairedMatches array and the function is directed to run the cardsMatch function,
// otherwise it will run the flipMismatch function.
function checkCards() {
	if (flippedCards.length >= 2 && flippedCards.length % 2 == 0) { // doesn't start working until there are at least 2 cards and only attempts matching on pairs
		if (flippedCards[flippedCards.length-1].className === flippedCards[flippedCards.length-2].className) {
			flippedCards[flippedCards.length-1].parentElement.className = 'card match';
			flippedCards[flippedCards.length-2].parentElement.className = 'card match';
			pairedMatches.push(flippedCards[flippedCards.length-1]);
			pairedMatches.push(flippedCards[flippedCards.length-2]);
			setTimeout(function(){ cardsMatch(); }, 300);
		} else {
			flippedCards[flippedCards.length-1].parentElement.className = 'card mismatch';
			flippedCards[flippedCards.length-2].parentElement.className = 'card mismatch';
			setTimeout(function(){ flipMismatch(); }, 300);
		}
	}
}

// This function will begin once all 16 cards are matched.
function cardsMatch() {
		if (pairedMatches.length == 16) {
		clearTimeout(time); // stop timer
		// popup module with congrats and play again button, get star rating, get number of moves/clicks
		modal.style.display = 'block';
		document.querySelector('.modal-content p').innerHTML =
			`CONGRATULATIONS!<p>You won in ${moves} moves with ${starRating} stars and a time of
			${mins < 1 ? `0${mins}` : `${mins}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}!</p>`;

		// When the user clicks on the button, they can play again and the modal will disappear
		const btn = document.getElementById('playAgain');
		btn.onclick = function() {
	    modal.style.display = 'none';
	    begin();
		}
	}
}

// If the two last cards flipped over do not match, they are turned back over.
function flipMismatch() {
	flippedCards[flippedCards.length-1].parentElement.className = 'card';
	flippedCards[flippedCards.length-2].parentElement.className = 'card';
}

// This function determines how the user's performance will be rated based on their number of moves halfway through
// all matches, and at all matches.
function starAdjustment() {
	if ((moves > 18 && pairedMatches.length < 8) || (moves > 32 && pairedMatches.length < 16)) {
		stars.lastElementChild.firstElementChild.className = 'fa fa-star-o';
		starRating = 2;
	}
	if ((moves > 22 && pairedMatches.length < 8) || (moves > 36 && pairedMatches.length < 16)) {
		stars.childNodes[3].firstElementChild.className = 'fa fa-star-o';
		starRating = 1;
	}
}

// This function updates the moves in the game and doesn't start the timer until the first move.
function updateMoves() {
	moveContainer.textContent = moves;
  if (moves == 1) {
	startTimer();
	}
}

// When the user presses reset, the timer is set back to zero
function reset() {
  mins = 0;
  seconds = 0;
  document.querySelector('#mins').textContent = '00:';
  document.querySelector('#seconds').textContent = '00';
}

// Timer function modified from Simple Javascript Timer by Paul Brown at https://codepen.io/PaulBrUK1972/pen/zAbpg
function startTimer(){
  time = setTimeout(function() {
    seconds++;

    if(seconds > 59) {
    	seconds = 0;
    	mins++;
	  }

	  document.querySelector('#mins').textContent = mins + ':';
	  document.querySelector('#seconds').textContent = seconds;

    if(mins < 10) {
      document.querySelector('#mins').textContent ='0'+ mins + ':';
    } else {
			document.querySelector('#mins').textContent = mins + ':';
		}

    if(seconds < 10) {
      document.querySelector('#seconds').textContent = '0' + seconds;
    } else {
      document.querySelector('#seconds').textContent = seconds;
    }

    startTimer();
  }, 1000);
}

// Modal functionality modified from https://www.w3schools.com/howto/howto_css_modals.asp
const modal = document.getElementById('winModal'); // Get the modal that pops up once the user matches all cards
const span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal
span.onclick = function() {
  modal.style.display = 'none'; // When the user clicks on <span> (x), close the modal
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = 'none';
  }
}

// This function begins the game.
function begin() {
	for (const card of cards) {
		card.parentNode.className = 'card'; // All cards start flipped over
	}
	shuffle(cardArray); // Shuffle the cards
	buildHTML(cardArray); // Build the HTML for the cards
	moves = 0; // reset moves
	pairedMatches = []; // empty array
	flippedCards = []; // empty array
	updateMoves(); // keep track of moves
	starRating = 3; // start with 3 starts
	stars.lastElementChild.firstElementChild.className = 'fa fa-star';
	stars.childNodes[3].firstElementChild.className = 'fa fa-star';
	reset();
}

begin();