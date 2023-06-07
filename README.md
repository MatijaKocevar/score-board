# Live Football World Cup Scoreboard

This project is a Live Football World Cup Scoreboard application that displays ongoing matches and their scores.

## Features

- Start a new game with initial score 0-0.
- Update the score of a game.
- Finish a game in progress.
- Get a summary of ongoing games ordered by their total score.
- If some of the input values are blank, the application will not create/update the game.

## Technologies Used

- React
- TypeScript
- Vite
- Sass
- Jest

## Getting Started

### Prerequisites

- Node.js (16+)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MatijaKocevar/score-board.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Usage

1. Start the development server:

   ```bash
   npm start
   ```

   This will start the development server and open the application in your default browser.

### Build

To build the project for production, run the following command:

```bash
npm run build
```

The optimized production build will be available in the `dist` directory.

## Running Tests with Jest

Jest is the testing framework used in this project. It provides a simple and powerful way to write and execute tests.

### Prerequisites

Before running the tests, make sure you have installed all the project dependencies by following the Installation section mentioned earlier.

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

Jest will automatically search for files with .test.js or .spec.js extensions in the src directory and execute them.
