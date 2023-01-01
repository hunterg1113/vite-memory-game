# Memory Matching Game
This is a simple memory matching game built with React. The game board is a grid of cards, each with a unique number on one side and a blank backside. The player clicks on two cards to flip them over, and if the numbers on the cards match, they remain flipped. If the numbers do not match, the cards are flipped back over after a short delay. The goal of the game is to find all the matching pairs as quickly as possible.

## Getting Started
To run the game locally, clone the repository and run the following commands in the root directory:

```
npm install
npm run dev
```
This will install the necessary dependencies and start the development server. The game can then be accessed at http://localhost:5173/.

## Customizing the Game
The number of rows and columns in the game can be customized by modifying the generateGrid function. The grid size is currently set to 3 rows and 4 columns, but this can be changed by modifying the arguments passed to the generateGrid function in the App component.
