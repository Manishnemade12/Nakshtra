import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Clock, 
  Zap, 
  CheckCircle, 
  Circle,
  Star,
  Calendar,
  TrendingUp,
  Brain
} from "lucide-react";

interface StudyStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

interface StudyPlan {
  title: string;
  description: string;
  estimatedDuration: string;
  steps: StudyStep[];
  milestones: Milestone[];
  motivationalTips: string[];
}

interface OnboardingData {
  name: string;
  age: number;
  subject: string;
  goals: string;
  confidenceLevel: number;
  hoursPerWeek: number;
  preferredTime: string;
}

interface StudyDashboardProps {
  userData: OnboardingData;
  studyPlan: StudyPlan;
}

export function StudyDashboard1({ userData, studyPlan }: StudyDashboardProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set());
  
  const progressPercentage = (completedSteps.size / studyPlan.steps.length) * 100;
  const milestoneProgress = (completedMilestones.size / studyPlan.milestones.length) * 100;

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const toggleMilestone = (milestoneId: string) => {
    setCompletedMilestones(prev => {
      const newSet = new Set(prev);
      if (newSet.has(milestoneId)) {
        newSet.delete(milestoneId);
      } else {
        newSet.add(milestoneId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-secondary';
      case 'medium': return 'bg-progress';
      case 'hard': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const currentTip = studyPlan.motivationalTips[Math.floor(Math.random() * studyPlan.motivationalTips.length)];

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome back, {userData.name}! 🎓
          </h1>
          <p className="text-lg text-muted-foreground">
            Your personalized {userData.subject} learning journey
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <Progress value={progressPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-secondary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Steps</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSteps.size}/{studyPlan.steps.length}</div>
              <p className="text-xs mt-1">Keep going!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-motivation text-accent-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Milestones</CardTitle>
              <Trophy className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedMilestones.size}/{studyPlan.milestones.length}</div>
              <p className="text-xs mt-1">Achievements unlocked</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-progress text-progress-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.hoursPerWeek}h/week</div>
              <p className="text-xs mt-1">Scheduled</p>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Tip */}
        <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Daily Motivation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic">"{currentTip}"</p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roadmap">Study Roadmap</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {studyPlan.title}
                </CardTitle>
                <CardDescription>{studyPlan.description}</CardDescription>
                <Badge variant="outline" className="w-fit">
                  <Clock className="h-3 w-3 mr-1" />
                  {studyPlan.estimatedDuration}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {studyPlan.steps.map((step, index) => (
                  <Card key={step.id} className={`transition-all hover:shadow-medium ${completedSteps.has(step.id) ? 'bg-secondary/20' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStep(step.id)}
                          className="p-1 h-6 w-6"
                        >
                          {completedSteps.has(step.id) ? (
                            <CheckCircle className="h-4 w-4 text-secondary" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                            <Badge className={getDifficultyColor(step.difficulty)} variant="secondary">
                              {step.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.estimatedTime}
                            </Badge>
                          </div>
                          <h4 className={`font-semibold ${completedSteps.has(step.id) ? 'line-through text-muted-foreground' : ''}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4">
            <div className="grid gap-4">
              {studyPlan.milestones.map((milestone) => (
                <Card key={milestone.id} className={`transition-all hover:shadow-medium ${completedMilestones.has(milestone.id) ? 'bg-gradient-success/10 border-secondary' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMilestone(milestone.id)}
                        className="p-2"
                      >
                        {completedMilestones.has(milestone.id) ? (
                          <Trophy className="h-6 w-6 text-progress" />
                        ) : (
                          <Target className="h-6 w-6 text-muted-foreground" />
                        )}
                      </Button>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-lg font-semibold ${completedMilestones.has(milestone.id) ? 'text-secondary' : ''}`}>
                            {milestone.title}
                          </h3>
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {milestone.dueDate}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{milestone.description}</p>
                        {completedMilestones.has(milestone.id) && (
                          <div className="flex items-center gap-2 text-secondary">
                            <Star className="h-4 w-4" />
                            <span className="text-sm font-medium">Milestone achieved!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Your Study Schedule
                </CardTitle>
                <CardDescription>
                  Based on your preferences: {userData.hoursPerWeek} hours/week during {userData.preferredTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">{day}</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(userData.hoursPerWeek / 7) > 0 ? `${Math.floor(userData.hoursPerWeek / 7)}h` : '30m'} - {userData.preferredTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}