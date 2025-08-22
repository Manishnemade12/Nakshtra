import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Link from "next/link";
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  Users, 
  Calendar,
  Upload,
  Zap,
  LogOut
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UserProgress {
  level: number;
  experience_points: number;
  current_streak: number;
  concepts_mastered: number;
}

export default function Dashboard1() {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    experience_points: 0,
    current_streak: 0,
    concepts_mastered: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserProgress();
  }, []);

  const fetchUserProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (progress) {
        setUserProgress(progress);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You've been logged out of StudyGine.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const progressToNextLevel = (userProgress.experience_points % 1000) / 10;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            BrainBin Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back! Ready to learn something new?</p>
        </div>
          {/* <Link href="/motivation">Motivation</Link>
            <Link href="/generator">Motivation</Link> */}
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="card-gradient hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-3xl font-bold text-primary">{userProgress.level}</p>
              </div>
              <Trophy className="w-8 h-8 text-warning" />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progressToNextLevel)}%</span>
              </div>
              <Progress value={progressToNextLevel} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold text-success">{userProgress.current_streak}</p>
              </div>
              <Zap className="w-8 h-8 text-warning" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Days in a row</p>
          </CardContent>
        </Card>

        <Card className="card-gradient hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Concepts Mastered</p>
                <p className="text-3xl font-bold text-accent">{userProgress.concepts_mastered}</p>
              </div>
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Total learned</p>
          </CardContent>
        </Card>

        <Card className="card-gradient hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">XP Points</p>
                <p className="text-3xl font-bold text-secondary">{userProgress.experience_points}</p>
              </div>
              <Target className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Total earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="card-gradient hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Create Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Upload your syllabus or notes to generate a personalized study plan with AI.
            </p>
            <Button variant="hero" className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              Upload Materials
            </Button>
          </CardContent>
        </Card>

        {/* <Card className="card-gradient hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              Join Study Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Collaborate with other students in shared study spaces and group learning.
            </p>
            <Button variant="learning" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Browse Rooms
            </Button>
          </CardContent>
        </Card> */}

        <Card className="card-gradient hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Today's Missions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Complete your daily adaptive micro-missions and maintain your learning streak.
            </p>
            <Button variant="success" className="w-full">
              <Target className="w-4 h-4 mr-2" />
              View Missions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Mathematics - Calculus</p>
                  <p className="text-sm text-muted-foreground">Completed 3 concepts</p>
                </div>
              </div>
              <Badge variant="secondary">+50 XP</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="font-medium">Achievement Unlocked</p>
                  <p className="text-sm text-muted-foreground">7-day learning streak</p>
                </div>
              </div>
              <Badge variant="secondary">Streak Master</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Study Room: Physics Masters</p>
                  <p className="text-sm text-muted-foreground">Joined collaborative session</p>
                </div>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}