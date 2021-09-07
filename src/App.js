import { useState } from 'react';
import './App.css';

const NUMBER_OF_CELLS = 9;
let initialBoard = Array(NUMBER_OF_CELLS).fill(null);
const boardWinners = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
const PLAYERS = { ONE: 'ONE', TWO: 'TWO' };

function App() {
  let [player, togglePlayer] = useState(PLAYERS.ONE);
  let [number, setNumber] = useState(0);
  let [winner, isWinner] = useState(null);
  let [board, setBoard] = useState(initialBoard);

  const isOver = () => number === NUMBER_OF_CELLS || winner;

  const Result = ({ winner }) => !winner ? null : (<p className={`winner ${player === PLAYERS.ONE ? 'blue' : 'red'}`}>WINNER</p>);

  const Cell = ({ index }) => {
    let aClass = '';
    if (board[index]) {
      aClass = (board[index] === PLAYERS.ONE) ? 'blueCircle' : 'redCircle';
    }
    const handleClick = () => {
      if (!board[index]) {
        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);
        if (playerWon(newBoard, player)) {
          isWinner(true);
        } else {
          togglePlayer((player === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE));
          setNumber(number + 1);
        }
      }
      return;
    }
    return (
      <button className='cell' onClick={() => handleClick()} disabled={isOver()}>
        {board[index] && <div className={aClass}></div>}
      </button>)
  };

  //Check if the player has won
  const playerWon = (newBoard, player) =>
    boardWinners.some(boardWinner => boardWinner.every(el => newBoard[el] === player)
    );


  return (
    <>
      <h1>Tic Tac Toe Game</h1>
      <div className="App">
        {board.map((_, index) =>
          <Cell index={index} />
        )}
        <Result winner={winner} />
        {isOver() && !winner && <h1>GAME OVER</h1>}
      </div>
    </>
  );
}

export default App;
