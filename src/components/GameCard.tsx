import { useNavigate } from "react-router-dom";
import { Trophy, Clock, Target } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  highScore?: number;
  bestTime?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const GameCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  highScore, 
  bestTime,
  difficulty = 'medium'
}: GameCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="game-card cursor-pointer group"
      onClick={() => navigate(route)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {highScore && (
          <div className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            <span>{highScore.toLocaleString()}</span>
          </div>
        )}
        {bestTime && (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{bestTime}</span>
          </div>
        )}
        <div className="flex items-center gap-1 ml-auto">
          <Target className="w-3 h-3" />
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            difficulty === 'easy' ? 'bg-game-easy/20 text-game-easy' :
            difficulty === 'medium' ? 'bg-game-medium/20 text-game-medium' :
            'bg-game-hard/20 text-game-hard'
          }`}>
            {difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};