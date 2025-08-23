import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GameHeader } from "@/components/GameHeader";
import { useGameStorage } from "@/hooks/useGameStorage";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

type Grid = (number | null)[][];
type Difficulty = 'easy' | 'medium' | 'hard';

const Sudoku = () => {
  const navigate = useNavigate();
  const { gameData, settings, saveScore, toggleSound } = useGameStorage('sudoku');
  
  const [grid, setGrid] = useState<Grid>(() => Array(9).fill(null).map(() => Array(9).fill(null)));
  const [initialGrid, setInitialGrid] = useState<Grid>(() => Array(9).fill(null).map(() => Array(9).fill(null)));
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isPaused, setIsPaused] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Generate a valid Sudoku puzzle
  const generatePuzzle = (difficulty: Difficulty) => {
    const fullGrid = generateCompleteGrid();
    const puzzle = removeCells(fullGrid, difficulty);
    return { puzzle, solution: fullGrid };
  };

  const generateCompleteGrid = (): Grid => {
    const grid: Grid = Array(9).fill(null).map(() => Array(9).fill(null));
    fillGrid(grid);
    return grid;
  };

  const fillGrid = (grid: Grid): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === null) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          
          for (const num of numbers) {
            if (isValidMove(grid, row, col, num)) {
              grid[row][col] = num;
              if (fillGrid(grid)) {
                return true;
              }
              grid[row][col] = null;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const removeCells = (grid: Grid, difficulty: Difficulty): Grid => {
    const puzzle = grid.map(row => [...row]);
    const cellsToRemove = {
      easy: 40,
      medium: 50,
      hard: 60
    }[difficulty];

    const cells: {row: number, col: number}[] = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        cells.push({row, col});
      }
    }

    cells.sort(() => Math.random() - 0.5);

    for (let i = 0; i < cellsToRemove && i < cells.length; i++) {
      const {row, col} = cells[i];
      puzzle[row][col] = null;
    }

    return puzzle;
  };

  const isValidMove = (grid: Grid, row: number, col: number, num: number): boolean => {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && grid[row][c] === num) return false;
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && grid[r][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && grid[r][c] === num) return false;
      }
    }

    return true;
  };

  const isComplete = (grid: Grid): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === null) return false;
      }
    }
    return true;
  };

  // Initialize new game
  const newGame = () => {
    const { puzzle } = generatePuzzle(difficulty);
    setGrid(puzzle);
    setInitialGrid(puzzle.map(row => [...row]));
    setScore(0);
    setStartTime(Date.now());
    setHintsUsed(0);
    setGameWon(false);
    setSelectedCell(null);
  };

  useEffect(() => {
    newGame();
  }, [difficulty]);

  const handleCellClick = (row: number, col: number) => {
    if (isPaused || gameWon) return;
    
    if (initialGrid[row][col] !== null) return; // Can't edit pre-filled cells
    
    setSelectedCell({row, col});
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || isPaused || gameWon) return;
    
    const {row, col} = selectedCell;
    if (initialGrid[row][col] !== null) return;

    const newGrid = grid.map(r => [...r]);
    
    if (newGrid[row][col] === num) {
      newGrid[row][col] = null; // Clear if same number
    } else {
      if (isValidMove(newGrid, row, col, num)) {
        newGrid[row][col] = num;
        const points = 10;
        setScore(prev => prev + points);
      } else {
        toast.error("Invalid move!");
        const penalty = 5;
        setScore(prev => Math.max(0, prev - penalty));
      }
    }

    setGrid(newGrid);

    // Check if game is complete
    if (isComplete(newGrid)) {
      setGameWon(true);
      const timeBonus = Math.max(1000 - Math.floor((Date.now() - startTime) / 1000), 0);
      const hintPenalty = hintsUsed * 50;
      const finalScore = score + timeBonus - hintPenalty;
      
      toast.success(`Puzzle solved! Time bonus: ${timeBonus}, Final score: ${finalScore}`);
      
      if (finalScore > gameData.highScore) {
        saveScore(finalScore);
        toast.success("New high score!");
      }
    }
  };

  const handleHint = () => {
    if (!selectedCell || isPaused || gameWon || hintsUsed >= 3) return;
    
    const {row, col} = selectedCell;
    if (initialGrid[row][col] !== null) return;

    // Find correct number for this cell
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(grid, row, col, num)) {
        const newGrid = grid.map(r => [...r]);
        newGrid[row][col] = num;
        setGrid(newGrid);
        setHintsUsed(prev => prev + 1);
        setScore(prev => Math.max(0, prev - 20)); // Penalty for hint
        toast.info("Hint used! -20 points");
        break;
      }
    }
  };

  const getCellStyle = (row: number, col: number) => {
    const isSelected = selectedCell?.row === row && selectedCell?.col === col;
    const isPrefilled = initialGrid[row][col] !== null;
    const isInvalid = grid[row][col] !== null && !isValidMove(
      grid.map((r, ri) => r.map((c, ci) => ri === row && ci === col ? null : c)),
      row,
      col,
      grid[row][col]!
    );

    let className = "w-10 h-10 flex items-center justify-center border border-border/30 cursor-pointer transition-all duration-200 text-sm font-medium ";
    
    if (isPrefilled) {
      className += "bg-muted text-foreground font-bold ";
    } else {
      className += "bg-card hover:bg-muted/50 ";
    }
    
    if (isSelected) {
      className += "ring-2 ring-primary bg-primary/10 ";
    }
    
    if (isInvalid) {
      className += "bg-red-500/20 text-red-400 ";
    }

    // Add thick borders for 3x3 boxes
    if (row % 3 === 0) className += "border-t-2 border-t-primary/50 ";
    if (col % 3 === 0) className += "border-l-2 border-l-primary/50 ";
    if (row === 8) className += "border-b-2 border-b-primary/50 ";
    if (col === 8) className += "border-r-2 border-r-primary/50 ";

    return className;
  };

  const handleRestart = () => {
    newGame();
  };

  const handleBack = () => {
    navigate('/');
  };

  const elapsedTime = useMemo(() => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  }, [startTime, score]); // Re-calculate when score changes

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader
        title="Sudoku"
        score={score}
        bestScore={gameData.highScore}
        isPaused={isPaused}
        isSoundEnabled={settings.soundEnabled}
        onBack={handleBack}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onRestart={handleRestart}
        onToggleSound={toggleSound}
        extraInfo={`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} • Time: ${elapsedTime}`}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
        {/* Difficulty selector */}
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map(level => (
            <Button
              key={level}
              variant={difficulty === level ? "default" : "outline"}
              size="sm"
              onClick={() => setDifficulty(level)}
              disabled={isPaused || gameWon}
              className={difficulty === level ? "btn-neural" : ""}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>

        <div className="game-grid p-6">
          {/* Sudoku Grid */}
          <div className="grid grid-cols-9 gap-0 mb-6 border-2 border-primary/50 rounded-lg overflow-hidden">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellStyle(rowIndex, colIndex)}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell || ''}
                </div>
              ))
            )}
          </div>

          {/* Number input */}
          <div className="grid grid-cols-5 gap-2 max-w-60 mx-auto mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                className="w-12 h-12 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                onClick={() => handleNumberInput(num)}
                disabled={!selectedCell || isPaused || gameWon}
              >
                {num}
              </button>
            ))}
            <button
              className="w-12 h-12 rounded-lg bg-muted hover:bg-red-500 hover:text-white transition-colors"
              onClick={() => selectedCell && handleNumberInput(0)}
              disabled={!selectedCell || isPaused || gameWon}
              title="Clear cell"
            >
              ✕
            </button>
          </div>

          {/* Hint button */}
          <div className="text-center">
            <button
              className="btn-neural flex items-center gap-2 mx-auto"
              onClick={handleHint}
              disabled={!selectedCell || isPaused || gameWon || hintsUsed >= 3}
              title="Get a hint (-20 points)"
            >
              <Lightbulb className="w-4 h-4" />
              Hint ({3 - hintsUsed} left)
            </button>
          </div>
        </div>
      </div>

      {(isPaused || gameWon) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl border border-border/30 text-center">
            <h3 className="text-xl font-bold mb-4">
              {gameWon ? 'Congratulations!' : 'Game Paused'}
            </h3>
            {gameWon && (
              <div className="text-muted-foreground mb-4 space-y-1">
                <p>Final Score: {score.toLocaleString()}</p>
                <p>Time: {elapsedTime}</p>
                <p>Hints Used: {hintsUsed}/3</p>
              </div>
            )}
            <div className="flex gap-2 justify-center">
              {!gameWon && (
                <button
                  className="btn-neural"
                  onClick={() => setIsPaused(false)}
                >
                  Resume
                </button>
              )}
              <button
                className="btn-neural"
                onClick={handleRestart}
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sudoku;