const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];
  
  const render = () => {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = '';
    board.forEach((cellValue, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = cellValue;
      cell.setAttribute('data-index', index);
      boardContainer.appendChild(cell);
    });
  }

  const update = (index, marker) => {
    board[index] = marker;
    render();
  };

  const getBoard = () => board;

  const reset = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    render();
  };

  return { update, getBoard, reset };
})();

function createPlayer(playerName, marker) {
  return { playerName, marker };
}

const game = (() => {
  let player1, player2;
  let currentPlayer;
  let gameOver = false;
  
  const start = () => {
    player1 = createPlayer(document.getElementById('p1-name').value || 'P1', 'X');
    player2 = createPlayer(document.getElementById('p2-name').value || 'P2', 'O');
    currentPlayer = player1;
    gameOver = false;
    gameBoard.reset();
  }

  const switchTurn = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1; 
  }

  const checkWinner = () => {
    const combos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
    ];
    
    const board = gameBoard.getBoard();
    
    for (let combo of combos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O'
      }
    }
    return board.includes('') ? null : 'tie';
  }

  const clickHandle = () => {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('reset').addEventListener('click', start);

    const boardContainer = document.getElementById('board-container');
    boardContainer.addEventListener('click', (e) => {
      if (gameOver || !e.target.classList.contains('cell')) return;
      
      const index = e.target.getAttribute('data-index');
      if (gameBoard.getBoard()[index] !== '') return; // Cell occupied

      gameBoard.update(index, currentPlayer.marker);
      
      const winner = checkWinner();
      if (winner) {
        gameOver = true;
        alert((winner === 'tie') ? "It's a Tie!" : `${winner} wins!`);
      } else {
        switchTurn();
      }
    });
  }
  return { clickHandle }
})();

game.clickHandle();