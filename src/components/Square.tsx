import { useCallback, useState } from "react";

type SquareProps = {
  currentPlayer: number;
  nextTurn: () => void;
  updateCell: (position: number, value: number) => void;
  position: number;
};

const Square: React.FC<SquareProps> = ({
  currentPlayer,
  nextTurn,
  updateCell,
  position,
}) => {
  const [value, setValue] = useState(0);
  const handleOnClickSquare = useCallback(() => {
    setValue(currentPlayer);
    updateCell(position, currentPlayer);
    nextTurn();
  }, [currentPlayer, nextTurn, position, updateCell]);

  const getGamePiece = useCallback((value: number) => {
    if (value == 1)
      return (
        <div className="o">
          <div></div>
        </div>
      );
    if (value == 2)
      return (
        <div className="x">
          <div></div>
          <div></div>
        </div>
      );
  }, []);

  return (
    <div className="square">
      {value ? (
        getGamePiece(value)
      ) : (
        <button onClick={handleOnClickSquare}>{getGamePiece(value)}</button>
      )}
    </div>
  );
};

export default Square;
