import Square from "./Square";

type BoardProps = {
  currentPlayer: number;
};

const Board: React.FC<BoardProps> = ({ currentPlayer }) => {
  const squares = Array(9).fill(<Square currentPlayer={currentPlayer} />);

  return squares;
};

export default Board;
