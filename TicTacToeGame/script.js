const board = Array(9).fill(null);
let currentPlayer = 'X';
const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function renderBoard() {
  gameBoard.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => makeMove(index));
    gameBoard.appendChild(cellElement);
  });
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function makeMove(index) {
  if (board[index] || checkWinner()) return;
  board[index] = currentPlayer;
  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
  } else if (board.every(cell => cell)) {
    statusDisplay.textContent = 'It\'s a Draw!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
  }
  renderBoard();
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

restartButton.addEventListener('click', () => {
  board.fill(null);
  currentPlayer = 'X';
  renderBoard();
});

renderBoard();
