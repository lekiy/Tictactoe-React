import Square from "./Square";
import "./Board.css";
import { useCallback, useState } from "react";

type BoardProps = {
  currentPlayer: number;
  nextTurn: () => void;
};

const Board: React.FC<BoardProps> = ({ currentPlayer, nextTurn }) => {
  const [gridCells, setGridCells] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const squares = [];

  const checkForWin = useCallback(
    (currentPlayer: number) => {
      console.log(currentPlayer);
      if ((gridCells[0] + gridCells[1] + gridCells[2]) / 3 === currentPlayer)
        return true;
      return false;
    },
    [gridCells]
  );

  const handleUpdateCell = useCallback(
    (position: number, value: number) => {
      setGridCells(
        gridCells.map((cell, index) => {
          if (index === position) return value;
          return cell;
        })
      );
      console.log(checkForWin(value));
    },
    [checkForWin, gridCells]
  );

  for (let index = 0; index < gridCells.length; index++) {
    squares.push(
      <Square
        currentPlayer={currentPlayer}
        nextTurn={nextTurn}
        position={index}
        updateCell={handleUpdateCell}
      />
    );
  }

  return (
    <div className="board">
      {squares}
      {gridCells}
    </div>
  );
};

export default Board;
