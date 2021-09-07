import { useState } from 'react';
import './App.css';

const NUMBER_OF_CELLS = 9;
let initialBoard = Array(NUMBER_OF_CELLS).fill(null);
const boardWinners = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];

function App() {
  let [isPlayerOne, setPlayerOne] = useState(true);
  let [number, setNumber] = useState(0);
  let [winner, isWinner] = useState(false);
  let [board, setBoard] = useState(initialBoard);

  const isOver = () => number === NUMBER_OF_CELLS || winner;

  const Result = ({ winner }) => !winner ? null : (<p className={`winner ${isPlayerOne ? 'blue' : 'red'}`}>WINNER</p>);

  const Cell = ({ index }) => {
    let aClass = '';
    if (board[index]) {
      aClass = (board[index] === 'O') ? 'blueCircle' : 'redCircle';
    }
    const handleClick = () => {
      if (!board[index]) {
        const newBoard = [...board];
        newBoard[index] = isPlayerOne ? 'X' : 'O';
        setBoard(newBoard);
        const aWinner = Winner(newBoard);
        isWinner(aWinner);
        setPlayerOne(!isPlayerOne);
        setNumber(number + 1);
      }
      return;
    }
    return (
      <button className='cell' onClick={() => handleClick()} disabled={isOver()}>
        {board[index] && <div className={aClass}></div>}
      </button>)
  };

  const Winner = (newBoard) => {
    const cell = isPlayerOne ? 'X' : 'O';
    return boardWinners.some(boardWinner =>
    ((newBoard[boardWinner[0]] === cell) &&
      (newBoard[boardWinner[1]] === cell) &&
      (newBoard[boardWinner[2]] === cell))
    )
  };


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
