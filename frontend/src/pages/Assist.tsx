import { useNavigate } from "react-router-dom";
import { FaShuffle } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { GameBoard } from "../components/GameBoard";
import type { Guess } from "../components/GameBoard";

export function Assist() {
  let navigate = useNavigate();

  // replace with actual initialization/api call
  const guesses: Guess[] = [
    { word: "basil", feedback: ["gray", "gray", "gray", "yellow", "gray"] },
    { word: "rogue", feedback: ["gray", "yellow", "gray", "gray", "gray"] },
    { word: "draft", feedback: ["green", "gray", "gray", "gray", "green"] },
    { word: "ditto", feedback: ["green", "green", "yellow", "gray", "yellow"] },
    { word: "divot", feedback: ["green", "green", "green", "green", "green"] },
    { word: "00000", feedback: ["empty", "empty", "empty", "empty", "empty"] }
  ];

  return (
    <div className="page">
      <h1 className="header">WordleAI</h1>

      {/* example guess board */}
      <GameBoard guesses={guesses} />

      {/* Game Buttons */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <button 
          className="game-button"
          onClick={() => navigate("/")}
        >
          <FaShuffle size={20}/>
          NEW GAME
        </button>
        <button 
          className="game-button"
          onClick={() => void 0}
        >
          <IoSparkles size={20}/>
          NEXT GUESS
        </button>
      </div>
    </div>
  );
}