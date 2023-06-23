import { useState } from 'react';
import { Cell } from '../Cell';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const way = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [-1, -1],
    [0, -1],
  ];
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    let p = false;
    if (board[y][x] === 0) {
      for (const [wy, wx] of way) {
        if (
          board[y + wy] !== undefined &&
          board[x + wx] !== undefined &&
          board[y + wy][x + wx] === 3 - turnColor
        ) {
          for (let s = 1; s < 8; s++) {
            if (
              board[y + wy * s] !== undefined &&
              board[y + wy * s][x + wx * s] !== undefined &&
              board[y + wy * s][x + wx * s] === turnColor
            ) {
              let turncounts = 0;
              for (let s2 = 1; s2 <= s; s2++) {
                if (board[y + wy * s2][x + wx * s2] !== 0) {
                  turncounts++;
                }
              }
              if (turncounts === s) {
                newBoard[y][x] = turnColor;
                p = true;
                for (let q2 = 1; q2 < s; q2++) {
                  newBoard[y + wy * q2][x + wx * q2] = turnColor;
                }
              }
              break;
            }
          }
        }
      }
      if (p) {
        setTurnColor(3 - turnColor);
        setBoard(newBoard);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.turn}>
        <h1>{turnColor === 1 ? '黒のターン' : '白のターン'}</h1>
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
