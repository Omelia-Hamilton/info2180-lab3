// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select game elements
  const boardSquares = document.querySelectorAll("#board div");
  const statusDiv = document.getElementById('status');
  const newGameBtn = document.querySelector('button');

  const playerX = "X";
  const playerO = "O";
  let currentPlayer = playerX;
  let countX = 0;
  let countXList = [];
  let countO = 0;
  let countOList = [];
  let gameOver = false;

  // Define winning combinations
  const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Function to start a new game
  function newGame() {
      currentPlayer = playerX;
      countX = 0;
      countO = 0;
      countXList = [];
      countOList = [];
      gameOver = false;

      statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
      statusDiv.classList.remove('you-won');

      boardSquares.forEach(square => {
          square.textContent = ""; // Clear text in each square
          square.classList.remove("X", "O", "hover"); // Reset square classes
      });
  }

  // Helper function to check if arrays are equal
  function arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) return false;
      }
      return true;
  }

  // Function to check if a player has won
  function checkWin(player, playerList) {
      playerList.sort((a, b) => a - b);
      for (let win of winningCombinations) {
          let matchCount = 0;
          for (let i = 0; i < win.length; i++) {
              if (playerList.includes(win[i])) {
                  matchCount++;
              }
              if (matchCount === 3) {
                  statusDiv.textContent = `Congratulations! ${player} is the Winner!`;
                  statusDiv.classList.add('you-won');
                  gameOver = true;
                  return true;
              }
          }
      }
      return false;
  }

  // Function to update a square and check for win/tie
  function updateSquare(square, index) {
      if (gameOver || square.textContent !== "") return;

      // Update game state and UI
      if (currentPlayer === playerX) {
          countXList.push(index);
          square.textContent = playerX;
          square.classList.add("X");
          countX += 1;

          if (countX >= 3 && checkWin(playerX, countXList)) {
              return;
          }

          currentPlayer = playerO;
      } else if (currentPlayer === playerO) {
          countOList.push(index);
          square.textContent = playerO;
          square.classList.add("O");
          countO += 1;

          if (countO >= 3 && checkWin(playerO, countOList)) {
              return;
          }

          currentPlayer = playerX;
      }

  }

  // Add event listeners to squares for clicks and hover effects
  boardSquares.forEach((square, index) => {
      square.classList.add("square");

      // Handle click event to mark the square
      square.addEventListener("click", () => updateSquare(square, index));

      // Handle hover effect
      square.addEventListener("mouseover", () => {
          if (!gameOver && square.textContent === "") {
              square.classList.add("hover");
          }
      });
      square.addEventListener("mouseout", () => square.classList.remove("hover"));
  });

  // Add event listener to New Game button
  newGameBtn.addEventListener("click", newGame);

  // Initialize game on page load
  newGame();
});