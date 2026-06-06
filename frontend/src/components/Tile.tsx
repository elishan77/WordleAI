export type Status = "green" | "yellow" | "gray" | "neutral";

type TileProps = {
  letter?: string;
  status?: Status;
};

export function Tile({ letter, status }: TileProps) {
  return (
    <div className={`tile_${status}`}>
      {letter}
    </div>
  );
}