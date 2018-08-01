# Memory Game Project

This is a memory game consisting of 16 cards a user has to match in pairs. The game assigns a star rating based on performance, times the game, and the number of moves required to match all cards. For more detail, view the instructions below.

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

### Memory Game Logic

The game randomly shuffles the cards. A user wins once all cards have successfully been matched.

### Star Rating

The game displays a star rating (from 1 to 3) that reflects the player's performance. At the beginning of a game, it displays 3 stars. After some number of moves, it changes to a lower star rating. After a few more moves, it changes to a even lower star rating (down to 1).

### Move Counter

Game displays the current number of moves a user has made.

### Timer

When the player starts a game, a displayed timer also starts. Once the player wins the game, the timer stops.

### Restart Button

A restart button allows the player to reset the game board, the timer, moves, and the star rating.

### Congratulations Popup

When a user wins the game, a modal appears to congratulate the player and ask if he/she wants to play again. It also tells the user how much time it took to win the game, the number of moves, and what the star rating was.


## Contributing

This project was created for the FEND Udacity course. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
