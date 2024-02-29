import Square from "./Square";
import "./Board.css";

type BoardProps = {
  currentPlayer: number;
  nextTurn: () => void;
};

const Board: React.FC<BoardProps> = ({ currentPlayer, nextTurn }) => {
  const squares = Array(9).fill(
    <Square currentPlayer={currentPlayer} nextTurn={nextTurn} />
  );

  return <div className="board">{squares}</div>;
};

export default Board;
