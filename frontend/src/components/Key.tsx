type KeyProps = {
  letter?: string;
  status?: "green" | "yellow" | "gray" | "neutral";
};

export function Key({ letter, status }: KeyProps) {
  return (
    <div className={`key_${status}`}>
      {letter}
    </div>
  );
}