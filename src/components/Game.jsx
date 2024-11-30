import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard.jsx";
import "./Game.css";

const wordList = ["agreeableness", "heat", "wisdom", "future", "advocate", "necessity", "xylophone", "praise", "apple", "banana", "orange", "xylophone", "future",
  "zealous", "mystify", "tangible"];

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false); // Track if the game has started
  const [secretWord, setSecretWord] = useState("");
  const [dashes, setDashes] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(10);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false); // Track game over state
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility

  const startGame = () => {
    // Initialize game states when the game starts
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setSecretWord(word);
    setDashes("-".repeat(word.length));
    setGuessesLeft(10);
    setMessage("");
    setIsGameOver(false);
    setShowPopup(false);
    setIsGameStarted(true); // Set the game as started
  };

  useEffect(() => {
    if (isGameStarted) {
      // Check for win or loss only when the game is started
      if (dashes === secretWord) {
        setMessage(`Congratulations! You've guessed the word: ${secretWord}`);
        setIsGameOver(true);
        setShowPopup(true); // Show popup
      } else if (guessesLeft === 0) {
        setMessage(`You lose! The secret word was: ${secretWord}`);
        setIsGameOver(true);
        setShowPopup(true); // Show popup
      }
    }
  }, [dashes, guessesLeft, isGameStarted, secretWord]);

  const updateDashes = (guess) => {
    let updatedDashes = "";
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === guess) {
        updatedDashes += guess;
      } else {
        updatedDashes += dashes[i];
      }
    }
    setDashes(updatedDashes);
  };

  const handleGuess = (guess) => {
    if (isGameOver || !isGameStarted) return;

    if (secretWord.includes(guess)) {
      setMessage("That letter is in the word!");
      updateDashes(guess);
    } else {
      setMessage("That letter is not in the word!");
      setGuessesLeft((prev) => prev - 1);
    }
  };

  const handleReplay = () => {
    // Reset the game state
    startGame(); // Use the startGame function to reinitialize
  };

  const handleKeyPress = (event) => {
    const key = event.key.toLowerCase();
    if (/^[a-z]$/.test(key) && !isGameOver && isGameStarted) {
      handleGuess(key); // Call handleGuess for valid alphabetic keys
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress); // Clean up event listener
    };
  }, [isGameOver, handleGuess, isGameStarted]);

  return (
    <div className="game">
      {!isGameStarted ? (
        <div className="welcome-screen">
          <h1>Welcome to the Guess the Word Game!</h1>
          <button onClick={startGame} className="start-button">
            Start Game
          </button>
        </div>
      ) : (
        <>
          <h1>Guess the Word Game</h1>
          <p className="dashes">{dashes}</p>
          <p>{guessesLeft} incorrect guesses left</p>
          <p>{message}</p>
          <Keyboard onGuess={handleGuess} />

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>{dashes === secretWord ? "Congratulations!" : "Game Over!"}</h2>
                <p>{message}</p>
                <button onClick={handleReplay}>Replay</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Game;
