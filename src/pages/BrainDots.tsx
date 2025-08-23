import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GameHeader } from "@/components/GameHeader";
import { useGameStorage } from "@/hooks/useGameStorage";
import { toast } from "sonner";

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Line {
  points: { x: number; y: number }[];
}

const BrainDots = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameData, settings, saveScore, toggleSound } = useGameStorage('braindots');
  
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const animationRef = useRef<number>();

  // Initialize level
  useEffect(() => {
    initializeLevel();
  }, [level]);

  const initializeLevel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setGameWon(false);
    setLines([]);
    
    // Create two balls based on level difficulty
    const ballRadius = 20;
    const margin = 50;
    
    setBalls([
      {
        x: margin + ballRadius,
        y: canvas.height / 2 - 100 + Math.random() * 50,
        vx: 0,
        vy: 0,
        radius: ballRadius,
        color: '#8b5cf6'
      },
      {
        x: canvas.width - margin - ballRadius,
        y: canvas.height / 2 + 100 + Math.random() * 50,
        vx: 0,
        vy: 0,
        radius: ballRadius,
        color: '#06b6d4'
      }
    ]);
  };

  // Physics simulation
  const updatePhysics = useCallback(() => {
    if (isPaused || gameWon) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    setBalls(prevBalls => {
      const newBalls = prevBalls.map(ball => {
        let { x, y, vx, vy } = ball;

        // Apply gravity
        vy += 0.5;

        // Apply velocity
        x += vx;
        y += vy;

        // Boundary collisions
        if (x - ball.radius <= 0 || x + ball.radius >= canvas.width) {
          vx = -vx * 0.8;
          x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, x));
        }
        if (y - ball.radius <= 0 || y + ball.radius >= canvas.height) {
          vy = -vy * 0.8;
          y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, y));
        }

        // Line collisions
        lines.forEach(line => {
          for (let i = 0; i < line.points.length - 1; i++) {
            const p1 = line.points[i];
            const p2 = line.points[i + 1];
            
            // Simple line collision detection
            const dist = distanceToLineSegment(x, y, p1.x, p1.y, p2.x, p2.y);
            if (dist < ball.radius + 2) {
              // Bounce off line
              const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
              const speed = Math.sqrt(vx * vx + vy * vy);
              vx = Math.cos(angle) * speed * 0.8;
              vy = Math.sin(angle) * speed * 0.8;
            }
          }
        });

        // Apply friction
        vx *= 0.99;
        vy *= 0.99;

        return { ...ball, x, y, vx, vy };
      });

      // Check collision between balls
      if (newBalls.length === 2) {
        const [ball1, ball2] = newBalls;
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball1.radius + ball2.radius && !gameWon) {
          // Balls collided!
          setGameWon(true);
          const points = Math.max(100 - lines.length * 10, 10);
          setScore(prev => prev + points);
          toast.success(`Level ${level} complete! +${points} points`);
          
          setTimeout(() => {
            setLevel(prev => prev + 1);
          }, 1500);
        }
      }

      return newBalls;
    });
  }, [isPaused, gameWon, lines, level]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updatePhysics();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updatePhysics]);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    lines.forEach(line => {
      if (line.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y);
        }
        ctx.stroke();
      }
    });

    // Draw current line
    if (currentLine && currentLine.points.length > 1) {
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(currentLine.points[0].x, currentLine.points[0].y);
      for (let i = 1; i < currentLine.points.length; i++) {
        ctx.lineTo(currentLine.points[i].x, currentLine.points[i].y);
      }
      ctx.stroke();
    }

    // Draw balls
    balls.forEach(ball => {
      const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
      gradient.addColorStop(0, ball.color);
      gradient.addColorStop(1, ball.color + '80');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = ball.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Victory effect
    if (gameWon) {
      ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Level Complete!', canvas.width / 2, canvas.height / 2);
    }
  };

  // Mouse/touch event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPaused || gameWon) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentLine({ points: [{ x, y }] });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isPaused || gameWon) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentLine(prev => {
      if (!prev) return null;
      return { points: [...prev.points, { x, y }] };
    });
  };

  const handleMouseUp = () => {
    if (currentLine && currentLine.points.length > 1) {
      setLines(prev => [...prev, currentLine]);
    }
    setIsDrawing(false);
    setCurrentLine(null);
  };

  const handleRestart = () => {
    setScore(0);
    setLevel(1);
    setLines([]);
    setGameWon(false);
    initializeLevel();
  };

  const handleBack = () => {
    if (score > gameData.highScore) {
      saveScore(score);
    }
    navigate('/');
  };

  // Utility function for line collision
  const distanceToLineSegment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader
        title="Brain Dots"
        score={score}
        bestScore={gameData.highScore}
        isPaused={isPaused}
        isSoundEnabled={settings.soundEnabled}
        onBack={handleBack}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onRestart={handleRestart}
        onToggleSound={toggleSound}
        extraInfo={`Level ${level} • Lines: ${lines.length}`}
      />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="game-grid p-4">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="border border-border/30 rounded-lg cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Draw lines to make the balls collide. Fewer lines = higher score!
          </div>
        </div>
      </div>

      {isPaused && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl border border-border/30 text-center">
            <h3 className="text-xl font-bold mb-4">Game Paused</h3>
            <button
              className="btn-neural"
              onClick={() => setIsPaused(false)}
            >
              Resume Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrainDots;