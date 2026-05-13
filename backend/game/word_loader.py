from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
WORD_DIR = ROOT_DIR / "word_lists"

def load_word_set(filename):
    with open(WORD_DIR / filename) as f:
        return set(word.strip().lower() for word in f)

VALID_GUESSES = load_word_set("guesses_and_answers_list.txt")
ANSWER_WORDS = load_word_set("answers_list.txt")