// add all api calls here
import API_BASE_URL from "./client";

export async function submitGuess(guess: string) {
    const response = await fetch(`${API_BASE_URL}/guess`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ guess }),
    });

    if (!response.ok) {
        throw new Error("Failed to submit guess");
    }

    return response.json();
}

export async function getGameState() {
  const res = await fetch(`${API_BASE_URL}/state`);
  if (!res.ok) throw new Error("Failed to get game state");
  return res.json();
}

export async function resetGame() {
  const res = await fetch(`${API_BASE_URL}/reset`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to reset game");
  return res.json();
}

export async function aiGuess() {
  const res = await fetch(`${API_BASE_URL}/ai/guess`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to get AI guess");
  return res.json();
}

export async function aiPlay() {
  const res = await fetch(`${API_BASE_URL}/ai/play`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to run AI play");
  return res.json();
}
