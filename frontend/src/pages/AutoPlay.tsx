import { useNavigate } from "react-router";
import { FaShuffle } from "react-icons/fa6";

export function AutoPlay() {
  let navigate = useNavigate();
  return (
    <div className="page">
      <h1 className="header">WordleAI</h1>
      <button 
        className="game-button"
        onClick={() => navigate("/")}
      >
        <FaShuffle size={20}/>
        NEW GAME
      </button>
    </div>
  );
}