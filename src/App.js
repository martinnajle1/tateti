import { useState } from 'react';
import './App.css';
const CELLS = 9;

let initBoard = [null, null, null, null, null, null, null, null, null];

function App() {
  let [isPlayerOne, setPlayerOne] = useState(true);
  let [number, setNumber] = useState(0);
  let [winner, isWinner] = useState(false);
  let [board, setBoard] = useState(initBoard);
  const boardWinners = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
  const isOver = () => number === CELLS || winner;



  const Winner = (newBoard) => {
    const cell = isPlayerOne ? 'X' : 'O';
    return boardWinners.some(boardWinner => {
      return ((newBoard[boardWinner[0]] === cell) &&
        (newBoard[boardWinner[1]] === cell) &&
        (newBoard[boardWinner[2]] === cell));
    })
  };
  return (
    <>
      <h1>Tic Tac Toe Game</h1>
      <div className="App">
        {board.map((item, index) => {
          const newLine = index % 3 === 2;
          let aClass = '';
          if (board[index]) {
            aClass = (board[index] === 'O') ? 'blueCircle' : 'redCircle';
          }
          return <div className='board' onClick={() => {
            if (!isOver() && (!board[index])) {
              const newBoard = [...board];
              newBoard[index] = isPlayerOne ? 'X' : 'O';
              setBoard(newBoard);
              const aWinner = Winner(newBoard);
              isWinner(aWinner);
              setPlayerOne(!isPlayerOne);
              setNumber(number + 1);
            }
            return;
          }}> {board[index] && <div className={aClass}></div>}</div>
        })}
        {winner && <p className={`winner ${isPlayerOne ? 'blue' : 'red'}`}>WINNER</p>}
        {isOver() && !winner && <h1>GAME OVER</h1>}
      </div>
    </>
  );
}

export default App;
