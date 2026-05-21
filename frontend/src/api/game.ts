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