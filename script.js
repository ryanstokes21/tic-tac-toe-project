const gameBoard = (() => {
  const board = ['','','','','','','','',''];
  
  return { board };
})();

const winningCombos = (() => {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return { combos };
})();

function createPlayer(playerName, marker) {
  return { playerName, marker };
}
const player1 = createPlayer('rob', 'x');
const player2 = createPlayer('bill', 'o');

function makeMove() {
  let currentPlayer = player1;
  
  function checkWinner(board, player) {
    let winner = null
    winningCombos.combos.forEach(combo => {
      const [a, b, c] = combo;
      if(board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = player;
      }
    });
    return winner;
  }
  return function switchTurn() {
    const playerMove = +prompt('Enter a index between 0-8');
    if(playerMove >= 0 && playerMove <= 9) {
      if(currentPlayer){
        gameBoard.board.forEach(() => {
          gameBoard.board.splice(playerMove, 1, currentPlayer.marker);
        });
        const winner = checkWinner(gameBoard.board, currentPlayer.playerName);
        console.log(winner);
      }
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      updateBoard();
    }
  }
  function updateBoard() {
    console.log(`${player1.playerName}: ${player1.marker} | ${player2.playerName}: ${player2.marker}`)
    console.log(`${gameBoard.board[0]} | ${gameBoard.board[1]} | ${gameBoard.board[2]}`);
    console.log("---------");
    console.log(`${gameBoard.board[3]} | ${gameBoard.board[4]} | ${gameBoard.board[5]}`);
    console.log("---------");
    console.log(`${gameBoard.board[6]} | ${gameBoard.board[7]} | ${gameBoard.board[8]}`);
  }
}

switchTurn = makeMove();
switchTurn();