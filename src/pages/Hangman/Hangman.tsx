import React, { useState, useRef, useEffect } from 'react';
import './Hangman.css';

const words = ['REACT', 'JAVASCRIPT', 'PROGRAMMING', 'DEVELOPER', 'HANGMAN'];

export const Hangman = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!selectedWord.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const renderWord = () => {
    return selectedWord.split('').map((letter, index) => {
      const isGuessed = guessedLetters.includes(letter);
      return (
        <span
          key={index}
          className={`letter ${isGuessed ? 'correct' : ''}`}
        >
          {isGuessed ? letter : '_'}
        </span>
      );
    });
  };

  const drawGallows = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(50, 150); // Base
    ctx.lineTo(150, 150);
    ctx.moveTo(100, 150); // Vertical post
    ctx.lineTo(100, 50);
    ctx.moveTo(100, 50); // Horizontal post
    ctx.lineTo(150, 50);
    if (wrongGuesses < 7) { // Draw rope only if the game is not lost
      ctx.moveTo(150, 50); // Rope
      ctx.lineTo(150, 70);
    }
    ctx.stroke();
  };

  const drawStickman = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'black';
    if (wrongGuesses >= 1) { // Head
      ctx.beginPath();
      ctx.arc(150, 80, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    if (wrongGuesses >= 2) { // Body
      ctx.beginPath();
      ctx.moveTo(150, 90);
      ctx.lineTo(150, 130);
      ctx.stroke();
    }
    if (wrongGuesses >= 3) { // Left Arm
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.lineTo(130, 110);
      ctx.stroke();
    }
    if (wrongGuesses >= 4) { // Right Arm
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.lineTo(170, 110);
      ctx.stroke();
    }
    if (wrongGuesses >= 5) { // Left Leg
      ctx.beginPath();
      ctx.moveTo(150, 130);
      ctx.lineTo(130, 150);
      ctx.stroke();
    }
    if (wrongGuesses >= 6) { // Right Leg
      ctx.beginPath();
      ctx.moveTo(150, 130);
      ctx.lineTo(170, 150);
      ctx.stroke();
    }
    if (wrongGuesses >= 7) { // Face
      alert('You lose! The word was: ' + selectedWord);
      startGame();
    }
  };

  const checkWinCondition = () => {
    return selectedWord.split('').every(letter => guessedLetters.includes(letter));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawGallows(ctx);
        drawStickman(ctx);
      }
    }

    if (checkWinCondition()) {
      alert('You Won!!!');
      startGame();
    }
  }, [wrongGuesses, guessedLetters]);

  return (
    <div className="hangman-container">
      <h2>Hangman Game</h2>
      <button onClick={startGame}>Start New Game</button>
      <canvas ref={canvasRef} width={200} height={200} />
      <div className="word">{renderWord()}</div>
      <div className="wrong-guesses">Wrong Guesses: {wrongGuesses}</div>
      <div className="alphabet">
        {Array.from(Array(26)).map((_, i) => {
          const letter = String.fromCharCode(65 + i);
          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}; 