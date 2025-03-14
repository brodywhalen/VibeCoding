interface Word {
  word: string;
  clue: string;
}

const wordList: Word[] = [
  { word: 'REACT', clue: 'Popular JavaScript library for building user interfaces' },
  { word: 'TYPESCRIPT', clue: 'JavaScript with syntax for types' },
  { word: 'COMPONENT', clue: 'Reusable piece of UI in React' },
  { word: 'HOOK', clue: 'Function that lets you use state in React' },
  { word: 'STATE', clue: 'Data that changes over time in an application' },
  { word: 'PROPS', clue: 'Data passed from parent to child component' },
  { word: 'ROUTER', clue: 'Handles navigation in a web application' },
  { word: 'API', clue: 'Interface for different software to communicate' },
  { word: 'DOM', clue: 'Tree-like structure of HTML elements' },
  { word: 'CSS', clue: 'Styles web pages' },
  { word: 'FUNCTION', clue: 'A block of code designed to perform a particular task' },
  { word: 'VARIABLE', clue: 'A named storage for data' },
  { word: 'OBJECT', clue: 'A collection of properties' },
  { word: 'ARRAY', clue: 'A collection of items stored at contiguous memory locations' },
  { word: 'LOOP', clue: 'A sequence of instructions that is continually repeated' },
  { word: 'DEBUG', clue: 'To identify and remove errors from computer hardware or software' },
  { word: 'ALGORITHM', clue: 'A process or set of rules to be followed in calculations' },
  { word: 'CONDITIONAL', clue: 'A statement that controls the flow of execution based on a condition' },
  { word: 'PARAMETER', clue: 'A variable used to pass information between functions' },
  { word: 'SYNTACTIC', clue: 'Relating to the arrangement of words and phrases' },
  { word: 'ENCAPSULATION', clue: 'The bundling of data with the methods that operate on that data' },
  // Add more words and clues as needed
];

export const generateCrossword = () => {
  const gridSize = 15; // Grid size
  const grid: { letter: string; number?: number; isActive: boolean; userInput: string }[][] = 
    Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(null).map(() => ({
        letter: '',
        isActive: false,
        userInput: ''
      }))
    );

  const clues: { number: number; clue: string; answer: string; direction: 'across' | 'down' }[] = [];
  let clueNumber = 1;

  // Filter words that fit in the grid (3 to 10 letters)
  const validWords = wordList.filter(word => word.word.length >= 3 && word.word.length <= 10);
  const shuffledWords = [...validWords].sort(() => Math.random() - 0.5);
  const selectedWords = shuffledWords.slice(0, 6); // Use 6 words

  // Place words horizontally
  selectedWords.slice(0, 3).forEach((wordObj, index) => {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * (gridSize - wordObj.word.length));

    // Check if word fits horizontally
    if (col + wordObj.word.length <= gridSize) {
      let canPlace = true;
      for (let i = 0; i < wordObj.word.length; i++) {
        if (grid[row][col + i].isActive) {
          canPlace = false; // Cell is already occupied
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < wordObj.word.length; i++) {
          grid[row][col + i] = {
            letter: wordObj.word[i],
            isActive: true,
            userInput: '',
            ...(i === 0 ? { number: clueNumber } : {})
          };
        }

        clues.push({
          number: clueNumber,
          clue: wordObj.clue,
          answer: wordObj.word,
          direction: 'across'
        });

        clueNumber++;
      }
    }
  });

  // Place words vertically
  selectedWords.slice(3).forEach((wordObj, index) => {
    const row = Math.floor(Math.random() * (gridSize - wordObj.word.length));
    const col = Math.floor(Math.random() * gridSize);

    // Check if word fits vertically
    if (row + wordObj.word.length <= gridSize) {
      let canPlace = true;
      for (let i = 0; i < wordObj.word.length; i++) {
        if (grid[row + i][col].isActive) {
          canPlace = false; // Cell is already occupied
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < wordObj.word.length; i++) {
          grid[row + i][col] = {
            letter: wordObj.word[i],
            isActive: true,
            userInput: '',
            ...(i === 0 ? { number: clueNumber } : {})
          };
        }

        clues.push({
          number: clueNumber,
          clue: wordObj.clue,
          answer: wordObj.word,
          direction: 'down'
        });

        clueNumber++;
      }
    }
  });

  return { grid, clues };
}; 