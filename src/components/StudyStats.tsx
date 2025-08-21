import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Timer, 
  Target, 
  Brain, 
  Zap,
  Award,
  BookOpen
} from "lucide-react";

interface StudyStats {
  totalHours: number;
  weeklyGoal: number;
  streak: number;
  completedSessions: number;
  averageSessionLength: number;
  favoriteSubject: string;
  productivity: number;
  achievements: string[];
}

export function StudyStats() {
  const [stats, setStats] = useState<StudyStats>({
    totalHours: 47.5,
    weeklyGoal: 20,
    streak: 12,
    completedSessions: 89,
    averageSessionLength: 32,
    favoriteSubject: "Mathematics",
    productivity: 87,
    achievements: ["7-Day Streak", "First Goal", "Night Owl", "Early Bird"]
  });

  const weeklyProgress = (stats.totalHours / stats.weeklyGoal) * 100;
  const productivityTrend = stats.productivity > 75 ? "high" : stats.productivity > 50 ? "medium" : "low";

  const getProductivityColor = () => {
    if (stats.productivity >= 80) return "text-success";
    if (stats.productivity >= 60) return "text-energy";
    return "text-destructive";
  };

  const getProductivityBadge = () => {
    if (stats.productivity >= 80) return "Excellent";
    if (stats.productivity >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Your Study Analytics
          </h2>
          <p className="text-xl text-muted-foreground">
            Track your learning progress and celebrate your achievements
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Hours */}
          <Card className="bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mb-4 mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Timer className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{stats.totalHours}h</div>
              <div className="text-sm text-muted-foreground">Total Study Time</div>
            </CardContent>
          </Card>

          {/* Current Streak */}
          <Card className="bg-gradient-card border-energy/20 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mb-4 mx-auto w-12 h-12 bg-gradient-energy rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-energy-foreground" />
              </div>
              <div className="text-3xl font-bold text-energy mb-1">{stats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          {/* Sessions Completed */}
          <Card className="bg-gradient-card border-success/20 hover:shadow-success transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mb-4 mx-auto w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-success-foreground" />
              </div>
              <div className="text-3xl font-bold text-success mb-1">{stats.completedSessions}</div>
              <div className="text-sm text-muted-foreground">Sessions Done</div>
            </CardContent>
          </Card>

          {/* Productivity Score */}
          <Card className="bg-gradient-card border-focus/20 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="mb-4 mx-auto w-12 h-12 bg-focus rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-focus-foreground" />
              </div>
              <div className={`text-3xl font-bold mb-1 ${getProductivityColor()}`}>
                {stats.productivity}%
              </div>
              <div className="text-sm text-muted-foreground">Productivity</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Progress */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">This Week</span>
                  <span className="text-sm text-muted-foreground">
                    {stats.totalHours}h / {stats.weeklyGoal}h
                  </span>
                </div>
                <Progress value={weeklyProgress} className="h-3" />
                <div className="text-center">
                  <Badge className={weeklyProgress >= 100 ? "bg-gradient-success" : "bg-gradient-primary"}>
                    {weeklyProgress >= 100 ? "Goal Achieved! 🎉" : `${Math.round(weeklyProgress)}% Complete`}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Insights */}
          <Card className="bg-gradient-card border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-success" />
                Study Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Favorite Subject:</span>
                  <Badge variant="outline">{stats.favoriteSubject}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg Session:</span>
                  <span className="text-sm font-medium">{stats.averageSessionLength} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Productivity Level:</span>
                  <Badge className={
                    stats.productivity >= 80 ? "bg-gradient-success" :
                    stats.productivity >= 60 ? "bg-gradient-energy" : "bg-destructive"
                  }>
                    {getProductivityBadge()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-gradient-card border-energy/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-energy" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {stats.achievements.map((achievement, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="justify-center py-2 text-xs"
                  >
                    🏆 {achievement}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Keep studying to unlock more achievements!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Quote */}
        <Card className="mt-8 bg-gradient-primary border-primary/20">
          <CardContent className="p-8 text-center">
            <blockquote className="text-xl font-medium text-primary-foreground mb-4">
              "The expert in anything was once a beginner who refused to give up."
            </blockquote>
            <p className="text-primary-foreground/80">
              You're making incredible progress! Every minute you study brings you closer to mastery.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}