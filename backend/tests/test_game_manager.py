from backend.game.game_manager import Game

def test_game_initialization():
    game = Game(answer="crane")
    assert game.answer == "crane"
    assert game.guesses == []
    assert game.max_guesses == 6
    assert not game.game_over
    assert not game.won

def test_valid_guess():
    game = Game(answer="crane")
    feedback = game.submit_guess("crane")
    assert feedback == ["green", "green", "green", "green", "green"]
    assert game.guesses == [{"guess": "crane", "feedback": feedback}]
    assert game.game_over
    assert game.won

def test_game_play():
    game = Game(answer="crane")
    feedback1 = game.submit_guess("slate")
    assert feedback1 == ["gray", "gray", "green", "gray", "green"]
    assert not game.game_over
    assert not game.won
    assert game.remaining_guesses() == 5

    feedback2 = game.submit_guess("roach")
    assert feedback2 == ["yellow", "gray", "green", "yellow", "gray"]
    assert not game.game_over
    assert not game.won
    assert game.remaining_guesses() == 4

    feedback3 = game.submit_guess("crane")
    assert feedback3 == ["green", "green", "green", "green", "green"]
    assert game.game_over
    assert game.won

def test_game_fail():
    game = Game(answer="crane")
    guesses = ["slate", "roach", "stone", "plane", "flame", "grape"]
    for guess in guesses:
        game.submit_guess(guess)
    
    assert game.game_over
    assert not game.won

if __name__ == "__main__":
    test_game_initialization()
    test_valid_guess()
    test_game_play()
    test_game_fail()
    print("All tests passed!")