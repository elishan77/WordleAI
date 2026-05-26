from backend.game.game_manager import Game
from backend.game.word_loader import ANSWER_WORDS
from backend.game.solver import Solver
from multiprocessing import Pool, cpu_count
from tqdm import tqdm

FIRST_GUESS = "crane" # precomputed best opening guess, skips search on turn 1

def evaluate_word(word):
    solver = Solver()
    game = Game(answer=word)
    game.submit_guess(FIRST_GUESS)
    while not game.game_over:
        game.submit_guess(solver.next_guess(game.guesses))
    return len(game.guesses) if game.won else 7 # 7 = loss

def evaluate():
    with Pool(cpu_count()) as pool:
        results = list(tqdm(
            pool.imap_unordered(evaluate_word, ANSWER_WORDS),
            total=len(ANSWER_WORDS),
            desc="Evaluating"
        ))

    solved = [r for r in results if r <= 6]
    print(f"solved: {len(solved)}/{len(results)} ({100*len(solved)/len(results):.1f}%)")
    print(f"avg guesses: {sum(solved)/len(solved):.3f}")
    print(f"worst case: {max(solved)}")
    print(f"distribution: { {i: results.count(i) for i in range(1,8)} }")

if __name__ == "__main__":
    evaluate()
