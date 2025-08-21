import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Target, 
  Plus, 
  CheckCircle, 
  Clock, 
  Brain,
  Trash2,
  Edit
} from "lucide-react";
import { studyBuddy } from "@/lib/gemini1";
import { useToast } from "@/hooks/use-toast";

interface StudyGoal {
  id: string;
  subject: string;
  goal: string;
  targetHours: number;
  completedHours: number;
  deadline: string;
  priority: "high" | "medium" | "low";
  aiPlan: string[];
}

export function StudyPlanner() {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [newGoal, setNewGoal] = useState({
    subject: "",
    goal: "",
    targetHours: 10,
    deadline: "",
    priority: "medium" as const
  });
  const [planLoading, setPlanLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved goals from localStorage
    const savedGoals = localStorage.getItem('studyGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    // Save goals to localStorage whenever they change
    localStorage.setItem('studyGoals', JSON.stringify(goals));
  }, [goals]);

  const generateAIPlan = async (subjects: string[], totalHours: number) => {
    setPlanLoading(true);
    try {
      const plan = await studyBuddy.generateStudyPlan(subjects, totalHours);
      return plan;
    } catch (error) {
      console.error("Failed to generate AI plan:", error);
      return [
        "Break down topics into manageable chunks",
        "Use active recall and spaced repetition",
        "Take regular breaks to maintain focus",
        "Practice with real examples and problems",
        "Review and summarize key concepts daily"
      ];
    } finally {
      setPlanLoading(false);
    }
  };

  const addGoal = async () => {
    if (!newGoal.subject || !newGoal.goal || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const aiPlan = await generateAIPlan([newGoal.subject], newGoal.targetHours);

    const goal: StudyGoal = {
      id: Date.now().toString(),
      ...newGoal,
      completedHours: 0,
      aiPlan
    };

    setGoals([...goals, goal]);
    setNewGoal({
      subject: "",
      goal: "",
      targetHours: 10,
      deadline: "",
      priority: "medium"
    });

    toast({
      title: "Goal Added! 🎯",
      description: "Your AI study plan has been generated.",
    });
  };

  const updateProgress = (goalId: string, hoursToAdd: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completedHours: Math.min(goal.completedHours + hoursToAdd, goal.targetHours) }
        : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    toast({
      title: "Goal Removed",
      description: "Study goal has been deleted.",
    });
  };

  const getProgressPercentage = (goal: StudyGoal) => {
    return (goal.completedHours / goal.targetHours) * 100;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive";
      case "medium": return "bg-energy";
      case "low": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Smart Study Planner
          </h2>
          <p className="text-xl text-muted-foreground">
            Set goals, track progress, and get AI-generated study plans
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add New Goal */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-primary/20 sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Add Study Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics, Physics..."
                    value={newGoal.subject}
                    onChange={(e) => setNewGoal({...newGoal, subject: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Goal Description *</Label>
                  <Textarea
                    id="goal"
                    placeholder="e.g., Master calculus fundamentals..."
                    value={newGoal.goal}
                    onChange={(e) => setNewGoal({...newGoal, goal: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours">Target Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="1"
                    value={newGoal.targetHours}
                    onChange={(e) => setNewGoal({...newGoal, targetHours: parseInt(e.target.value) || 10})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    className="w-full p-2 border rounded-md bg-background"
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as any})}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <Button 
                  onClick={addGoal}
                  disabled={planLoading}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  {planLoading ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-pulse" />
                      Generating AI Plan...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Goal
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Goals List */}
          <div className="lg:col-span-2">
            {goals.length === 0 ? (
              <Card className="bg-gradient-card border-primary/20 p-12 text-center">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Goals Yet</h3>
                <p className="text-muted-foreground">
                  Add your first study goal to get started with AI-powered planning!
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {goals.map((goal) => (
                  <Card key={goal.id} className="bg-gradient-card border-primary/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{goal.subject}</CardTitle>
                          <p className="text-muted-foreground">{goal.goal}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(goal.priority)}>
                            {goal.priority}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteGoal(goal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {goal.completedHours}/{goal.targetHours} hours
                            </span>
                          </div>
                          <Progress 
                            value={getProgressPercentage(goal)} 
                            className="h-3"
                          />
                        </div>

                        {/* Deadline & Actions */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {getDaysRemaining(goal.deadline)} days remaining
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateProgress(goal.id, 0.5)}
                            >
                              +30min
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateProgress(goal.id, 1)}
                            >
                              +1hr
                            </Button>
                          </div>
                        </div>

                        {/* AI Plan */}
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Brain className="h-4 w-4 text-primary" />
                            AI Study Plan
                          </h4>
                          <div className="grid gap-2">
                            {goal.aiPlan.map((tip, index) => (
                              <div key={index} className="flex items-start gap-2 p-2 bg-secondary/50 rounded text-sm">
                                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}