import { Tile } from "./Tile";
import type { Status } from "./Tile";

type WordRowProps = {
  word: string;
  feedback: (Status | undefined)[];
};

export function Word({ word, feedback }: WordRowProps) {
  return (
    <div className="word-row">
      {Array.from({ length: 5 }).map((_, index) => (
        <Tile
          key={index}
          letter={word[index]?.toUpperCase() || ""}
          status={(feedback[index] as Status) || "neutral"}
        />
      ))}
    </div>
  );
}
