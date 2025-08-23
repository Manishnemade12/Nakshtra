import { ArrowLeft, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  title: string;
  score: number;
  bestScore: number;
  isPaused: boolean;
  isSoundEnabled: boolean;
  onBack: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onToggleSound: () => void;
  extraInfo?: string;
}

export const GameHeader = ({
  title,
  score,
  bestScore,
  isPaused,
  isSoundEnabled,
  onBack,
  onPause,
  onResume,
  onRestart,
  onToggleSound,
  extraInfo
}: GameHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
          {extraInfo && (
            <p className="text-xs text-muted-foreground">{extraInfo}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-4 text-sm">
          <div className="score-display">
            <div className="text-xs text-muted-foreground">Score</div>
            <div className="font-bold text-primary">{score.toLocaleString()}</div>
          </div>
          <div className="score-display">
            <div className="text-xs text-muted-foreground">Best</div>
            <div className="font-bold text-accent">{bestScore.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={isSoundEnabled ? () => onToggleSound() : () => onToggleSound()}
            className="text-muted-foreground hover:text-foreground"
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRestart}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={isPaused ? onResume : onPause}
            className="text-muted-foreground hover:text-foreground"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};