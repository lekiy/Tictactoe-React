import { useCallback, useState } from "react";

type SquareProps = {
  currentPlayer: number;
};

const Square: React.FC<SquareProps> = ({ currentPlayer }) => {
  const [value, setValue] = useState(0);
  const handleOnClickSquare = useCallback(() => {
    setValue(currentPlayer);
  }, [currentPlayer]);

  return (
    <>
      {value ? String(value) : <button onClick={handleOnClickSquare}>.</button>}
    </>
  );
};

export default Square;
