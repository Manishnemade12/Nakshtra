import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Play,
  Lock,
  Zap,
  Target,
  Clock,
  Users,
  Dna,
  Puzzle,
  Brain
} from "lucide-react";

export default function Games() {
  const games = [
    {
      id: 1,
      title: "DNA Builder",
      description: "Construct DNA sequences by matching complementary base pairs in this engaging puzzle game.",
      difficulty: "Beginner",
      duration: "15 min",
      players: "Single Player",
      progress: 85,
      locked: false,
      icon: Dna,
      color: "from-primary to-secondary-purple",
      category: "Puzzle"
    },
    {
      id: 2,
      title: "Punnett Square Master",
      description: "Solve genetic crosses and predict offspring ratios in this strategic thinking game.",
      difficulty: "Intermediate",
      duration: "20 min",
      players: "Single Player",
      progress: 62,
      locked: false,
      icon: Target,
      color: "from-secondary-purple to-accent-teal",
      category: "Strategy"
    },
    {
      id: 3,
      title: "Cell Division Race",
      description: "Race against time to complete mitosis and meiosis phases correctly.",
      difficulty: "Intermediate",
      duration: "25 min",
      players: "Multiplayer",
      progress: 0,
      locked: false,
      icon: Zap,
      color: "from-accent-teal to-primary",
      category: "Action"
    },
    {
      id: 4,
      title: "Gene Expression Lab",
      description: "Navigate the complex process from DNA to proteins in this simulation game.",
      difficulty: "Advanced",
      duration: "30 min",
      players: "Single Player",
      progress: 0,
      locked: true,
      icon: Brain,
      color: "from-primary to-accent-teal",
      category: "Simulation"
    },
    {
      id: 5,
      title: "Genetic Disorder Detective",
      description: "Analyze pedigrees and identify inheritance patterns to solve genetic mysteries.",
      difficulty: "Advanced",
      duration: "35 min",
      players: "Single Player",
      progress: 0,
      locked: true,
      icon: Puzzle,
      color: "from-secondary-purple to-primary",
      category: "Mystery"
    },
    {
      id: 6,
      title: "Evolution Simulator",
      description: "Guide species through evolutionary changes in this complex strategy game.",
      difficulty: "Expert",
      duration: "45 min",
      players: "Multiplayer",
      progress: 0,
      locked: true,
      icon: Trophy,
      color: "from-accent-teal to-secondary-purple",
      category: "Strategy"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", score: 2450, avatar: "AC" },
    { rank: 2, name: "Sarah Kim", score: 2380, avatar: "SK" },
    { rank: 3, name: "Mike Johnson", score: 2320, avatar: "MJ" },
    { rank: 4, name: "You", score: 2280, avatar: "YU", isCurrentUser: true },
    { rank: 5, name: "Emma Davis", score: 2190, avatar: "ED" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-orange-100 text-orange-700';
      case 'Expert': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-2 flex items-center">
            <Gamepad2 className="w-8 h-8 mr-3 text-accent-teal" />
            Learning Games
          </h1>
          <p className="text-muted-foreground">
            Master genetics through interactive games and challenges
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">2,280</div>
          <div className="text-sm text-muted-foreground">Your Score</div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Games Grid */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Card className={`glass p-6 h-full ${game.locked ? 'opacity-60' : 'hover:shadow-xl hover:scale-105'} smooth-transition neural-glow`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                      {game.locked ? (
                        <Lock className="w-6 h-6 text-white" />
                      ) : (
                        <game.icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="secondary" className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-accent-teal border-accent-teal">
                        {game.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold font-poppins mb-2">{game.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {game.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{game.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{game.players}</span>
                      </div>
                    </div>
                    
                    {game.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{game.progress}%</span>
                        </div>
                        <Progress value={game.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      game.locked 
                        ? 'bg-muted cursor-not-allowed' 
                        : `bg-gradient-to-r ${game.color} hover:scale-105`
                    } smooth-transition`}
                    disabled={game.locked}
                  >
                    {game.locked ? (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        {game.progress > 0 ? 'Continue' : 'Play Now'}
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-poppins flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-primary" />
                  Leaderboard
                </h3>
                <Badge variant="outline" className="text-primary border-primary">
                  Weekly
                </Badge>
              </div>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      player.isCurrentUser 
                        ? 'bg-gradient-to-r from-primary/10 to-accent-teal/10 border border-accent-teal/30' 
                        : 'hover:bg-muted/30'
                    } smooth-transition`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      player.rank === 1 ? 'bg-yellow-500 text-white' :
                      player.rank === 2 ? 'bg-gray-400 text-white' :
                      player.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {player.rank <= 3 ? <Trophy className="w-4 h-4" /> : player.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium text-sm ${player.isCurrentUser ? 'text-accent-teal' : ''}`}>
                          {player.name}
                        </span>
                        {player.isCurrentUser && (
                          <Badge variant="secondary" className="bg-accent-teal/20 text-accent-teal text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {player.score.toLocaleString()} points
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold font-poppins flex items-center">
                  <Star className="w-5 h-5 mr-2 text-secondary-purple" />
                  Daily Challenge
                </h3>
                <Badge className="bg-gradient-to-r from-secondary-purple to-accent-teal text-white">
                  +500 XP
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-secondary-purple/10 to-accent-teal/10 border border-secondary-purple/20">
                  <h4 className="font-semibold mb-2">Protein Synthesis Speed Run</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete the transcription and translation process in under 3 minutes.
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>⏱️ Best Time: 2:45</span>
                    <span>🎯 Target: 3:00</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-secondary-purple to-accent-teal hover:scale-105 smooth-transition">
                    Start Challenge
                  </Button>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  Resets in 18 hours 32 minutes
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}