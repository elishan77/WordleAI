from fastapi import FastAPI, HTTPException
from backend.game.game_manager import Game
from pydantic import BaseModel

app = FastAPI(title="WordleAI_API", description="API for playing WordleAI", version="1.0.0")

# initialize a single game
game = Game()

# ----------------------------------
# Root
# ----------------------------------
@app.get("/", tags=["Root"])
def root():
    return {"message": "Welcome to WordleAI", "status": "API is running"}

# ----------------------------------
# Game
# ----------------------------------
class GuessRequest(BaseModel):
    guess: str

@app.post("/guess", tags=["Game"])
def submit_guess(guess_request: GuessRequest):
    try:
        feedback = game.submit_guess(guess_request.guess)
        return {
            "guess": guess_request.guess,
            "feedback": feedback,
            "remaining_guesses": game.remaining_guesses(),
            "game_over": game.game_over,
            "won": game.won
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.get("/state", tags=["Game"])
def get_game_state():
    return {
        "guesses": game.guesses,
        "remaining_guesses": game.remaining_guesses(),
        "game_over": game.game_over,
        "won": game.won
    }

@app.post("/reset", tags=["Game"])
def reset_game():
    game.reset()

    return {
        "message": "Game reset",
        "remaining_guesses": game.remaining_guesses()
    }

# ----------------------------------
# AI
# ----------------------------------