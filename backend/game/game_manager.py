from dataclasses import dataclass, field
from backend.game.validation import validate_length, validate_alphabetic, validate_allowed
from backend.game.feedback import generate_feedback
from backend.game.word_loader import ANSWER_WORDS, VALID_GUESSES
import random

@dataclass
class Game:
    answer: str = ""
    guesses: list[str] = field(default_factory=list)
    max_guesses:int = 6
    game_over: bool = False
    won : bool = False

    def __post_init__(self):
        self.set_random_answer()

    def set_answer(self, answer):
        if not validate_length(answer):
            raise ValueError("Answer must be 5 letters long")
        if not validate_alphabetic(answer):
            raise ValueError("Answer must only contain alphabetic characters")
        if not validate_allowed(answer, VALID_GUESSES):
            raise ValueError("Answer is not in the list of valid words")
        
        self.answer = answer

    def set_random_answer(self):
        self.answer = random.choice(list(ANSWER_WORDS))

    # user manually submits a guess and receives feedback
    def submit_guess(self, guess):
        guess = guess.lower().strip()
        
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
        if not validate_allowed(guess, VALID_GUESSES):
            raise ValueError("Guess is not in the list of valid words")
        
        feedback = generate_feedback(guess, self.answer)
        
        # store guess and feedback for history
        self.guesses.append({
            "guess": guess,
            "feedback": feedback
        })

        # check for correct guess
        if guess == self.answer:
            self.won = True
            self.game_over = True
        # if max guesses reached without correct answer, game is over
        elif len(self.guesses) >= self.max_guesses:
            self.game_over = True

        return feedback
    
    def remaining_guesses(self):
        return self.max_guesses - len(self.guesses)
    
    # acts as a "try again" option with a new answer
    def reset(self):
        self.guesses = []
        self.game_over = False
        self.won = False
        self.set_random_answer()