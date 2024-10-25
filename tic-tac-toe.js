// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select all div elements inside the game board
    let boardSquares = document.querySelectorAll("#board div");
    
    // Loop through each div and add the class "square"
    boardSquares.forEach(function(square) {
        square.classList.add("square");
    });

    let currentPlayer = "X"; // Start with player "X"
    let gameState = Array(9).fill(null); // To track the game state

    // Add event listeners to all squares
    boardSquares.forEach(function(square, index) {
        square.addEventListener("click", function() {
            // If the square is already occupied, do nothing
            if (gameState[index] !== null) {
                return;
            }

            // Set the clicked square with current player's mark
            gameState[index] = currentPlayer;
            square.textContent = currentPlayer; // Or you can use innerHTML
            square.classList.add(currentPlayer); // Add class "X" or "O"

            // Toggle to the other player
            currentPlayer = (currentPlayer === "X") ? "O" : "X";
        });
    });
});


