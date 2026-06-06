import type { Status } from "../components/Tile";

type Guess = {
  guess: string;
  feedback: Status[];
};

const priority = {
  neutral: 0,
  gray: 1,
  yellow: 2,
  green: 3,
};

function updateLetterStatus(current: Status, next: Status): Status {
  return priority[next] > priority[current]
    ? next
    : current;
}

export function buildAlphabetMap(guesses: Guess[]): Record<string, Status> {
  const map: Record<string, Status> = {};

  for (const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    map[letter] = "neutral";
  }

  for (const guess of guesses) {
    guess.guess
      .toUpperCase()
      .split("")
      .forEach((letter, idx) => {
        map[letter] = updateLetterStatus(
          map[letter],
          guess.feedback[idx]
        );
      });
  }

  return map;
}