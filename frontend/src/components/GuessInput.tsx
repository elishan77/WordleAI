import { useState } from "react";
import { submitGuess } from "../api/game";

export default function GuessInput() {
  const [value, setValue] = useState("");

  async function handleSubmit() {
    if (!value.trim()) return;

    try {
      const result = await submitGuess(value);

      console.log(result);

      // clear input after successful guess
      setValue("");
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
      }}
    />
  );
}