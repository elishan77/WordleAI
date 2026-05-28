export function Selection() {
  return (
    <div>
      <h1>WordleAI</h1>
      <p>Welcome to WordleAI! Select your game mode to begin.</p>
      
      <button onClick={() => window.location.href = "/autoplay"}>Auto Play</button>
      <p>Watch the AI solve a game and learn from its choices.</p>
      
      <button onClick={() => window.location.href = "/assist"}>Assist</button>
      <p>Play your own game and prompt the AI for the next best guess when needed.</p>
    </div>
  );
}