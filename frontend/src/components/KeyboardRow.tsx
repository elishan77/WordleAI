import { Key } from "./Key";

export type Status = "green" | "yellow" | "gray" | "neutral";

type KeyboardRowProp = {
  word: string;
  feedback: (Status | undefined)[];
}

export function KeyboardRow({ word, feedback }: KeyboardRowProp) {
  return (
    <div className="keyboard-row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Key
          key={index}
          letter={word[index].toUpperCase() || ""}
          status={(feedback[index] as Status) || "empty"}
        />
      ))}
    </div>
  );
}