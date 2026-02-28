const gameBoard = (() => {
  const board = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
                ];
  return { board }
})();

function createPlayer(userName, marker) {
  return { userName, marker }
}


const player1 = createPlayer('rob', 'x');
const player2 = createPlayer('bill', 'o');