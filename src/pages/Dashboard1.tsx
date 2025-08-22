// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import Link from "next/link";
// import { 
//   BookOpen, 
//   Brain, 
//   Target, 
//   Trophy, 
//   Users, 
//   Calendar,
//   Upload,
//   Zap,
//   LogOut
// } from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from '@/hooks/use-toast';

// interface UserProgress {
//   level: number;
//   experience_points: number;
//   current_streak: number;
//   concepts_mastered: number;
// }

// export default function Dashboard1() {
//   const [userProgress, setUserProgress] = useState<UserProgress>({
//     level: 1,
//     experience_points: 0,
//     current_streak: 0,
//     concepts_mastered: 0,
//   });
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchUserProgress();
//   }, []);

//   const fetchUserProgress = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       const { data: progress } = await supabase
//         .from('user_progress')
//         .select('*')
//         .eq('user_id', user.id)
//         .single();

//       if (progress) {
//         setUserProgress(progress);
//       }
//     } catch (error) {
//       console.error('Error fetching user progress:', error);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await supabase.auth.signOut();
//       toast({
//         title: "Signed out successfully",
//         description: "You've been logged out of StudyGine.",
//       });
//       navigate('/');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   const progressToNextLevel = (userProgress.experience_points % 1000) / 10;

//   return (
//     <div className="min-h-screen bg-background p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//             BrainBin Dashboard
//           </h1>
//           <p className="text-muted-foreground">Welcome back! Ready to learn something new?</p>
//         </div>
//           {/* <Link href="/motivation">Motivation</Link>
//             <Link href="/generator">Motivation</Link> */}
//         <Button variant="ghost" onClick={handleSignOut}>
//           <LogOut className="w-4 h-4 mr-2" />
//           Sign Out
//         </Button>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <Card className="card-gradient hover-lift">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Level</p>
//                 <p className="text-3xl font-bold text-primary">{userProgress.level}</p>
//               </div>
//               <Trophy className="w-8 h-8 text-warning" />
//             </div>
//             <div className="mt-4">
//               <div className="flex items-center justify-between text-sm">
//                 <span>Progress</span>
//                 <span>{Math.round(progressToNextLevel)}%</span>
//               </div>
//               <Progress value={progressToNextLevel} className="mt-2" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="card-gradient hover-lift">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Current Streak</p>
//                 <p className="text-3xl font-bold text-success">{userProgress.current_streak}</p>
//               </div>
//               <Zap className="w-8 h-8 text-warning" />
//             </div>
//             <p className="text-sm text-muted-foreground mt-2">Days in a row</p>
//           </CardContent>
//         </Card>

//         <Card className="card-gradient hover-lift">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Concepts Mastered</p>
//                 <p className="text-3xl font-bold text-accent">{userProgress.concepts_mastered}</p>
//               </div>
//               <Brain className="w-8 h-8 text-primary" />
//             </div>
//             <p className="text-sm text-muted-foreground mt-2">Total learned</p>
//           </CardContent>
//         </Card>

//         <Card className="card-gradient hover-lift">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">XP Points</p>
//                 <p className="text-3xl font-bold text-secondary">{userProgress.experience_points}</p>
//               </div>
//               <Target className="w-8 h-8 text-secondary" />
//             </div>
//             <p className="text-sm text-muted-foreground mt-2">Total earned</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         <Card className="card-gradient hover-lift">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Upload className="w-5 h-5 text-primary" />
//               Create Study Plan
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-muted-foreground mb-4">
//               Upload your syllabus or notes to generate a personalized study plan with AI.
//             </p>
//             <Button variant="hero" className="w-full">
//               <BookOpen className="w-4 h-4 mr-2" />
//               Upload Materials
//             </Button>
//           </CardContent>
//         </Card>

//         {/* <Card className="card-gradient hover-lift">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Users className="w-5 h-5 text-secondary" />
//               Join Study Room
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-muted-foreground mb-4">
//               Collaborate with other students in shared study spaces and group learning.
//             </p>
//             <Button variant="learning" className="w-full">
//               <Users className="w-4 h-4 mr-2" />
//               Browse Rooms
//             </Button>
//           </CardContent>
//         </Card> */}

