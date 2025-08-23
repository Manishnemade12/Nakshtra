import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GameHeader } from "@/components/GameHeader";
import { useGameStorage } from "@/hooks/useGameStorage";
import { toast } from "sonner";

type Grid = (number | null)[][];

const Game2048 = () => {
  const navigate = useNavigate();
  const { gameData, settings, saveScore, toggleSound } = useGameStorage('2048');
  
  const [grid, setGrid] = useState<Grid>(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  function initializeGrid(): Grid {
    const newGrid: Grid = Array(4).fill(null).map(() => Array(4).fill(null));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    return newGrid;
  }

  function addRandomTile(grid: Grid) {
    const emptyCells: {row: number, col: number}[] = [];
    
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === null) {
          emptyCells.push({row, col});
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const moveLeft = (grid: Grid): { newGrid: Grid, scoreGained: number, moved: boolean } => {
    const newGrid = grid.map(row => [...row]);
    let scoreGained = 0;
    let moved = false;

    for (let row = 0; row < 4; row++) {
      const filteredRow = newGrid[row].filter(cell => cell !== null) as number[];
      const newRow: (number | null)[] = [...Array(4)].map(() => null);
      
      let col = 0;
      for (let i = 0; i < filteredRow.length; i++) {
        if (i < filteredRow.length - 1 && filteredRow[i] === filteredRow[i + 1]) {
          // Merge tiles
          newRow[col] = filteredRow[i] * 2;
          scoreGained += filteredRow[i] * 2;
          if (newRow[col] === 2048 && !won) {
            setWon(true);
            toast.success("Congratulations! You reached 2048!");
          }
          i++; // Skip the next tile as it's merged
        } else {
          newRow[col] = filteredRow[i];
        }
        col++;
      }
      
      // Check if row changed
      for (let c = 0; c < 4; c++) {
        if (newGrid[row][c] !== newRow[c]) {
          moved = true;
        }
      }
      
      newGrid[row] = newRow;
    }

    return { newGrid, scoreGained, moved };
  };

  const rotateGrid = (grid: Grid): Grid => {
    const newGrid: Grid = Array(4).fill(null).map(() => Array(4).fill(null));
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        newGrid[col][3 - row] = grid[row][col];
      }
    }
    return newGrid;
  };

  const move = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    if (isPaused || gameOver) return;

    let currentGrid = [...grid.map(row => [...row])];
    let rotations = 0;

    // Rotate grid to make all directions work like left
    switch (direction) {
      case 'right':
        rotations = 2;
        break;
      case 'up':
        rotations = 3;
        break;
      case 'down':
        rotations = 1;
        break;
    }

    for (let i = 0; i < rotations; i++) {
      currentGrid = rotateGrid(currentGrid);
    }

    const { newGrid, scoreGained, moved } = moveLeft(currentGrid);

    // Rotate back
    let finalGrid = newGrid;
    for (let i = 0; i < (4 - rotations) % 4; i++) {
      finalGrid = rotateGrid(finalGrid);
    }

    if (moved) {
      addRandomTile(finalGrid);
      setGrid(finalGrid);
      setScore(prev => prev + scoreGained);

      // Check for game over
      if (!canMove(finalGrid)) {
        setGameOver(true);
        toast.error("Game Over! No more moves available.");
        if (score + scoreGained > gameData.highScore) {
          saveScore(score + scoreGained);
          toast.success("New high score!");
        }
      }
    }
  }, [grid, isPaused, gameOver, score, gameData.highScore, saveScore, won]);

  const canMove = (grid: Grid): boolean => {
    // Check for empty cells
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === null) return true;
      }
    }

    // Check for possible merges
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const current = grid[row][col];
        if (
          (col < 3 && current === grid[row][col + 1]) ||
          (row < 3 && current === grid[row + 1][col])
        ) {
          return true;
        }
      }
    }

    return false;
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          move('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          move('right');
          break;
        case 'ArrowUp':
          event.preventDefault();
          move('up');
          break;
        case 'ArrowDown':
          event.preventDefault();
          move('down');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [move]);

  const handleRestart = () => {
    setGrid(initializeGrid());
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const handleBack = () => {
    if (score > gameData.highScore) {
      saveScore(score);
    }
    navigate('/');
  };

  const getTileColor = (value: number | null) => {
    if (!value) return 'bg-muted/30';
    
    const colors: {[key: number]: string} = {
      2: 'bg-slate-200 text-slate-800',
      4: 'bg-slate-300 text-slate-800',
      8: 'bg-orange-300 text-white',
      16: 'bg-orange-400 text-white',
      32: 'bg-orange-500 text-white',
      64: 'bg-red-400 text-white',
      128: 'bg-yellow-400 text-white',
      256: 'bg-yellow-500 text-white',
      512: 'bg-yellow-600 text-white',
      1024: 'bg-yellow-700 text-white',
      2048: 'bg-primary text-primary-foreground animate-neural-pulse'
    };

    return colors[value] || 'bg-primary text-primary-foreground';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader
        title="2048"
        score={score}
        bestScore={gameData.highScore}
        isPaused={isPaused}
        isSoundEnabled={settings.soundEnabled}
        onBack={handleBack}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onRestart={handleRestart}
        onToggleSound={toggleSound}
        extraInfo={won ? "You won! Keep going!" : "Merge tiles to reach 2048!"}
      />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="game-grid p-6">
          <div className="grid grid-cols-4 gap-3 mb-6" style={{ width: '320px', height: '320px' }}>
            {grid.flat().map((cell, index) => (
              <div
                key={index}
                className={`rounded-lg flex items-center justify-center font-bold text-xl transition-all duration-200 ${getTileColor(cell)}`}
                style={{ aspectRatio: '1' }}
              >
                {cell || ''}
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              Use arrow keys or swipe to move tiles
            </div>
            
            <div className="grid grid-cols-2 gap-2 max-w-48 mx-auto md:hidden">
              <button
                className="col-start-2 btn-neural py-2 px-4 text-sm"
                onClick={() => move('up')}
              >
                ↑
              </button>
              <button
                className="btn-neural py-2 px-4 text-sm"
                onClick={() => move('left')}
              >
                ←
              </button>
              <button
                className="btn-neural py-2 px-4 text-sm"
                onClick={() => move('right')}
              >
                →
              </button>
              <button
                className="col-start-2 btn-neural py-2 px-4 text-sm"
                onClick={() => move('down')}
              >
                ↓
              </button>
            </div>
          </div>
        </div>
      </div>

      {(isPaused || gameOver) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl border border-border/30 text-center">
            <h3 className="text-xl font-bold mb-4">
              {gameOver ? 'Game Over!' : 'Game Paused'}
            </h3>
            {gameOver && (
              <p className="text-muted-foreground mb-4">
                Final Score: {score.toLocaleString()}
              </p>
            )}
            <div className="flex gap-2">
              {!gameOver && (
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
                {gameOver ? 'New Game' : 'Restart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game2048;