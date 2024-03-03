import { useCallback, useMemo, useState } from "react";
import Board from "./Board";

function Game() {
  const [isPlaying, setPlaying] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const handlePlayGameClick = useCallback(() => {
    setPlaying(!isPlaying);
  }, [isPlaying]);

  const handleChangeTurn = useCallback(() => {
    if (currentPlayer == 1) setCurrentPlayer(2);
    if (currentPlayer == 2) setCurrentPlayer(1);
  }, [currentPlayer]);

  const handleWin = useCallback(() => {
    setGameOver(true);
  }, []);

  const getGameMessage = useMemo(() => {
    if (!isPlaying) return "";
    if (isGameOver) return (currentPlayer === 1 ? "X" : "O") + " Wins!";
    if (currentPlayer === 1) return "O's Turn";
    if (currentPlayer === 2) return "X's Turn";
  }, [currentPlayer, isGameOver, isPlaying]);

  return (
    <>
      {isPlaying && (
        <>
          <Board
            currentPlayer={currentPlayer}
            nextTurn={handleChangeTurn}
            handleWin={handleWin}
          />
          {getGameMessage}
        </>
      )}
      {!isPlaying && <button onClick={handlePlayGameClick}> Play Game</button>}
    </>
  );
}

export default Game;
