import { useNavigate } from "react-router-dom";
import { FaShuffle } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";



export function Assist() {
  let navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="header">WordleAI</h1>
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