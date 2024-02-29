import { useCallback, useState } from "react";

type SquareProps = {
  currentPlayer: number;
  nextTurn: () => void;
};

const Square: React.FC<SquareProps> = ({ currentPlayer, nextTurn }) => {
  const [value, setValue] = useState(0);
  const handleOnClickSquare = useCallback(() => {
    setValue(currentPlayer);
    nextTurn();
  }, [currentPlayer, nextTurn]);

  const getGamePiece = useCallback((value: number) => {
    if (value == 1) return "O";
    if (value == 2) return "X";
  }, []);

  return (
    <div>
      {value ? (
        getGamePiece(value)
      ) : (
        <button onClick={handleOnClickSquare}>.</button>
      )}
    </div>
  );
};

export default Square;
