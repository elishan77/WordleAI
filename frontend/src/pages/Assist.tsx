import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShuffle } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { GameBoard } from "../components/GameBoard";
import type { Guess } from "../components/GameBoard";
import { getGameState, resetGame, aiGuess, submitGuess } from "../api/game";
import { buildAlphabetMap } from "../utils/alphabetMap";
import { Keyboard } from "../components/Keyboard";

export function Assist() {
  const navigate = useNavigate();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputGuess, setInputGuess] = useState("");
  const alphabetMap = buildAlphabetMap(guesses);

  useEffect(() => {
    getGameState().then((data) => {
      setGuesses(data.guesses);
      setGameOver(data.game_over);
      setWon(data.won);
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
    setGuesses((prev) => [...prev, { guess: data.guess, feedback: data.feedback }]);
    setGameOver(data.game_over);
    setLoading(false);
  }

  async function handleSubmit() {
    if (!inputGuess.trim()) return;

    try {
      const data = await submitGuess(inputGuess);
      setGuesses((prev) => [...prev, { guess: data.guess, feedback: data.feedback }]);
      setGameOver(data.game_over);

      console.log(data);

      // clear input after successful guess
      setInputGuess("");
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="page">
      <h1 className="header">WordleAI</h1>

      <GameBoard guesses={guesses} />

      <p className="input-description">Enter your guess below:</p>

      <input
        value={inputGuess}
        className="input-box"
        onChange={(e) => setInputGuess(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
              handleSubmit();
          }
        }}
      />

      <Keyboard alphabetMap={alphabetMap} />

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

      {gameOver && (
        <p className="game-end-message">
          {won ? `You solved the puzzle in ${guesses.length} guesses.` : `Correct answer:`}
        </p>
      )}

    </div>
  );
}
