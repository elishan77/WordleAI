# Validation functions for the Wordle game
def validate_length(guess: str, word_length: int=5) -> bool:
    return (len(guess) == word_length)

def validate_alphabetic(guess: str) -> bool:
    return guess.isalpha()

def validate_allowed(guess: str, valid_words: set) -> bool:
    return guess.lower() in valid_words