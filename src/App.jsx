import { useState, useRef} from 'react';
import './App.css';
import cross from './assets/cross.png';
import circle from './assets/circle.png';

function App() {
  // Board Array to store values in the boxes
  const [board, setBoard] = useState(Array(9).fill(null));
  // Winner state to check and specify the winner of the game
  const [winner, SetWinner] = useState({lock: false, isWinner: ""});
  // To check the next value to be entered
  const [count, setCount] = useState(0);

  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  // This array is used to reset the game 
  let box_arr = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  function handleClick(e, i) {
    if(winner.lock){
      // If winner then this function will not be executed
      return 0;
    }
    else if(count%2===0){
      e.target.innerHTML = `<img src='${cross}'>`;
      board[i] = 'X';
      setCount(count+1);
    } else {
      e.target.innerHTML = `<img src='${circle}'>`;
      board[i] = 'O';
      setCount(count+1);
    }
    // After every new value is created the checkWinner is called 
    checkWinner();
    setTimeout( func => {
    if(winner.lock != true && winner.isWinner == "") checkFull();
    }, 10000);
  }

  const checkWinner = () => {
    // This else-if ladder is used to check the winner as per the rules of Tic-Tac-Toe
    // If found, the lock is set to true
    if(board[0]===board[1] && board[1]===board[2] && board[2]!== null){
      won(board[2]);
    }
    else if(board[3]===board[4] && board[4]===board[5] && board[5]!== null){
      won(board[5]);
    }
    else if(board[6]===board[7] && board[7]===board[8] && board[8]!== null){
      won(board[5]);
    }
    else if(board[0]===board[4] && board[4]===board[8] && board[8]!== null){
      won(board[8]);
    }
    else if(board[2]===board[4] && board[4]===board[6] && board[6]!== null){
      won(board[6]);
    }
    else if(board[0]===board[3] && board[3]===board[6] && board[6]!== null){
      won(board[6]);
    }
    else if(board[1]===board[4] && board[4]===board[7] && board[7]!== null){
      won(board[7]);
    }
    else if(board[2]===board[5] && board[5]===board[8] && board[8]!== null){
      won(board[8]);
    }
  }

  const won = (isWinner) => {
    SetWinner((winner) => {
      return {...winner, lock: true, isWinner: isWinner};
    })
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    SetWinner((winner) => {
      return {...winner, lock: false, isWinner: ""};
    });
    // The map function below is used to remove all the images in buttons
    box_arr.map((e) => {
      e.current.innerHTML = "";
    })
  }

  function checkFull() {
    let count=0;
    board.map((box) => {
      if(box != null){
        count++;
      }
    })
    if(count == 9) handleReset();
  }

  return (
  <div className='container'>
    <h1 className='winner'>Tic Tac Toe Game in <span>React</span></h1>
    {winner.lock && <h1 className='winner'>Winner: <span>{winner.isWinner}</span></h1>}
    <div className='board'>
      <div className='board-row'>
        <button value={board[0]} ref={box1} onClick={(e) => {handleClick(e, 0)}}></button>
        <button value={board[1]} ref={box2} onClick={(e) => {handleClick(e, 1)}}></button>
        <button value={board[2]} ref={box3} onClick={(e) => {handleClick(e, 2)}}></button>
      </div>
      <div className='board-row'>
        <button value={board[3]} ref={box4} onClick={(e) => {handleClick(e, 3)}}></button>
        <button value={board[4]} ref={box5} onClick={(e) => {handleClick(e, 4)}}></button>
        <button value={board[5]} ref={box6} onClick={(e) => {handleClick(e, 5)}}></button>
      </div>
      <div className='board-row'>
        <button value={board[6]} ref={box7} onClick={(e) => {handleClick(e, 6)}}></button>
        <button value={board[7]} ref={box8} onClick={(e) => {handleClick(e, 7)}}></button>
        <button value={board[8]} ref={box9} onClick={(e) => {handleClick(e, 8)}}></button>
      </div>
    </div>
    <button className='reset' onClick={handleReset}>Reset</button>
  </div>
  )
}

export default App;
