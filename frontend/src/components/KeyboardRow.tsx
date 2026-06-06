import { Key } from "./Key";
import type { Status } from "./Tile";

type KeyboardRowProps = {
  letters: string[];
  alphabetMap: Record<string, Status>;
};

export function KeyboardRow({ letters, alphabetMap }: KeyboardRowProps) {
  return (
    <div className="keyboard-row">
      {letters.map((letter) => (
        <Key
          key={letter}
          letter={letter}
          status={alphabetMap[letter]}
        />
      ))}
    </div>
  );
}