//         <Card className="card-gradient hover-lift">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-accent" />
//               Today's Missions
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-muted-foreground mb-4">
//               Complete your daily adaptive micro-missions and maintain your learning streak.
//             </p>
//             <Button variant="success" className="w-full">
//               <Target className="w-4 h-4 mr-2" />
//               View Missions
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activity */}
//       <Card className="card-gradient">
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
//                   <Brain className="w-4 h-4 text-primary" />
//                 </div>
//                 <div>
//                   <p className="font-medium">Mathematics - Calculus</p>
//                   <p className="text-sm text-muted-foreground">Completed 3 concepts</p>
//                 </div>
//               </div>
//               <Badge variant="secondary">+50 XP</Badge>
//             </div>
            
//             <div className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
//                   <Trophy className="w-4 h-4 text-success" />
//                 </div>
//                 <div>
//                   <p className="font-medium">Achievement Unlocked</p>
//                   <p className="text-sm text-muted-foreground">7-day learning streak</p>
//                 </div>
//               </div>
//               <Badge variant="secondary">Streak Master</Badge>
//             </div>
            
//             <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/20">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
//                   <Users className="w-4 h-4 text-accent" />
//                 </div>
//                 <div>
//                   <p className="font-medium">Study Room: Physics Masters</p>
//                   <p className="text-sm text-muted-foreground">Joined collaborative session</p>
//                 </div>
//               </div>
//               <Badge variant="secondary">Active</Badge>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  Users, 
  Calendar,
  Upload,
  Zap,
  LogOut,
  TrendingUp,
  Clock,
  Star,
  Award,
  BookMarked,
  Lightbulb,
  Cpu,
  Network
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Static data for hackathon demo
const userProgress = {
  level: 12,
  experience_points: 8750,
  current_streak: 23,
  concepts_mastered: 127,
  total_study_hours: 145,
  ai_interactions: 1250,
  completion_rate: 92.5
};

const weeklyData = [
  { day: 'Mon', xp: 320, concepts: 5, hours: 2.5 },
  { day: 'Tue', xp: 480, concepts: 8, hours: 3.2 },
  { day: 'Wed', xp: 380, concepts: 6, hours: 2.8 },
  { day: 'Thu', xp: 520, concepts: 9, hours: 3.5 },
  { day: 'Fri', xp: 450, concepts: 7, hours: 3.0 },
  { day: 'Sat', xp: 680, concepts: 12, hours: 4.2 },
  { day: 'Sun', xp: 390, concepts: 6, hours: 2.5 }
];

const learningProgress = [
  { subject: 'AI & ML', progress: 95, color: '#8B5CF6' },
  { subject: 'Data Science', progress: 78, color: '#06B6D4' },
  { subject: 'Mathematics', progress: 89, color: '#EC4899' },
  { subject: 'Programming', progress: 92, color: '#10B981' },
  { subject: 'Statistics', progress: 73, color: '#F59E0B' }
];

const aiInsights = [
  { name: 'Concept Mastery', value: 92, color: '#8B5CF6' },
  { name: 'Retention Rate', value: 87, color: '#EC4899' },
  { name: 'Learning Speed', value: 95, color: '#06B6D4' },
  { name: 'Problem Solving', value: 89, color: '#10B981' }
];

const recentActivities = [
  {
    id: 1,
    type: 'ai_generated',
    title: 'AI Generated Neural Network Study Plan',
    description: 'Completed personalized deep learning module',
    xp: 150,
    time: '2 hours ago',
    icon: Brain,
    color: 'primary'
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Knowledge Master Achievement',
    description: '25-day learning streak milestone',
    xp: 500,
    time: '5 hours ago',
    icon: Trophy,
    color: 'warning'
  },
  {
    id: 3,
    type: 'ai_interaction',
    title: 'AI Tutor Session: Advanced Calculus',
    description: 'Interactive problem-solving with GPT-4',
    xp: 200,
    time: '1 day ago',
    icon: Lightbulb,
    color: 'accent'
  },
  {
    id: 4,
    type: 'collaboration',
    title: 'Study Room: ML Researchers',
    description: 'Collaborative project on reinforcement learning',
    xp: 300,
    time: '2 days ago',
    icon: Users,
    color: 'success'
  }
];

