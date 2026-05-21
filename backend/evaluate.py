from backend.game.game_manager import Game
from backend.game.word_loader import ANSWER_WORDS

def evaluate(ai_function): # change ai_function with jedi's ai function
    results = []
    for word in ANSWER_WORDS:
        game = Game(answer=word)
        while not game.game_over:
            game.submit_guess(ai_function(game.guesses))
        results.append(len(game.guesses) if game.won else 7)  # 7 = lose

    solved = []
    for result in results:
        if result <= 6:
            solved.append(result)
    print(f"solved: {len(solved)}/{len(results)} ({100*len(solved)/len(results):.1f}%)")
    print(f"avg guesses: {sum(solved)/len(solved):.3f}")
    print(f"worst case: {max(results)}")