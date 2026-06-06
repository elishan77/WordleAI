from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.game.game_manager import Game
from pydantic import BaseModel
from backend.game.solver import Solver

app = FastAPI(title="WordleAI_API", description="API for playing WordleAI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# initialize a single game
game = Game()
solver = Solver()

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
            "won": game.won,
            "answer": game.answer if game.game_over else None
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/state", tags=["Game"])
def get_game_state():
    return {
        "guesses": game.guesses,
        "remaining_guesses": game.remaining_guesses(),
        "game_over": game.game_over,
        "won": game.won,
        "answer": game.answer if game.game_over else None
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
@app.post("/ai/guess", tags=["AI"])
def ai_guess():
    if game.game_over:
        raise HTTPException(status_code=400, detail="Game is already over")
    guess = solver.next_guess(game.guesses)
    feedback = game.submit_guess(guess)
    return {
        "guess": guess,
        "feedback": feedback,
        "remaining_guesses": game.remaining_guesses(),
        "game_over": game.game_over,
        "won": game.won,
        "answer": game.answer if game.game_over else None
    }

@app.post("/ai/play", tags=["AI"])
def ai_play():
    game.reset()
    solver.reset()
    while not game.game_over:
        guess = solver.next_guess(game.guesses)
        game.submit_guess(guess)
    return {
        "answer": game.answer,
        "guesses": game.guesses,
        "won": game.won,
        "num_guesses": len(game.guesses)
    }
