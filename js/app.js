

let moves = 0;
const stars = 3;
const startTime = 0;
const endingTime = 0;
var flippedCards = [];

/*
 * Create a list that holds all of your cards
 */
const cards = document.body.firstChild.nextElementSibling.childNodes[5].getElementsByTagName('i');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// All cards start flipped over
function begin() {
	for (const card of cards) {
		card.parentNode.className = 'card';
	}	
}

begin();

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

const deck = document.body.firstChild.nextElementSibling.childNodes[5];

deck.addEventListener('click', function() {
	flipOverCard();
	checkCards();
	moves++;
	console.log(event.target);
})

function flipOverCard() {
	if (event.target.tagName == 'LI' && event.target.className != 'card match') { // nothing happens if user clicks the icon instead of the card
		event.target.className = 'card open show';
		flippedCards.push(event.target.childNodes[1]);
	}
}

function checkCards() {
	if (flippedCards.length >= 2 && flippedCards.length % 2 == 0) { // doesn't start working until there are at least 2 cards and only attempts matching on pairs
		if (flippedCards[flippedCards.length-1].className === flippedCards[flippedCards.length-2].className) {
			flippedCards[flippedCards.length-1].parentElement.className = 'card match';
			flippedCards[flippedCards.length-2].parentElement.className = 'card match';
		} else {
			flippedCards[flippedCards.length-1].parentElement.className = 'card mismatch';
			flippedCards[flippedCards.length-2].parentElement.className = 'card mismatch';
			setTimeout(function(){ flipMismatch(); }, 1000);				
		}
	} 
	if (flippedCards.length == 16) {
		// stop timer
		// popup module with congrats and play again button
		// get star rating
		// get number of moves/clicks
		//setTimeout(function(){ alert('Congratulations!'); }, 3000);
		alert('Congratulations!');
	}
}

function flipMismatch() {
	flippedCards[flippedCards.length-1].parentElement.className = 'card';
	flippedCards[flippedCards.length-2].parentElement.className = 'card';	
	flippedCards.pop();
	flippedCards.pop();	
}

function starRating() {
	
}

//restart
document.getElementsByClassName('restart').addEventListener('click', function() {
	begin();
})