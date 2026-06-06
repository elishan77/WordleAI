import { KeyboardRow, } from "./KeyboardRow";
import type { Status } from "./Tile";

type KeyboardProp = {
  alphabetMap: Record<string, Status>;
}


export function Keyboard({ alphabetMap }: KeyboardProp) {
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div className="keyboard">
      {keyboardRows.map((row, idx) => (
        <KeyboardRow
          key={idx}
          letters={row}
          alphabetMap={alphabetMap}
        />
      ))}
    </div>
  );
}