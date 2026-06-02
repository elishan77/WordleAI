import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShuffle } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { GameBoard } from "../components/GameBoard";
import type { Guess } from "../components/GameBoard";
import { getGameState, resetGame, aiGuess } from "../api/game";

export function Assist() {
  const navigate = useNavigate();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGameState().then((data) => {
      setGuesses(data.guesses);
      setGameOver(data.game_over);
    });
  }, []);

  async function handleReset() {
    await resetGame();
    setGuesses([]);
    setGameOver(false);
    navigate("/");
  }

  async function handleAiGuess() {
    if (gameOver || loading) return;
    setLoading(true);
    const data = await aiGuess();
    setGuesses((prev) => [...prev, { word: data.guess, feedback: data.feedback }]);
    setGameOver(data.game_over);
    setLoading(false);
  }

  return (
    <div className="page">
      <h1 className="header">WordleAI</h1>

      <GameBoard guesses={guesses} />

      <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        <button className="game-button" onClick={handleReset}>
          <FaShuffle size={20} />
          NEW GAME
        </button>
        <button className="game-button" onClick={handleAiGuess} disabled={gameOver || loading}>
          <IoSparkles size={20} />
          {loading ? "THINKING..." : "NEXT GUESS"}
        </button>
      </div>
    </div>
  );
}
