''' --------- Wordle feedback generation ---------
GREEN: correct letter in the correct position
YELLOW: correct letter in the wrong position
GRAY: letter not in the word
occurrence rule: multiple instances of a letter only colored if the answer
    contains that many instances of the letter 
'''

def generate_feedback(guess, answer):
    feedback = ["gray"] * 5
    answer_chars = list(answer)

    # first pass: prioritize greens
    for i in range(5):
        if guess[i] == answer[i]:
            feedback[i] = "green"
            answer_chars[i] = None # remove to account for the occurrence rule

    # second pass: check for yellows, skipping greens
    for i in range(5):
        if feedback[i] == "green":
            continue

        if guess[i] in answer_chars:
            feedback[i] = "yellow"

            matched_index = answer_chars.index(guess[i])
            answer_chars[matched_index] = None # remove to account for the occurrence rule

    return feedback