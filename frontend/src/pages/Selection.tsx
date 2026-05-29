import { useNavigate } from "react-router";

export function Selection() {
  let navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="header">WordleAI</h1>
      <p className="title">
        Welcome to WordleAI! <br />
        Select your game mode to begin.
      </p>
      
      <button 
        className="mode-button"
        onClick={() => navigate("/autoplay")}
      >
        AI Auto Play
      </button>
      <p className="mode-description">
        Watch the AI solve a game and learn from its choices.
      </p>
      
      <button 
        className="mode-button"
        onClick={() => navigate("/assist")}
      >
        AI Assist Mode
      </button>
      <p className="mode-description">
        Play your own game and prompt the AI for the next best guess when needed.
      </p>
    </div>
  );
}