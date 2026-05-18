from dataclasses import dataclass
from validation import validate_length, validate_alphabetic, validate_allowed
from feedback import generate_feedback
from word_loader import ANSWER_WORDS
import random

@dataclass
class Game:
    answer: str
    guesses: list
    max_guesses:int = 6
    game_over: bool = False
    won : bool = False

    def set_answer(self, answer):
        if not validate_length(answer):
            raise ValueError("Answer must be 5 letters long")
        if not validate_alphabetic(answer):
            raise ValueError("Answer must only contain alphabetic characters")
        if not validate_allowed(answer):
            raise ValueError("Answer is not in the list of valid words")
        
        self.answer = answer

    def set_random_answer(self):
        self.answer = random.choice(ANSWER_WORDS)

    # user manually submits a guess and receives feedback
    def submit_guess(self, guess):
        if self.game_over:
            raise Exception("Game is already over")
        if len(self.guesses) >= self.max_guesses:
            self.game_over = True
            raise Exception("Maximum number of guesses reached")
        
        # validate guess
        if not validate_length(guess):
            raise ValueError("Guess must be 5 letters long")
        if not validate_alphabetic(guess):
            raise ValueError("Guess must only contain alphabetic characters")
        if not validate_allowed(guess):
            raise ValueError("Guess is not in the list of valid words")
        
        self.guesses.append(guess)

        return generate_feedback(guess, self.answer)
    
    def remaining_guesses(self):
        return self.max_guesses - len(self.guesses)
    
    # acts as a "try again" option
    def reset(self):
        self.guesses = []
        self.game_over = False
        self.won = False