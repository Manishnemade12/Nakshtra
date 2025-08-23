import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Target,
  Plus,
  CheckCircle,
  Clock,
  Brain,
  Trash2,
  Mic,
  MicOff,
  Volume2
} from "lucide-react";
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

// Add type declarations for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "input" | "textarea";
  id?: string;
}

const VoiceInput = ({ value, onChange, placeholder, type = "input", id }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          onChange(value + finalTranscript + ' ');
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Voice Input Error",
          description: "Unable to process voice input. Please try again.",
          variant: "destructive"
        });
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [value, onChange, toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      toast({
        title: "Voice Input Active 🎤",
        description: "Start speaking... Click the mic again to stop.",
      });
    }
  };

  const InputComponent = type === "textarea" ? Textarea : Input;

  return (
    <div className="relative">
      <InputComponent
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-12"
        rows={type === "textarea" ? 3 : undefined}
      />
      {isSupported && (
        <Button
          type="button"
          size="sm"
          variant={isListening ? "default" : "outline"}
          className={`absolute right-2 top-2 h-8 w-8 p-0 ${
            isListening 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse" 
              : "hover:bg-primary hover:text-primary-foreground"
          }`}
          onClick={toggleListening}
        >
          {isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      )}
      {!isSupported && (
        <div className="absolute right-2 top-2 h-8 w-8 flex items-center justify-center">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

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
    // ve goals to localStorage whenever they change
    localStorage.setItem('studyGoals', JSON.stringify(goals));
  }, [goals]);

  const generateAIPlan = async (subjects: string[], totalHours: number) => {
    setPlanLoading(true);
    try {
      // Simulated AI plan generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      return [
        `Create a structured ${totalHours}-hour study schedule for ${subjects.join(', ')}`,
        "Break down topics into manageable 25-minute study sessions",
        "Use active recall and spaced repetition techniques",
        "Take 5-minute breaks between sessions and 15-minute breaks every 2 hours",
        "Practice with real examples and solve past papers regularly",
        "Review and summarize key concepts at the end of each day",
        "Create mind maps and visual aids for complex topics"
      ];
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
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-primary text-primary-foreground";
      case "low": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
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
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            <Target className="h-10 w-10 text-primary" />
            AI Study Wizard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Set intelligent study goals, track your progress, and get personalized AI-generated study plans with voice input support
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add New Goal */}
          <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 sticky top-4 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Plus className="h-5 w-5" />
                  Add Study Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject * 
                    <span className="text-muted-foreground ml-1">(Try voice input!)</span>
                  </Label>
                  <VoiceInput
                    id="subject"
                    placeholder="e.g., Mathematics, Physics, Chemistry..."
                    value={newGoal.subject}
                    onChange={(value) => setNewGoal({ ...newGoal, subject: value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-sm font-medium">
                    Goal Description * 
                    <span className="text-muted-foreground ml-1">(Voice supported)</span>
                  </Label>
                  <VoiceInput
                    id="goal"
                    type="textarea"
                    placeholder="e.g., Master calculus fundamentals and solve integration problems..."
                    value={newGoal.goal}
                    onChange={(value) => setNewGoal({ ...newGoal, goal: value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours" className="text-sm font-medium">Target Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="1"
                    max="1000"
                    value={newGoal.targetHours}
                    onChange={(e) => setNewGoal({ ...newGoal, targetHours: parseInt(e.target.value) || 10 })}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-sm font-medium">Deadline *</Label>
                  <div className="relative">
                    <Input
                      id="deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
                  <select
                    className="w-full p-3 border rounded-lg bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as any })}
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                  </select>
                </div>

                <Button
                  onClick={addGoal}
                  disabled={planLoading}
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {planLoading ? (
                    <>
                      <Brain className="mr-2 h-5 w-5 animate-pulse" />
                      Generating AI Plan...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-5 w-5" />
                      Add Goal & Generate Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Goals List */}
          <div className="lg:col-span-2">
            {goals.length === 0 ? (
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20 p-12 text-center shadow-lg">
                <div className="space-y-4">
                  <Target className="h-20 w-20 text-muted-foreground mx-auto opacity-50" />
                  <h3 className="text-2xl font-semibold">No Study Goals Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Create your first study goal to get started with AI-powered planning and voice input features!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <Mic className="h-4 w-4" />
                    <span>Voice input supported</span>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {goals.map((goal) => (
                  <Card key={goal.id} className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <CardTitle className="text-xl text-primary">{goal.subject}</CardTitle>
                          <p className="text-muted-foreground leading-relaxed">{goal.goal}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Badge className={getPriorityColor(goal.priority)}>
                            {goal.priority.toUpperCase()}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteGoal(goal.id)}
                            className="hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Progress */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Study Progress</span>
                          <span className="text-sm text-muted-foreground font-mono">
                            {goal.completedHours.toFixed(1)}/{goal.targetHours} hours
                          </span>
                        </div>
                        <Progress
                          value={getProgressPercentage(goal)}
                          className="h-3 bg-secondary"
                        />
                        <div className="text-xs text-center text-muted-foreground">
                          {getProgressPercentage(goal).toFixed(1)}% Complete
                        </div>
                      </div>

                      {/* Deadline & Actions */}
                      <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            {getDaysRemaining(goal.deadline)} days remaining
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateProgress(goal.id, 0.5)}
                            className="hover:bg-primary hover:text-primary-foreground"
                          >
                            +30min
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateProgress(goal.id, 1)}
                            className="hover:bg-primary hover:text-primary-foreground"
                          >
                            +1hr
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateProgress(goal.id, 2)}
                            className="hover:bg-primary hover:text-primary-foreground"
                          >
                            +2hr
                          </Button>
                        </div>
                      </div>

                      {/* AI Plan */}
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2 text-primary">
                          <Brain className="h-5 w-5" />
                          AI-Generated Study Plan
                        </h4>
                        <div className="grid gap-3">
                          {goal.aiPlan.map((tip, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-secondary/40 to-secondary/20 rounded-lg border border-primary/10">
                              <div className="flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                              </div>
                              <span className="text-sm leading-relaxed">{tip}</span>
                            </div>
                          ))}
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
