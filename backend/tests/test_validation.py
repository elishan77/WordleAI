from backend.game.word_loader import VALID_GUESSES, ANSWER_WORDS 
from backend.game.validation import validate_length, validate_alphabetic, validate_allowed

def test_validate_length():
    assert validate_length("apple") == True
    assert validate_length("app") == False
    assert validate_length("apples") == False

def test_validate_alphabetic():
    assert validate_alphabetic("apple") == True
    assert validate_alphabetic("app1e") == False
    assert validate_alphabetic("12345") == False

def test_validate_allowed():
    assert validate_allowed("apple", VALID_GUESSES) == True
    assert validate_allowed("apple", ANSWER_WORDS) == True
    assert validate_allowed("xyzzy", VALID_GUESSES) == False
    assert validate_allowed("xyzzy", ANSWER_WORDS) == False

if __name__ == "__main__":
    test_validate_length()
    test_validate_alphabetic()
    test_validate_allowed()
    print("All tests passed!")