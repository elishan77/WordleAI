import { Word } from "../components/Word";
import type { Status } from "../components/Word";

export type Guess = {
  word: string;
  feedback: Status[];
};

type GameBoardProps = {
  guesses: Guess[];
};

export function GameBoard({ guesses }: GameBoardProps) {
  return (
    <div className="game-board">
      {Array.from({ length: 6 }).map((_, index) => (
        <Word
          key={index}
          word={guesses[index]?.word || ""}
          feedback={guesses[index]?.feedback || []}
        />
      ))}
    </div>
  );
}