export default function Dashboard1() {
  const progressToNextLevel = ((userProgress.experience_points % 1000) / 10);
  const aiEfficiency = Math.round((userProgress.ai_interactions / userProgress.total_study_hours) * 10) / 10;

  return (
    <div className="min-h-screen bg-background neural-bg">
      <div className="container mx-auto p-6 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold gradient-text flex items-center gap-3">
              <Cpu className="w-8 h-8 text-primary animate-pulse-glow" />
              BrainBin AI Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Powered by Generative AI • Ready to unlock new knowledge?
            </p>
          </div>
          <Button variant="ghost" className="hover:bg-destructive/20">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* AI Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-neural hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Level
                  </p>
                  <p className="text-3xl font-bold text-primary animate-float">{userProgress.level}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Next Level</span>
                  <span>{Math.round(progressToNextLevel)}%</span>
                </div>
                <Progress value={progressToNextLevel} className="progress-glow" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-neural hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    AI Streak
                  </p>
                  <p className="text-3xl font-bold text-success animate-float">{userProgress.current_streak}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center animate-pulse-glow">
                  <Network className="w-8 h-8 text-success-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Days of AI-powered learning</p>
            </CardContent>
          </Card>

          <Card className="card-neural hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Concepts
                  </p>
                  <p className="text-3xl font-bold text-accent animate-float">{userProgress.concepts_mastered}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center animate-pulse-glow">
                  <BookMarked className="w-8 h-8 text-accent-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">AI-generated & mastered</p>
            </CardContent>
          </Card>

          <Card className="card-neural hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    XP Points
                  </p>
                  <p className="text-3xl font-bold text-secondary animate-float">{userProgress.experience_points.toLocaleString()}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center animate-pulse-glow">
                  <Star className="w-8 h-8 text-secondary-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">AI efficiency: {aiEfficiency}x</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Weekly Progress Chart */}
          <Card className="card-neural">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text-primary">
                <TrendingUp className="w-5 h-5" />
                AI-Powered Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#8B5CF6" 
                    fillOpacity={1} 
                    fill="url(#colorXp)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Learning Distribution */}
          <Card className="card-neural">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text-primary">
                <Brain className="w-5 h-5" />
                AI Knowledge Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={aiInsights}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {aiInsights.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>

        {/* Learning Progress Bars */}
        <Card className="card-neural">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gradient-text-primary">
              <BookOpen className="w-5 h-5" />
              Subject Mastery Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningProgress.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{
                        width: `${subject.progress}%`,
                        background: `linear-gradient(90deg, ${subject.color}dd, ${subject.color})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-neural hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Generate Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Upload syllabus and let our AI create a personalized learning roadmap with adaptive micro-missions.
              </p>
              <Button variant="hero" className="w-full">
                <BookOpen className="w-4 h-4 mr-2" />
                AI Study Generator
              </Button>
            </CardContent>
          </Card>

          <Card className="card-neural hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-secondary" />
                AI Tutor Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get instant help from advanced AI tutors trained on latest educational research and methodologies.
              </p>
              <Button variant="learning" className="w-full">
                <Lightbulb className="w-4 h-4 mr-2" />
                Start AI Session
              </Button>
            </CardContent>
          </Card>

          <Card className="card-neural hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Smart Missions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete AI-generated daily challenges that adapt to your learning pace and strengthen weak areas.
              </p>
              <Button variant="success" className="w-full">
                <Target className="w-4 h-4 mr-2" />
                View AI Missions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent AI Activities */}
        <Card className="card-neural">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gradient-text-primary">
              <Clock className="w-5 h-5" />
              Recent AI-Powered Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-gradient-to-r from-card/50 to-transparent hover-lift"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-${activity.color}/20 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 text-${activity.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="animate-pulse-glow">
                      +{activity.xp} XP
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Stats Footer */}
        <Card className="card-neural">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{userProgress.total_study_hours}h</p>
                <p className="text-sm text-muted-foreground">AI-Enhanced Study Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{userProgress.ai_interactions}</p>
                <p className="text-sm text-muted-foreground">AI Interactions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{userProgress.completion_rate}%</p>
                <p className="text-sm text-muted-foreground">AI Mission Success</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">{aiEfficiency}x</p>
                <p className="text-sm text-muted-foreground">Learning Efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}