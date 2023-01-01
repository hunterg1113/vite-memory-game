import { useState } from "react";
import "./App.css";

type TCell = {
  row: number;
  cell: number;
};

function generateGrid(rows: number, cells: number) {
  const grid = new Array(rows).fill("").map(() => new Array(cells).fill(0));
  const numbers = new Array(rows * cells)
    .fill("")
    .map((_, index) => Math.floor(index / 2));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cells; j++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      grid[i][j] = numbers[randomIndex];
      numbers.splice(randomIndex, 1);
    }
  }
  return grid;
}

function generateRevealedGrid(grid: number[][]) {
  return new Array(grid.length)
    .fill("")
    .map(() => new Array(grid[0].length).fill(false));
}

function App() {
  const [grid, setGrid] = useState(generateGrid(3, 4));
  const [revealedGrid, setRevealedGrid] = useState(generateRevealedGrid(grid));
  const [prevSelected, setPrevSelected] = useState<TCell | undefined>();

  function handleClick(rowIndex: number, cellIndex: number) {
    if (prevSelected?.row === rowIndex && prevSelected.cell === cellIndex)
      return;

    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][cellIndex] = true;
    setRevealedGrid(newRevealedGrid);

    if (prevSelected) {
      if (
        grid[prevSelected.row][prevSelected.cell] !== grid[rowIndex][cellIndex]
      ) {
        setTimeout(() => {
          const newRevealedGrid = [...revealedGrid];
          newRevealedGrid[rowIndex][cellIndex] = false;
          newRevealedGrid[prevSelected.row][prevSelected.cell] = false;
          setRevealedGrid(newRevealedGrid);
        }, 1000);
      } else {
        console.log("You found a pair!");
        console.log(revealedGrid);
        if (revealedGrid.every((row) => row.every((cell) => cell))) {
          setTimeout(() => {
            alert("You won!");
            setGrid(generateGrid(3, 4));
            setRevealedGrid(generateRevealedGrid(grid));
          });
        }
      }
      setPrevSelected(undefined);
    } else {
      setPrevSelected({ row: rowIndex, cell: cellIndex });
    }
  }

  return (
    <div className="App">
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => {
              return (
                <div
                  key={cellIndex}
                  className="cell"
                  onClick={() => handleClick(rowIndex, cellIndex)}
                >
                  {revealedGrid[rowIndex][cellIndex] && cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
