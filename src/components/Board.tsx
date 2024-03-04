import Square from "./Square";
import { useCallback, useState } from "react";

type BoardProps = {
  currentPlayer: number;
  nextTurn: () => void;
  handleWin: () => void;
};

const Board: React.FC<BoardProps> = ({
  currentPlayer,
  nextTurn,
  handleWin,
}) => {
  const [gridCells, setGridCells] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const squares = [];

  const checkForWin = useCallback(
    (currentPlayer: number, grid: Array<number>) => {
      if ((grid[0] + grid[1] + grid[2]) / 3 === currentPlayer) return true;
      return false;
    },
    []
  );

  const handleUpdateCell = useCallback(
    (position: number, player: number) => {
      let grid = gridCells;
      grid = grid.map((cell, index) => {
        if (index === position) {
          return player;
        }
        return cell;
      });
      setGridCells(grid);
      if (checkForWin(player, grid)) handleWin();
    },
    [checkForWin, gridCells, handleWin]
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

  return <div className="board">{squares}</div>;
};

export default Board;
