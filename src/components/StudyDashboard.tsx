import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Timer, 
  Trophy, 
  BookOpen, 
  Zap, 
  TrendingUp,
  Calendar
} from "lucide-react";

interface StudySession {
  subject: string;
  duration: number;
  progress: number;
  streak: number;
}

const mockSessions: StudySession[] = [
  { subject: "Mathematics", duration: 45, progress: 75, streak: 5 },
  { subject: "Physics", duration: 30, progress: 60, streak: 3 },
  { subject: "Chemistry", duration: 60, progress: 90, streak: 7 },
];

export function StudyDashboard() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Your Study Command Center</h2>
          <p className="text-xl text-muted-foreground">
            AI-powered insights to supercharge your learning
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-primary rounded-full">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">12.5</p>
                  <p className="text-sm text-muted-foreground">Hours This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-success/20 hover:shadow-success transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-success rounded-full">
                  <Target className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">85%</p>
                  <p className="text-sm text-muted-foreground">Goal Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-energy/20 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-energy rounded-full">
                  <Trophy className="h-6 w-6 text-energy-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-energy">15</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-focus/20 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-focus rounded-full">
                  <TrendingUp className="h-6 w-6 text-focus-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-focus">+23%</p>
                  <p className="text-sm text-muted-foreground">Productivity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Study Sessions */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Active Study Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockSessions.map((session, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{session.subject}</h4>
                          <Badge variant="secondary">
                            <Timer className="w-3 h-3 mr-1" />
                            {session.duration}min
                          </Badge>
                          <Badge className="bg-gradient-energy text-energy-foreground">
                            <Zap className="w-3 h-3 mr-1" />
                            {session.streak} day streak
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">Continue</Button>
                      </div>
                      <Progress 
                        value={session.progress} 
                        className="h-2 bg-secondary"
                      />
                      <p className="text-sm text-muted-foreground">
                        {session.progress}% complete
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Motivation Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Motivation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-primary rounded-lg">
                    <p className="text-primary-foreground font-medium">
                      "Your consistency in Mathematics is impressive! Keep up the momentum."
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-success hover:shadow-success">
                    Get New Motivation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-success" />
                  Today's Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                    <span>Physics Review</span>
                    <Badge>2:00 PM</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                    <span>Math Practice</span>
                    <Badge>4:30 PM</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}