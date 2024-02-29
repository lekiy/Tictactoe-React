import { useCallback, useMemo, useState } from "react";
import Board from "./Board";

function Game() {
  const [isPlaying, setPlaying] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(2);

  const handlePlayGameClick = useCallback(() => {
    setPlaying(!isPlaying);
  }, [isPlaying]);

  const getGameMessage = useMemo(() => {
    if (!isPlaying) return "";
    if (isGameOver) return "? Wins!";
    if (currentPlayer === 1) return "O's Turn";
    if (currentPlayer === 2) return "X's Turn";
  }, [currentPlayer, isGameOver, isPlaying]);

  return (
    <>
      {isPlaying && (
        <>
          <Board currentPlayer={currentPlayer} />
          {getGameMessage}
        </>
      )}
      {!isPlaying && <button onClick={handlePlayGameClick}> Play Game</button>}
    </>
  );
}

export default Game;
