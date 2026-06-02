import { KeyboardRow } from "./KeyboardRow";

type KeyboardProp = {
  alphabetMap: Object;
}


export function Keyboard({ alphabetMap }: KeyboardProp) {
  const keyboardOrder = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    /* 
    for each row in keyboardOrder:
      assign the status to every letter in the row from alphabetMap
      create a KeyboardRow and pass the word
    */ 
    0
  );
}