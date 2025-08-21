import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Sparkles, RefreshCw, Target, Lightbulb } from "lucide-react";
import { studyBuddy, type MotivationRequest, type StudyTip } from "@/lib/gemini1";
import { useToast } from "@/hooks/use-toast";

export function AIMotivation() {
  const [motivation, setMotivation] = useState<string>("");
  const [studyTip, setStudyTip] = useState<StudyTip | null>(null);
  const [loading, setLoading] = useState(false);
  const [tipLoading, setTipLoading] = useState(false);
  const { toast } = useToast();

  // Form state for personalized motivation
  const [request, setRequest] = useState<MotivationRequest>({
    subject: "",
    currentMood: "motivated",
    studyGoal: "",
    sessionDuration: 30
  });

  // Load initial motivation on component mount
  useEffect(() => {
    getMotivation();
    getStudyTip();
  }, []);

  const getMotivation = async () => {
    setLoading(true);
    try {
      const message = await studyBuddy.getMotivationalMessage(request);
      setMotivation(message);
      toast({
        title: "New Motivation Generated!",
        description: "Your AI study buddy has fresh words of encouragement.",
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Couldn't generate motivation. Using cached message.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStudyTip = async () => {
    setTipLoading(true);
    try {
      const tip = await studyBuddy.getStudyTechnique(request.subject);
      setStudyTip(tip);
    } catch (error) {
      console.error("Failed to get study tip:", error);
    } finally {
      setTipLoading(false);
    }
  };

  const handleSubjectChange = (value: string) => {
    setRequest(prev => ({ ...prev, subject: value }));
  };

  const handleMoodChange = (value: string) => {
    setRequest(prev => ({ ...prev, currentMood: value as any }));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            AI-Powered Motivation Center
          </h2>
          <p className="text-xl text-muted-foreground">
            Get personalized encouragement and study tips powered by Gemini AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personalization Panel */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Personalize Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">What are you studying?</Label>
                <Select onValueChange={handleSubjectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Literature">Literature</SelectItem>
                    <SelectItem value="Languages">Languages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">How are you feeling?</Label>
                <Select onValueChange={handleMoodChange} defaultValue="motivated">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motivated">Motivated 🚀</SelectItem>
                    <SelectItem value="tired">Tired 😴</SelectItem>
                    <SelectItem value="stressed">Stressed 😰</SelectItem>
                    <SelectItem value="confident">Confident 💪</SelectItem>
                    <SelectItem value="overwhelmed">Overwhelmed 🤯</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Study Goal (Optional)</Label>
                <Input
                  id="goal"
                  placeholder="e.g., Master calculus, Pass final exam..."
                  value={request.studyGoal}
                  onChange={(e) => setRequest(prev => ({ ...prev, studyGoal: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Session Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="180"
                  value={request.sessionDuration}
                  onChange={(e) => setRequest(prev => ({ ...prev, sessionDuration: parseInt(e.target.value) || 30 }))}
                />
              </div>

              <Button 
                onClick={getMotivation} 
                disabled={loading}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {loading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Motivation
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* AI Motivation */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-energy" />
                  Your Personal Motivation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gradient-primary rounded-lg text-center">
                  <p className="text-lg font-medium text-primary-foreground leading-relaxed">
                    {motivation || "Click 'Generate Motivation' to get your personalized encouragement!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Study Tip */}
            <Card className="bg-gradient-card border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-success" />
                  Smart Study Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studyTip ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg">{studyTip.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {studyTip.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{studyTip.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={getStudyTip}
                      disabled={tipLoading}
                      className="hover:bg-success/10"
                    >
                      {tipLoading ? (
                        <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-3 w-3" />
                      )}
                      New Tip
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Loading your personalized study tip...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}