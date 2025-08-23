import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameHeader } from "@/components/GameHeader";
import { useGameStorage } from "@/hooks/useGameStorage";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SkipForward } from "lucide-react";

interface Block {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isTarget: boolean;
  orientation: 'horizontal' | 'vertical';
}

const GRID_SIZE = 6;
const CELL_SIZE = 50;

const UnblockMe = () => {
  const navigate = useNavigate();
  const { gameData, settings, saveScore, toggleSound } = useGameStorage('unblock');
  
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Level configurations
  const levels = [
    // Level 1 - Easy
    [
      { id: 1, x: 1, y: 2, width: 2, height: 1, color: '#ef4444', isTarget: true, orientation: 'horizontal' as const },
      { id: 2, x: 0, y: 0, width: 1, height: 2, color: '#3b82f6', isTarget: false, orientation: 'vertical' as const },
      { id: 3, x: 3, y: 0, width: 1, height: 3, color: '#10b981', isTarget: false, orientation: 'vertical' as const },
      { id: 4, x: 1, y: 4, width: 2, height: 1, color: '#f59e0b', isTarget: false, orientation: 'horizontal' as const },
    ],
    // Level 2 - Medium
    [
      { id: 1, x: 1, y: 2, width: 2, height: 1, color: '#ef4444', isTarget: true, orientation: 'horizontal' as const },
      { id: 2, x: 0, y: 0, width: 1, height: 2, color: '#3b82f6', isTarget: false, orientation: 'vertical' as const },
      { id: 3, x: 1, y: 0, width: 2, height: 1, color: '#10b981', isTarget: false, orientation: 'horizontal' as const },
      { id: 4, x: 4, y: 0, width: 1, height: 2, color: '#f59e0b', isTarget: false, orientation: 'vertical' as const },
      { id: 5, x: 0, y: 3, width: 2, height: 1, color: '#8b5cf6', isTarget: false, orientation: 'horizontal' as const },
      { id: 6, x: 3, y: 3, width: 1, height: 2, color: '#06b6d4', isTarget: false, orientation: 'vertical' as const },
    ],
    // Level 3 - Hard
    [
      { id: 1, x: 2, y: 2, width: 2, height: 1, color: '#ef4444', isTarget: true, orientation: 'horizontal' as const },
      { id: 2, x: 0, y: 0, width: 1, height: 3, color: '#3b82f6', isTarget: false, orientation: 'vertical' as const },
      { id: 3, x: 1, y: 0, width: 1, height: 2, color: '#10b981', isTarget: false, orientation: 'vertical' as const },
      { id: 4, x: 2, y: 0, width: 2, height: 1, color: '#f59e0b', isTarget: false, orientation: 'horizontal' as const },
      { id: 5, x: 5, y: 0, width: 1, height: 3, color: '#8b5cf6', isTarget: false, orientation: 'vertical' as const },
      { id: 6, x: 1, y: 3, width: 1, height: 2, color: '#06b6d4', isTarget: false, orientation: 'vertical' as const },
      { id: 7, x: 2, y: 4, width: 3, height: 1, color: '#f97316', isTarget: false, orientation: 'horizontal' as const },
    ]
  ];

  // Initialize level
  useEffect(() => {
    if (level <= levels.length) {
      setBlocks([...levels[level - 1]]);
      setMoves(0);
      setGameWon(false);
    }
  }, [level]);

  // Check if position is valid for a block
  const isValidPosition = (block: Block, newX: number, newY: number, excludeId: number): boolean => {
    // Check boundaries
    if (newX < 0 || newY < 0 || newX + block.width > GRID_SIZE || newY + block.height > GRID_SIZE) {
      return false;
    }

    // Check collision with other blocks
    return !blocks.some(otherBlock => {
      if (otherBlock.id === excludeId) return false;
      
      return !(
        newX >= otherBlock.x + otherBlock.width ||
        newX + block.width <= otherBlock.x ||
        newY >= otherBlock.y + otherBlock.height ||
        newY + block.height <= otherBlock.y
      );
    });
  };

  // Handle mouse down on block
  const handleMouseDown = (e: React.MouseEvent, blockId: number) => {
    if (isPaused || gameWon) return;
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    
    setDraggedBlock(blockId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    e.preventDefault();
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedBlock === null || isPaused || gameWon) return;
    
    const gameArea = e.currentTarget.getBoundingClientRect();
    const block = blocks.find(b => b.id === draggedBlock);
    if (!block) return;

    const mouseX = e.clientX - gameArea.left - dragOffset.x;
    const mouseY = e.clientY - gameArea.top - dragOffset.y;
    
    let newX = Math.round(mouseX / CELL_SIZE);
    let newY = Math.round(mouseY / CELL_SIZE);

    // Constrain movement based on orientation
    if (block.orientation === 'horizontal') {
      newY = block.y; // Can't move vertically
    } else {
      newX = block.x; // Can't move horizontally
    }

    // Check if new position is valid
    if (isValidPosition(block, newX, newY, draggedBlock)) {
      setBlocks(prev => prev.map(b => 
        b.id === draggedBlock ? { ...b, x: newX, y: newY } : b
      ));
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    if (draggedBlock !== null) {
      setMoves(prev => prev + 1);
      
      // Check if target block reached the exit
      const targetBlock = blocks.find(b => b.isTarget);
      if (targetBlock && targetBlock.x + targetBlock.width === GRID_SIZE) {
        setGameWon(true);
        const score = Math.max(100 - moves * 5, 10); // Better score for fewer moves
        
        toast.success(`Level ${level} completed in ${moves + 1} moves! +${score} points`);
        
        if (level < levels.length) {
          setTimeout(() => {
            setLevel(prev => prev + 1);
          }, 2000);
        } else {
          toast.success("Congratulations! All levels completed!");
          saveScore(score);
        }
      }
    }
    
    setDraggedBlock(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleRestart = () => {
    setLevel(1);
    setMoves(0);
    setGameWon(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  const nextLevel = () => {
    if (level < levels.length) {
      setLevel(prev => prev + 1);
    } else {
      setLevel(1); // Loop back to first level
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader
        title="Unblock Me"
        score={moves > 0 ? Math.max(100 - moves * 5, 10) : 100}
        bestScore={gameData.highScore}
        isPaused={isPaused}
        isSoundEnabled={settings.soundEnabled}
        onBack={handleBack}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onRestart={handleRestart}
        onToggleSound={toggleSound}
        extraInfo={`Level ${level}/${levels.length} • Moves: ${moves}`}
      />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="game-grid p-6">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-medium mb-2">Move the red block to the exit →</h3>
            <p className="text-sm text-muted-foreground">
              Drag blocks horizontally or vertically to clear the path
            </p>
          </div>

          {/* Game Grid */}
          <div
            className="relative bg-card/50 border-2 border-border/30 rounded-xl"
            style={{
              width: GRID_SIZE * CELL_SIZE + 20,
              height: GRID_SIZE * CELL_SIZE + 20,
              padding: 10
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Grid background */}
            {Array.from({ length: GRID_SIZE }).map((_, row) =>
              Array.from({ length: GRID_SIZE }).map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className="absolute border border-border/20"
                  style={{
                    left: col * CELL_SIZE,
                    top: row * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE
                  }}
                />
              ))
            )}

            {/* Exit indicator */}
            <div
              className="absolute bg-primary/20 border-2 border-primary border-dashed rounded-lg flex items-center justify-center text-primary font-bold"
              style={{
                left: (GRID_SIZE - 1) * CELL_SIZE,
                top: 2 * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE
              }}
            >
              →
            </div>

            {/* Blocks */}
            {blocks.map(block => (
              <div
                key={block.id}
                className={`absolute rounded-lg cursor-move transition-all duration-200 flex items-center justify-center font-bold text-white ${
                  draggedBlock === block.id ? 'scale-105 shadow-lg z-10' : 'hover:scale-102'
                } ${block.isTarget ? 'shadow-lg ring-2 ring-white/20' : ''}`}
                style={{
                  left: block.x * CELL_SIZE + 2,
                  top: block.y * CELL_SIZE + 2,
                  width: block.width * CELL_SIZE - 4,
                  height: block.height * CELL_SIZE - 4,
                  backgroundColor: block.color,
                  boxShadow: block.isTarget ? `0 0 20px ${block.color}40` : undefined
                }}
                onMouseDown={(e) => handleMouseDown(e, block.id)}
              >
                {block.isTarget && (
                  <span className="text-xs font-bold">TARGET</span>
                )}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="text-center text-sm text-muted-foreground">
              Current Score: {moves > 0 ? Math.max(100 - moves * 5, 10) : 100} points
            </div>
            
            {level < levels.length && (
              <Button
                variant="outline"
                size="sm"
                onClick={nextLevel}
                className="flex items-center gap-2"
                disabled={isPaused}
              >
                <SkipForward className="w-4 h-4" />
                Skip Level
              </Button>
            )}
          </div>
        </div>
      </div>

      {(isPaused || gameWon) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl border border-border/30 text-center">
            <h3 className="text-xl font-bold mb-4">
              {gameWon ? 'Level Complete!' : 'Game Paused'}
            </h3>
            {gameWon && (
              <div className="text-muted-foreground mb-4 space-y-1">
                <p>Completed in {moves} moves</p>
                <p>Score: {Math.max(100 - moves * 5, 10)} points</p>
                {level === levels.length && (
                  <p className="text-primary font-medium">All levels completed! 🎉</p>
                )}
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
              {gameWon && level < levels.length && (
                <button
                  className="btn-neural"
                  onClick={() => setGameWon(false)}
                >
                  Continue
                </button>
              )}
              <button
                className="btn-neural"
                onClick={handleRestart}
              >
                {gameWon && level === levels.length ? 'Play Again' : 'Restart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnblockMe;