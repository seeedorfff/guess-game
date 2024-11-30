import React from "react";
import "./Keyboard.css";

const Keyboard = ({ onGuess }) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="keyboard">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          className="key"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
