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
      //horizontal
      if (
        grid[0] === currentPlayer &&
        grid[1] === currentPlayer &&
        grid[2] === currentPlayer
      )
        return true; //top
      if (
        grid[3] === currentPlayer &&
        grid[4] === currentPlayer &&
        grid[5] === currentPlayer
      )
        return true; //middle
      if (
        grid[6] === currentPlayer &&
        grid[7] === currentPlayer &&
        grid[8] === currentPlayer
      )
        return true; //bottom

      //vertical
      if (
        grid[0] === currentPlayer &&
        grid[3] === currentPlayer &&
        grid[6] === currentPlayer
      )
        return true; //left
      if (
        grid[1] === currentPlayer &&
        grid[4] === currentPlayer &&
        grid[7] === currentPlayer
      )
        return true; //middle
      if (
        grid[2] === currentPlayer &&
        grid[5] === currentPlayer &&
        grid[8] === currentPlayer
      )
        return true; //right

      //diagnal
      if (
        grid[0] === currentPlayer &&
        grid[4] === currentPlayer &&
        grid[8] === currentPlayer
      )
        return true; //left-right
      if (
        grid[2] === currentPlayer &&
        grid[4] === currentPlayer &&
        grid[6] === currentPlayer
      )
        return true; //right-left

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
      console.log(grid);
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

  return (
    <>
      <div className="board">{squares}</div>
      <div className="lines">
        <div className="line line-top"></div>
        <div className="line line-middle"></div>
        <div className="line line-bottom"></div>
        <div className="line line-left"></div>
        <div className="line line-center"></div>
        <div className="line line-right"></div>
        <div className="line line-left-to-right"></div>
        <div className="line line-right-to-left"></div>
      </div>
    </>
  );
};

export default Board;
