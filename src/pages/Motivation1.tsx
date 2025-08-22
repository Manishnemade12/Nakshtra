import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Heart, 
  Star,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Quote,
  RefreshCw,
  Bookmark,
  Share,
  Play,
  Award
} from "lucide-react";

export default function Motivation() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [savedQuotes, setSavedQuotes] = useState<number[]>([]);

  const motivationalQuotes = [
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
      category: "Learning",
      color: "from-primary to-secondary-purple"
    },
    {
      text: "Science is not only a disciple of reason but also one of romance and passion.",
      author: "Stephen Hawking",
      category: "Science",
      color: "from-secondary-purple to-accent-teal"
    },
    {
      text: "In genetics, as in life, timing is everything.",
      author: "Dr. Francis Collins",
      category: "Genetics",
      color: "from-accent-teal to-primary"
    },
    {
      text: "DNA is like a computer program but far, far more advanced than any software ever created.",
      author: "Bill Gates",
      category: "Technology",
      color: "from-primary to-accent-teal"
    },
    {
      text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
      author: "Brian Herbert",
      category: "Growth",
      color: "from-secondary-purple to-primary"
    }
  ];

  const goals = [
    {
      title: "Complete DNA Module",
      progress: 75,
      target: "This Week",
      type: "Study Goal",
      icon: Target,
      color: "from-primary to-secondary-purple"
    },
    {
      title: "Study Streak",
      progress: 85,
      target: "14 Days",
      type: "Habit",
      icon: Calendar,
      color: "from-secondary-purple to-accent-teal"
    },
    {
      title: "Quiz Mastery",
      progress: 92,
      target: "90% Average",
      type: "Performance",
      icon: Star,
      color: "from-accent-teal to-primary"
    },
    {
      title: "Course Completion",
      progress: 45,
      target: "Genetics 101",
      type: "Milestone",
      icon: Trophy,
      color: "from-primary to-accent-teal"
    }
  ];

  const achievements = [
    {
      title: "First Steps",
      description: "Completed your first genetics lesson",
      date: "2 weeks ago",
      icon: Star,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      title: "Quiz Master",
      description: "Scored 100% on a genetics quiz",
      date: "1 week ago", 
      icon: Trophy,
      color: "from-primary to-secondary-purple"
    },
    {
      title: "Streak Warrior",
      description: "Maintained a 7-day study streak",
      date: "3 days ago",
      icon: Zap,
      color: "from-accent-teal to-primary"
    },
    {
      title: "Knowledge Seeker",
      description: "Asked 50+ questions to AI tutor",
      date: "Yesterday",
      icon: Heart,
      color: "from-secondary-purple to-accent-teal"
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, completed: true },
    { day: 'Tue', hours: 3.2, completed: true },
    { day: 'Wed', hours: 1.8, completed: true },
    { day: 'Thu', hours: 2.9, completed: true },
    { day: 'Fri', hours: 3.5, completed: true },
    { day: 'Sat', hours: 4.1, completed: true },
    { day: 'Sun', hours: 2.2, completed: false },
  ];

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
  };

  const toggleSaveQuote = (index: number) => {
    setSavedQuotes(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const totalHours = weeklyProgress.reduce((sum, day) => sum + day.hours, 0);
  const completedDays = weeklyProgress.filter(day => day.completed).length;

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold font-poppins mb-2 flex items-center">
          <Zap className="w-8 h-8 mr-3 text-accent-teal" />
          Motivation Hub
        </h1>
        <p className="text-muted-foreground">
          Stay inspired and track your learning journey
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="glass p-8 relative overflow-hidden">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="flex items-start justify-between mb-6">
                  <Quote className="w-12 h-12 text-accent-teal opacity-20" />
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaveQuote(currentQuote)}
                      className={savedQuotes.includes(currentQuote) ? 'text-accent-teal' : ''}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <blockquote className="text-2xl font-semibold font-poppins mb-6 leading-relaxed">
                  "{motivationalQuotes[currentQuote].text}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium mb-1">
                      — {motivationalQuotes[currentQuote].author}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${motivationalQuotes[currentQuote].color} text-white`}
                    >
                      {motivationalQuotes[currentQuote].category}
                    </Badge>
                  </div>
                  <Button
                    onClick={nextQuote}
                    className="bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal rounded-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Quote
                  </Button>
                </div>
              </motion.div>
              
              {/* Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${motivationalQuotes[currentQuote].color} opacity-5`} />
            </Card>
          </motion.div>

          {/* Goals Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold font-poppins flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Your Goals
                </h3>
                <Button variant="outline" size="sm">
                  Add Goal
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <Card className="p-4 hover:shadow-lg smooth-transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${goal.color} flex items-center justify-center`}>
                          <goal.icon className="w-5 h-5 text-white" />
                        </div>
                    <Badge variant="outline">
                      {goal.type}
                    </Badge>
                      </div>
                      
                      <h4 className="font-semibold mb-2">{goal.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{goal.target}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Weekly Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold font-poppins flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-secondary-purple" />
                  This Week's Progress
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{totalHours.toFixed(1)}h</div>
                  <div className="text-sm text-muted-foreground">Total Study Time</div>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weeklyProgress.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                    <div 
                      className={`h-20 rounded-lg flex items-end justify-center p-2 ${
                        day.completed 
                          ? 'bg-gradient-to-t from-primary to-secondary-purple' 
                          : 'bg-muted/30 border-2 border-dashed border-muted-foreground/30'
                      }`}
                    >
                      <div className={`text-xs font-bold ${day.completed ? 'text-white' : 'text-muted-foreground'}`}>
                        {day.hours}h
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center">
                <Badge className="bg-green-100 text-green-700">
                  {completedDays}/7 days completed
                </Badge>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold font-poppins mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">Study Streak</span>
                  </div>
                  <span className="text-lg font-bold text-primary">12 days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-secondary-purple" />
                    <span className="text-sm">Avg Quiz Score</span>
                  </div>
                  <span className="text-lg font-bold text-secondary-purple">89%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-accent-teal" />
                    <span className="text-sm">Achievements</span>
                  </div>
                  <span className="text-lg font-bold text-accent-teal">24</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Motivation Level</span>
                  </div>
                  <span className="text-lg font-bold text-red-500">High</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-poppins flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Recent Achievements
                </h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 smooth-transition"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
                        {achievement.description}
                      </p>
                      <span className="text-xs text-accent-teal">{achievement.date}</span>
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
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold font-poppins mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-secondary-purple" />
                Daily Challenge
              </h3>
              
              <div className="p-4 rounded-lg bg-gradient-to-r from-secondary-purple/10 to-accent-teal/10 border border-secondary-purple/20 mb-4">
                <h4 className="font-semibold mb-2">Study for 30 minutes</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete any genetics module to earn bonus XP
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium">22/30 min</span>
                </div>
                <Progress value={73} className="h-2 mb-3" />
                <Badge className="bg-secondary-purple text-white">
                  +50 XP Reward
                </Badge>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-secondary-purple to-accent-teal hover:scale-105 smooth-transition">
                <Play className="w-4 h-4 mr-2" />
                Continue Challenge
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}