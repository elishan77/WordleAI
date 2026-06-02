import { useState } from "react";
import { useNavigate } from "react-router";
import { FaShuffle } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { GameBoard } from "../components/GameBoard";
import type { Guess } from "../components/GameBoard";
import { aiPlay, resetGame } from "../api/game";

export function AutoPlay() {
  const navigate = useNavigate();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  
  async function handlePlay() {
    setLoading(true);
    setGuesses([]);
    setDone(false);
    const data = await aiPlay();
    setGuesses(data.guesses);
    setDone(true);
    setLoading(false);
  }

  async function handleReset() {
    await resetGame();
    setGuesses([]);
    setDone(false);
    navigate("/");
  }
  
  return (
    <div className="page">
      <h1 className="header">WordleAI</h1>

      <GameBoard guesses={guesses} />

      {done && <p>Solved in {guesses.length} guesses!</p>}

      <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        <button className="game-button" onClick={handleReset}>
          <FaShuffle size={20} />
          NEW GAME
        </button>
        <button className="game-button" onClick={handlePlay} disabled={loading}>
          <IoSparkles size={20} />
          {loading ? "SOLVING..." : "AUTO PLAY"}
        </button>
      </div>
    </div>
  );
}
