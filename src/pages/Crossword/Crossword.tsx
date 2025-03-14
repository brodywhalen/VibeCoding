import { useState, useEffect } from 'react';
import { generateCrossword } from './crosswordGenerator';
import './Crossword.css';

interface CrosswordCell {
  letter: string;
  number?: number;
  isActive: boolean;
  userInput: string;
}

interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  direction: 'across' | 'down';
}

export const Crossword = () => {
  const [grid, setGrid] = useState<CrosswordCell[][]>([]);
  const [clues, setClues] = useState<CrosswordClue[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('crosswordScore');
    return saved ? parseInt(saved) : 0;
  });

  const initializeNewPuzzle = () => {
    const { grid: newGrid, clues: newClues } = generateCrossword();
    setGrid(newGrid);
    setClues(newClues);
    setSelectedCell(null);
  };

  useEffect(() => {
    initializeNewPuzzle();
  }, []);

  useEffect(() => {
    localStorage.setItem('crosswordScore', score.toString());
  }, [score]);

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col].isActive) {
      setSelectedCell({ row, col });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent, row: number, col: number) => {
    if (!grid[row][col].isActive) return;

    if (/^[A-Za-z]$/.test(event.key)) {
      const newGrid = [...grid];
      newGrid[row][col] = {
        ...newGrid[row][col],
        userInput: event.key.toUpperCase(),
      };
      setGrid(newGrid);

      // Move to next cell if possible
      const nextCell = findNextCell(row, col);
      if (nextCell) {
        setSelectedCell(nextCell);
      }
    } else if (event.key === 'Backspace') {
      const newGrid = [...grid];
      newGrid[row][col] = {
        ...newGrid[row][col],
        userInput: '',
      };
      setGrid(newGrid);

      // Move to previous cell if possible
      const prevCell = findPreviousCell(row, col);
      if (prevCell) {
        setSelectedCell(prevCell);
      }
    }
  };

  const findNextCell = (row: number, col: number): { row: number; col: number } | null => {
    // Implementation to find next active cell
    // This is a simple right-to-left, top-to-bottom implementation
    for (let c = col + 1; c < grid[row].length; c++) {
      if (grid[row][c].isActive) return { row, col: c };
    }
    for (let r = row + 1; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c].isActive) return { row: r, col: c };
      }
    }
    return null;
  };

  const findPreviousCell = (row: number, col: number): { row: number; col: number } | null => {
    // Implementation to find previous active cell
    for (let c = col - 1; c >= 0; c--) {
      if (grid[row][c].isActive) return { row, col: c };
    }
    for (let r = row - 1; r >= 0; r--) {
      for (let c = grid[r].length - 1; c >= 0; c--) {
        if (grid[r][c].isActive) return { row: r, col: c };
      }
    }
    return null;
  };

  const handleSubmit = () => {
    // Check if all answers are correct
    let isCorrect = true;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col].isActive && grid[row][col].userInput !== grid[row][col].letter) {
          isCorrect = false;
          break;
        }
      }
      if (!isCorrect) break;
    }

    if (isCorrect) {
      setScore(prev => prev + 1);
      alert('Congratulations! You solved the puzzle!');
      initializeNewPuzzle();
    } else {
      alert('Some answers are incorrect. Keep trying!');
    }
  };

  return (
    <div className="crossword-container">
      <div className="crossword-header">
        <h2>Crossword Puzzle</h2>
        <div className="score">Score: {score}</div>
      </div>

      <div className="crossword-content">
        <div className="crossword-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="crossword-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`crossword-cell ${cell.isActive ? 'active' : 'inactive'} ${
                    selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'selected' : ''
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  tabIndex={cell.isActive ? 0 : -1}
                  onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
                >
                  {cell.number && <span className="cell-number">{cell.number}</span>}
                  {cell.isActive ? cell.userInput : ''}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="clues-container">
          <div className="clues-section">
            <h3>Across</h3>
            {clues
              .filter((clue) => clue.direction === 'across')
              .map((clue) => (
                <div key={`across-${clue.number}`} className="clue">
                  <span className="clue-number">{clue.number}.</span> {clue.clue}
                </div>
              ))}
          </div>

          <div className="clues-section">
            <h3>Down</h3>
            {clues
              .filter((clue) => clue.direction === 'down')
              .map((clue) => (
                <div key={`down-${clue.number}`} className="clue">
                  <span className="clue-number">{clue.number}.</span> {clue.clue}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="crossword-controls">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="new-puzzle-button" onClick={initializeNewPuzzle}>
          New Puzzle
        </button>
      </div>
    </div>
  );
}; 