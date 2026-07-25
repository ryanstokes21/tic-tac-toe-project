const gameBoardEl = document.getElementById('game-board');
const gameEl = document.getElementById('game');
const winnerAlertEl = document.getElementById('winner-alert');
const winnerEl = document.getElementById('winner');

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start');
const startScreenBtn = document.getElementById('start-screen-btn');

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const gameBoard = (() => {
  const board = Array(9).fill('');

  const renderBoard = () => {
    gameBoardEl.textContent = '';

    board.forEach((marker, index) => {
      const cell = document.createElement('div');

      cell.classList.add('cell');
      cell.dataset.index = index;
      cell.textContent = marker;

      gameBoardEl.appendChild(cell);
    });
  };

  const getBoard = () => board;

  const resetBoard = () => {
    board.fill('');
  };

  return {
    renderBoard,
    getBoard,
    resetBoard,
  };
})();

function createPlayer(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  return {
    getName,
    getMarker,
  };
}

const gameController = (() => {
  let players;
  let currentPlayer;

  const board = gameBoard.getBoard();

  const start = () => {
    players = startGame();
    currentPlayer = players.player1;

    gameBoard.renderBoard();
  };

  const placeMarker = (index, marker) => {
    if (board[index] !== '') return false;

    board[index] = marker;
    return true;
  };

  const changeTurn = () => {
    currentPlayer =
      currentPlayer === players.player1 ? players.player2 : players.player1;
  };

  const checkWinner = () => {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        endGame(`${getPlayerName(board[a])} Wins!`);
        return true;
      }
    }

    return false;
  };

  const checkTie = () => {
    if (board.every((cell) => cell !== '')) {
      endGame('Tie!');
      return true;
    }

    return false;
  };

  const getPlayerName = (marker) => {
    return marker === 'x'
      ? players.player1.getName()
      : players.player2.getName();
  };

  const endGame = (message) => {
    gameEl.classList.add('hidden');
    winnerAlertEl.classList.remove('hidden');
    winnerEl.textContent = message;
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    if (players) {
      currentPlayer = players.player1;
    }

    gameBoard.renderBoard();
  };

  gameBoardEl.addEventListener('click', (event) => {
    const cell = event.target.closest('.cell');

    if (!cell) return;

    const index = Number(cell.dataset.index);

    if (placeMarker(index, currentPlayer.getMarker())) {
      gameBoard.renderBoard();

      if (checkWinner()) return;
      if (checkTie()) return;

      changeTurn();
    }
  });

  return {
    start,
    resetGame,
  };
})();

function startGame() {
  startScreen.classList.add('hidden');
  gameBoardEl.classList.remove('hidden');

  const player1 = createPlayer(document.getElementById('player1').value, 'x');

  const player2 = createPlayer(document.getElementById('player2').value, 'o');

  document.getElementById('player1-name').textContent =
    `${player1.getName()}: ${player1.getMarker()}`;

  document.getElementById('player2-name').textContent =
    `${player2.getName()}: ${player2.getMarker()}`;

  return {
    player1,
    player2,
  };
}

startBtn.addEventListener('click', gameController.start);

startScreenBtn.addEventListener('click', () => {
  winnerAlertEl.classList.add('hidden');
  startScreen.classList.remove('hidden');

  gameController.resetGame();
});
