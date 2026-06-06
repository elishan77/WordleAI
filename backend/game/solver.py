from backend.game.feedback import generate_feedback
from backend.game.word_loader import ANSWER_WORDS, VALID_GUESSES

class Solver:
    def __init__(self):
        self.valid_guesses = VALID_GUESSES
        self.reset()

    def reset(self):
        self.remaining_candidates = set(ANSWER_WORDS)

    def filter_candidates(self, guess: str, feedback: list[str]):
        guess = guess.lower().strip()
        self.remaining_candidates = {
            word
            for word in self.remaining_candidates
            if generate_feedback(guess, word) == feedback
        }
        print(f"Filtered candidates: {len(self.remaining_candidates)} remaining")

    def pick_best_guess(self) -> str:
        if not self.remaining_candidates:
            raise ValueError("No remaining candidates")
        if len(self.remaining_candidates) <= 2:
            return next(iter(self.remaining_candidates))
        
        best_word = None
        best_score = float("inf")

        search_space = (
            self.valid_guesses
            if len(self.remaining_candidates) > 2
            else self.remaining_candidates
        )

        for guess in search_space:
            buckets: dict[tuple, int] = {}
            for candidate in self.remaining_candidates:
                fb = tuple(generate_feedback(guess, candidate))
                buckets[fb] = buckets.get(fb, 0) + 1
            score = sum(count * count for count in buckets.values())
            if score < best_score:
                best_score = score
                best_word = guess

        if best_word is None:
            raise ValueError("Could not pick a guess")
        
        return best_word

    def next_guess(self, guesses: list) -> str:
        self.reset()
        for g in guesses:
            self.filter_candidates(g["guess"], g["feedback"])
        return self.pick_best_guess()
