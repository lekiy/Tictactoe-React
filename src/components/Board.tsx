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
  const [lines, setLines] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const squares = [];

  const checkForWin = useCallback(
    (currentPlayer: number, grid: Array<number>) => {
      //horizontal
      if (
        grid[0] === currentPlayer &&
        grid[1] === currentPlayer &&
        grid[2] === currentPlayer
      ) {
        setLines(lines.map((value, index) => (index === 0 ? true : value)));
        return true;
      } //top
      if (
        grid[3] === currentPlayer &&
        grid[4] === currentPlayer &&
        grid[5] === currentPlayer
      ) {
        setLines(lines.map((value, index) => (index === 1 ? true : value)));
        return true;
      } //middle
      if (
        grid[6] === currentPlayer &&
        grid[7] === currentPlayer &&
        grid[8] === currentPlayer
      ) {
        setLines(lines.map((value, index) => (index === 2 ? true : value)));
        return true;
      } //bottom

      //vertical
      if (
        grid[0] === currentPlayer &&
        grid[3] === currentPlayer &&
        grid[6] === currentPlayer
      ) {
        setLines(lines.map((value, index) => (index === 3 ? true : value)));
        return true;
      } //left
      if (
        grid[1] === currentPlayer &&
        grid[4] === currentPlayer &&
        grid[7] === currentPlayer
      ) {
        setLines(lines.map((value, index) => (index === 4 ? true : value)));
        return true;
      } //middle
      if (
        grid[2] === currentPlayer &&
        grid[5] === currentPlayer &&
        grid[8] === currentPlayer
      ) {
        setLines(lines.map((value, index) => (index === 5 ? true : value)));
        return true;
      } //right

      //diagnal
      if (
        grid[0] === currentPlayer &&
        grid[4] === currentPlayer &&
        grid[8] === currentPlayer
      ) {
        setLines(lines.map((value, index) => (index === 6 ? true : value)));
        return true;
      } //left-right
      if (
        grid[2] === currentPlayer &&
        grid[4] === currentPlayer &&
        grid[6] === currentPlayer
      ) {
        setLines(lines.map((value, index) => (index === 7 ? true : value)));
        return true;
      } //right-left

      return false;
    },
    [lines]
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

  return (
    <>
      <div className="board">{squares}</div>
      <div className="lines">
        {lines[0] && <div className="line line-top"></div>}
        {lines[1] && <div className="line line-middle"></div>}
        {lines[2] && <div className="line line-bottom"></div>}
        {lines[3] && <div className="line line-left"></div>}
        {lines[4] && <div className="line line-center"></div>}
        {lines[5] && <div className="line line-right"></div>}
        {lines[6] && <div className="line line-left-to-right"></div>}
        {lines[7] && <div className="line line-right-to-left"></div>}
      </div>
    </>
  );
};

export default Board;
