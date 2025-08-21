import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Timer, Play, Pause, Square, RotateCcw, Coffee } from "lucide-react";
import { studyBuddy } from "@/lib/gemini1";
import { useToast } from "@/hooks/use-toast";

interface PomodoroSession {
  isActive: boolean;
  isPaused: boolean;
  timeLeft: number;
  currentSession: number;
  isBreak: boolean;
  totalSessions: number;
}

export function StudyTimer() {
  const [session, setSession] = useState<PomodoroSession>({
    isActive: false,
    isPaused: false,
    timeLeft: 25 * 60, // 25 minutes in seconds
    currentSession: 1,
    isBreak: false,
    totalSessions: 4
  });
  
  const [motivation, setMotivation] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (session.isActive && !session.isPaused && session.timeLeft > 0) {
      interval = setInterval(() => {
        setSession(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (session.timeLeft === 0) {
      handleSessionComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.isActive, session.isPaused, session.timeLeft]);

  const handleSessionComplete = async () => {
    const wasBreak = session.isBreak;
    
    if (wasBreak) {
      // Break completed, start next study session
      setSession(prev => ({
        ...prev,
        isActive: false,
        timeLeft: 25 * 60,
        currentSession: prev.currentSession + 1,
        isBreak: false
      }));
      
      toast({
        title: "Break Complete! 🎯",
        description: "Ready to focus again? Let's crush this next session!",
      });
      
      // Get motivation for next session
      const newMotivation = await studyBuddy.getMotivationalMessage({
        currentMood: "motivated",
        sessionDuration: 25
      });
      setMotivation(newMotivation);
      
    } else {
      // Study session completed
      const isLongBreak = session.currentSession % 4 === 0;
      const breakDuration = isLongBreak ? 15 * 60 : 5 * 60; // 15 min or 5 min
      
      setSession(prev => ({
        ...prev,
        isActive: false,
        timeLeft: breakDuration,
        isBreak: true
      }));
      
      toast({
        title: "Session Complete! 🏆",
        description: `Amazing work! Time for a ${isLongBreak ? 'long' : 'short'} break.`,
      });
      
      // Get encouraging message
      const encouragement = await studyBuddy.getProgressEncouragement(
        (session.currentSession / session.totalSessions) * 100,
        "your studies"
      );
      setMotivation(encouragement);
    }
  };

  const startTimer = () => {
    setSession(prev => ({ ...prev, isActive: true, isPaused: false }));
  };

  const pauseTimer = () => {
    setSession(prev => ({ ...prev, isPaused: true }));
  };

  const resumeTimer = () => {
    setSession(prev => ({ ...prev, isPaused: false }));
  };

  const resetTimer = () => {
    setSession({
      isActive: false,
      isPaused: false,
      timeLeft: session.isBreak ? (session.currentSession % 4 === 0 ? 15 * 60 : 5 * 60) : 25 * 60,
      currentSession: session.currentSession,
      isBreak: session.isBreak,
      totalSessions: 4
    });
  };

  const skipSession = () => {
    handleSessionComplete();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalTime = session.isBreak 
      ? (session.currentSession % 4 === 0 ? 15 * 60 : 5 * 60)
      : 25 * 60;
    return ((totalTime - session.timeLeft) / totalTime) * 100;
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Timer className="h-8 w-8 text-primary" />
            Pomodoro Study Timer
          </h2>
          <p className="text-xl text-muted-foreground">
            Stay focused with proven time management technique
          </p>
        </div>

        <Card className="bg-gradient-card border-primary/20 shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {session.isBreak ? (
                <>
                  <Coffee className="h-6 w-6 text-success" />
                  Break Time
                </>
              ) : (
                <>
                  <Timer className="h-6 w-6 text-primary" />
                  Study Session {session.currentSession}
                </>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Timer Display */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-secondary"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                    className={session.isBreak ? "text-success" : "text-primary"}
                    style={{
                      transition: "stroke-dashoffset 1s ease-in-out"
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {formatTime(session.timeLeft)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {session.isBreak ? "Break" : "Focus"}
                    </div>
                  </div>
                </div>
              </div>

              <Progress 
                value={getProgressPercentage()} 
                className="h-3 mb-4"
              />
            </div>

            {/* Session Info */}
            <div className="flex justify-center gap-4">
              <Badge variant="outline">
                Session {session.currentSession}/{session.totalSessions}
              </Badge>
              <Badge className={session.isBreak ? "bg-gradient-success" : "bg-gradient-primary"}>
                {session.isBreak ? "Break Mode" : "Focus Mode"}
              </Badge>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!session.isActive ? (
                <Button 
                  onClick={startTimer}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </Button>
              ) : session.isPaused ? (
                <Button 
                  onClick={resumeTimer}
                  size="lg"
                  className="bg-gradient-success hover:shadow-success transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Resume
                </Button>
              ) : (
                <Button 
                  onClick={pauseTimer}
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10"
                >
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </Button>
              )}
              
              <Button 
                onClick={resetTimer}
                size="lg"
                variant="outline"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </Button>
              
              <Button 
                onClick={skipSession}
                size="lg"
                variant="outline"
              >
                <Square className="mr-2 h-5 w-5" />
                Skip
              </Button>
            </div>

            {/* AI Motivation */}
            {motivation && (
              <div className="p-4 bg-gradient-primary rounded-lg text-center">
                <p className="text-primary-foreground font-medium">
                  {motivation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}