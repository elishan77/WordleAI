type TileProps = {
  letter?: string;
  status?: "green" | "yellow" | "gray" | "empty";
};

export function Tile({ letter, status }: TileProps) {
  return (
    <div className={`tile_${status}`}>
      {letter}
    </div>
  );
}