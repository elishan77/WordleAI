import type { Status } from "./Tile";

type KeyProps = {
  letter?: string;
  status?: Status;
};

export function Key({ letter, status }: KeyProps) {
  return (
    <div className={`key_${status}`}>
      {letter}
    </div>
  );
}